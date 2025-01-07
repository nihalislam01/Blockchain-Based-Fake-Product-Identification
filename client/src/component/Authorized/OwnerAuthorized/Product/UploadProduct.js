import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Papa from 'papaparse';
import axios from "axios";
import handleAxiosError from "../../../../common/utils/ErrorHandler";
import UploadSingle from "./UploadSingle";
import DragAndDrop from "../../../../common/components/DragAndDrop/DragAndDrop";
import { useNavigate } from "react-router-dom";

const uploadBulkProductUrl = '/api/product/upload-bulk';

const UploadProduct = ({close}) => {

    const [files, setFiles] = useState([]);
    const [isSingleUpload, setIsSingleUpload] = useState(false);
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {

        acceptedFiles.forEach((file) => {

            if (file.type !== "text/csv") {
                toast.error(`Invalid file type: ${file.type}. Please upload only CSV files.`);
                return;
            }
            setFiles((prevFiles) => [
                ...prevFiles,
                { file, progress: 0, isUploading: true },
            ]);
            const simulateUpload = (file) => {
                const interval = setInterval(() => {
                    setFiles((prevFiles) =>
                        prevFiles.map((f) => {
                            if (f.file === file) {
                                if (f.progress >= 100) {
                                    clearInterval(interval);
                                    return { ...f, progress: 100, isUploading: false };
                                }
                                return { ...f, progress: f.progress + 10 };
                            }
                            return f;
                        })
                    );
                }, 300);
            };

            simulateUpload(file);
        });

    }, []);

    const onUpload = async () => {
        if (files.length === 0) {
            toast.error("No files to upload.");
            return;
        }
    
        const validHeaders = ["productid", "name", "price", "description"];
    
        for (const fileObj of files) {
            const file = fileObj.file;
    
            const csvContent = await new Promise((resolve, reject) => {
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => resolve(results),
                    error: (error) => reject(error),
                });
            });
    
            const { data, errors } = csvContent;
    
            if (errors.length > 0) {
                toast.error(`Error parsing ${file.name}: ${errors[0].message}`);
                continue;
            }
    
            const headers = Object.keys(data[0]).map((header) => header.toLowerCase());
            const missingHeaders = validHeaders.filter((h) => !headers.includes(h));
            if (missingHeaders.length > 0) {
                toast.error(`File ${file.name} is missing required headers: ${missingHeaders.join(", ")}`);
                continue;
            }
            const formattedData = data.map((row) => {
                const normalizedRow = {};
                Object.keys(row).forEach((key) => {
                    normalizedRow[key.toLowerCase()] = row[key];
                });
                return {
                    productId: normalizedRow.productid,
                    name: normalizedRow.name,
                    price: normalizedRow.price,
                    description: normalizedRow.description,
                };
            });
            await axios.post(uploadBulkProductUrl, {products: formattedData})
            .then(response=>toast.success(response.data.message))
            .catch(handleAxiosError);
        }
    };

    const removeFile = (file) => {
        setFiles((prevFiles) => prevFiles.filter((f) => f.file !== file));
    };

    const openSingleUpload = () => {
        setIsSingleUpload(true);
    }

    const openDragAndDrop = () => {
        setIsSingleUpload(false);
    }

    const goHome = () => {
        navigate("/home");
    }

    return isSingleUpload ? <UploadSingle onDragAndDropClick={openDragAndDrop} buttonName="upload csv files instead" closeAction={close || goHome} /> : <DragAndDrop onDrop={onDrop} removeFile={removeFile} files={files} onUpload={onUpload} link={{action: openSingleUpload, name:"upload single product instead"}} />
}

export default UploadProduct;