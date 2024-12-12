function FormInput(props) {

    return (
        <div className="mb-3 w-100">
            { props.label && <label htmlFor={props.id} className="form-label" style={{cursor: "pointer"}}>{props.label}</label> }

            {(!props.category || props.category==="input") && <input className="form-control"
                   id={props.id}
                   name={props.name}
                   type={props.type}
                   placeholder={props.placeholder}
                   checked={props.checked}
                   value={props.value}
                   onChange={props.onChange}
                   style={{display : props.display===false && "none"}}
                   />}
            {props.category==="textarea" && 
                <textarea id={props.id} className="form-control" name={props.name} type={props.type} value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
            }
            {props.category==="select" &&             
                <select className="form-select" id={props.id} value={props.value} name={props.name} onChange={props.onChange} style={{borderRadius: "10px"}}>
                    <option value="" disabled>{props.placeholder}</option>
                    {props.options.map(e => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
            }
        </div>
    );
}

export default FormInput;