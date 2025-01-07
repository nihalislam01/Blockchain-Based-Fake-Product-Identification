import Message from "../../common/components/Message/Message";

const DontHavePass = () => {
return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 min-vh-100">
        <Message headline="Account Disabled" message="Account has been disabled. Please contact us for more information" />
    </div>
);
}

export default DontHavePass;