const HandleClickOutside = (popupRef, showPopup, setShowPopup) => {
    const handleOutsideClick = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setShowPopup(false);
        }
    };

    if (showPopup) {
        document.addEventListener("mousedown", handleOutsideClick);
    } else {
        document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };
}

export default HandleClickOutside;