import AuthenticatedRoute from "../../utils/AuthenticatedRoute"

const Paragraph = ({headline, keys}) => {
    return (
        <AuthenticatedRoute redirect={
                <div className="w-50">
                    <h2>{headline}</h2>
                    <hr />
                    {keys.map((key, index) => (
                        <p className="m-0"><i class="fa-solid fa-circle fa-xs"></i> {key}</p>
                    ))}
                    <hr />
                </div>
        }>
            <div className="d-flex justify-content-center w-100 container" style={{minHeight: "80vh"}}>
                <div className="w-50">
                    <h2>{headline}</h2>
                    <hr />
                    {keys.map((key, index) => (
                        <p className="m-0"><i class="fa-solid fa-circle fa-xs"></i> {key}</p>
                    ))}
                    <hr />
                </div>
            </div>
        </AuthenticatedRoute>
    )
}

export default Paragraph;