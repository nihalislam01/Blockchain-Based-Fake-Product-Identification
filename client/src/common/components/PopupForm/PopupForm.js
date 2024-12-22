import { useEffect, useRef } from "react";
import './PopupForm.scss';
import FormInput from "../FormInput/FormInput";
import { useDropzone } from 'react-dropzone';

function SingleProductForm(props){

    const popupRef = useRef(null);

    useEffect(() => {
        
        const handleOutsideClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                props.closePopup();
            }
        };

        if (props.showPopup) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [props]);

    const onChangeHandler = e => {
        props.setFormValues({...props.formValues, [e.target.name]: e.target.value});
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: props.onDrop,
        accept: '.csv',
    });

    return (
        <>
        <div className="popup-overlay">
            <div className="popup-content" ref={popupRef} >
                <button className="close-btn" onClick={props.closePopup}>&times;</button>
                <h3>{props.headline}</h3>
                <div className="form-box">
                    {props.formInputs?.map((e)=>(
                        <FormInput key={e.id} onChange={onChangeHandler} value={props.formValues[e.name]} noMargin={true} {...e} />
                    ))}
                    {props.dragandDrop && 
                        <>
                        <h4 className="text-start m-0" style={{padding: "0px 5px"}}>Upload file</h4>
                        <div {...getRootProps()} style={{border: '2px dashed #e5e5e5',textAlign: 'center',borderRadius: '10px', padding: "100px 20px", transition: "background-color 0.3s ease", backgroundColor: isDragActive ? "#edf2fb": ""}}>
                            <input {...getInputProps()} />
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <p className="m-0" style={{fontWeight: "bold"}}>Drag and drop file here or</p>
                                <button className="btn btn-link p-0">Choose File</button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4" style={{padding: "0px 5px"}}>
                            <p className="m-0" style={{color: "rgba(113, 113, 113)", fontSize: "10px"}}>Maximum file size: 10MB</p>
                            <p className="m-0" style={{color: "rgba(113, 113, 113)", fontSize: "10px"}}>Support format: .CSV</p>
                        </div>
                        </>
                    }
                    <button type="submit" className="btn btn-primary" onClick={props.onFormSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleProductForm;