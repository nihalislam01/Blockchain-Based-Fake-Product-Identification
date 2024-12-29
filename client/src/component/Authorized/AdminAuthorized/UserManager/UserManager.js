import axios from "axios";
import { useEffect, useState } from "react";
import handleAxiosError from "../../../../common/utils/ErrorHandler";
import Table from "../../../../common/components/Table/Table";
import toast from "react-hot-toast";
import FormInput from "../../../../common/components/FormInput/FormInput";

const getAllUsersUrl = "/api/user/get-all";
const updateStatusUrl = "/api/user/updateStatus/";

const statusInput =     {
    name: "isEnable",
    placeholder: "Status",
    options: [{name:"Active", value:true}, {name:"Inactive", value:false}],
    category: "select"
  }

function UserManager() {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get(getAllUsersUrl)
        .then(response=>setUsers(response.data.users))
        .catch(handleAxiosError)
    },[])
    const onChangeHandler = (e, id) => {
        axios.patch(updateStatusUrl+id, {isEnable: e.target.value})
        .then((response)=>toast.success(response.data.message))
        .catch(handleAxiosError)
    };
    return (
        <div className="container">
            <h2>User Manager</h2>
            <hr />
            <div className="table-container">
                <Table keys={["username","name","email", "role"]} rows={users}
                renderActions={(row) => (<FormInput noMargin={true} onChange={(event) => onChangeHandler(event, row._id)} value={row.isEnable} {...statusInput}/>)}/>
            </div>
        </div>
    )
}

export default UserManager;