import { useEffect, useRef } from "react";
import './PopupForm.scss';
import FormInput from "../FormInput/FormInput";

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

    return (
        <>
        <div className="popup-overlay">
            <div className="popup-content" ref={popupRef} >
                <button className="close-btn" onClick={props.closePopup}>&times;</button>
                <h3>{props.headline}</h3>
                <div className="form-box">
                    {props.formInputs.map((e)=>(
                        <FormInput key={e.id} onChange={onChangeHandler} value={props.formValues[e.name]} noMargin={true} {...e} />
                    ))}
                    <button type="submit" className="btn btn-primary" onClick={props.onFormSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleProductForm;