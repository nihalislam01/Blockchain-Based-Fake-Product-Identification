function SelectInput(props) {

    return (
        <div className="mb-3">
            { props.label && <label htmlFor={props.id} className="form-label" style={{cursor: "pointer"}}>{props.label}</label> }

            <select className="form-select" id={props.id} value={props.value} name={props.name} onChange={props.onChange} style={{borderRadius: "10px"}}>
                <option value="" disabled>{props.placeholder}</option>
                {props.options.map(e => (
                    <option key={e} value={e}>{e}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectInput;