import CommonHelmet from "../../common/components/Head/CommonHelmet";

const pageTitle = "Hexis - Dashboard";
function Dashboard() {
    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <h2>Dashboard</h2>
                <hr />
            </div>
        </>
    )
}

export default Dashboard;