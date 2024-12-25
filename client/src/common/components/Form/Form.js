import './Form.scss';
import FormInput from "../FormInput/FormInput";

function Form(props){

    const onChangeHandler = e => {
        props.setFormValues({...props.formValues, [e.target.name]: e.target.value});
    };

    return (
        <>
            <h3>{props.headline}</h3>
            <div className="form-box">
                {props.formInputs?.map((e)=>(
                    <FormInput key={e.id} onChange={onChangeHandler} value={props.formValues[e.name]} noMargin={true} {...e} />
                ))}
                <button type="submit" className="btn btn-primary" onClick={props.onFormSubmit}>Submit</button>
                {props.button && <button className='btn btn-link' onClick={props.button?.click}>{props.button.name}</button>}
            </div>
        </>
    )
}

export default Form;