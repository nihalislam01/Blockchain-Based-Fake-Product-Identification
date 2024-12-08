import CommonHelmet from "../../common/components/Head/CommonHelmet";

const pageTitle = "Hexis - Home";
function Home() {
    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <h2>Home</h2>
                <hr />
            </div>
        </>
    )
}

export default Home;