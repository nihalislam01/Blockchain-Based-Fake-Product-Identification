import { useDropzone } from 'react-dropzone';
import "./DragAndDrop.scss";

function DragAndDrop(props) {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: props.onDrop,
        accept: '.csv',
    });

    return (
        <>
            <h4 className="text-start m-0" style={{padding: "0px 5px"}}>Upload file</h4>
            <div {...getRootProps()} style={{border: '2px dashed #e5e5e5',textAlign: 'center',borderRadius: '10px', padding: "100px 20px", transition: "background-color 0.3s ease", backgroundColor: isDragActive ? "#edf2fb": "", margin: "10px 0px"}}>
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
            <div className="file-list">
                {props.files.map((f, index) => (
                    <div key={index} className="file-item">
                        <div className="w-100 text-start">
                            <p className="m-0">{f.file.name}</p>
                            <div className="progress-bar">
                                <div className="progress" style={{width: `${f.progress}%`,height: '10px',background: "#293241",transition: 'width 0.3s ease',}}/>
                            </div>
                        </div>
                        <button className="remove-btn" onClick={() => props.removeFile(f.file)}>&times;</button>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary w-100" onClick={props.onUpload}>Upload</button>
            {props.link && <button className='btn btn-link' onClick={props.link?.action}>{props.link?.name}</button>}
        </>
    )
}

export default DragAndDrop;