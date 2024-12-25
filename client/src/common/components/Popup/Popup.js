import { useEffect, useRef } from "react";
import './Popup.scss';
import HandleClickOutside from "../../utils/HandleClickOutside";

function Popup({children, showPopup, setShowPopup}) {

    const popupRef = useRef(null);

    useEffect(() => {
        HandleClickOutside(popupRef, showPopup, setShowPopup)
    }, [popupRef, showPopup, setShowPopup]);

    const close = () => {
        setShowPopup(false);
    }
    return (
        <>
            <div className="popup-overlay">
                <div className="popup-content" ref={popupRef} >
                    <button className="close-btn" onClick={close}>&times;</button>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Popup;