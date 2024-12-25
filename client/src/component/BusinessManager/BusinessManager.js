import axios from "axios";
import { useEffect, useState } from "react";
import handleAxiosError from "../../common/utils/ErrorHandler";
import Table from "../../common/components/Table/Table";
import toast from "react-hot-toast";
import FormInput from "../../common/components/FormInput/FormInput";

const getAllBusinessesUrl = "/api/business/get-all";
const updateStatusUrl = "/api/business/updateStatus/";

const statusInput =     {
    name: "role",
    placeholder: "Role",
    options: [{name:"Reject", value:"user"}, {name:"Approve", value:"owner"}, {name:"Pending", value:"pending"}],
    category: "select"
  }

function BusinessManager() {
    const [businesses, setBusinesses] = useState([]);
    useEffect(()=>{
        axios.get(getAllBusinessesUrl)
        .then(response=>{
            const transformedBusinesses = response.data.businesses.map((business) => ({
                id: business._id,
                userid: business.ownerId._id,
                role: business.ownerId.role,
                username: business.ownerId.username,
                ownername: business.ownerId.name,
                organizationName: business.organizationName,
                contactEmail: business.contactEmail,
                address: `${business.address.street}, ${business.address.city}, ${business.address.state}, ${business.address.zipCode}, ${business.address.country}`,
            }));

            setBusinesses(transformedBusinesses);
        })
        .catch(handleAxiosError)
    },[])
    const onChangeHandler = (e, id) => {
        axios.patch(updateStatusUrl+id, {role: e.target.value})
        .then((response)=>toast.success(response.data.message))
        .catch(handleAxiosError)
    };
    return (
        <div className="container">
            <h2>Business Manager</h2>
            <hr />
            <div className="table-container">
                <Table keys={["username","ownername","organizationName", "contactEmail", "address"]} rows={businesses}
                renderActions={(row) => (<FormInput noMargin={true} onChange={(event) => onChangeHandler(event, row.userid)} value={row.role} {...statusInput}/>)}/>
            </div>
        </div>
    )
}

export default BusinessManager;