import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import './Dropdown.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ elements, selected, setSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredElements = elements.filter((element) =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectItem = (item) => {
        setSelect(item);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            <div className={`d-flex justify-content-between align-items-center ${isOpen?"":"mb-3"} form-control dropdown-button`} onClick={toggleDropdown}>
                <p className='m-0'>{selected.name}</p>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isOpen && (
                <div className="dropdown-box">
                    <FormInput type="text" id="searchInput" placeholder="Search..." value={searchQuery} onChange={handleSearch}/>
                    <hr className='m-0'/>
                    <div className="dropdown-list">
                        {filteredElements.map((element, index) => (
                            <button key={index} className="dropdown-box-item" onClick={()=>selectItem(element)}>{element.name}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;