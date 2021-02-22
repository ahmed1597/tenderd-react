import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';
import axios from "axios";
import { useHistory , Redirect , Link} from 'react-router-dom';
import Navmenu from "../Navmenu";
import { useForm } from 'react-hook-form';


const Comapny = () =>{
    const params = useParams();
    const { user } = useSession();
    const [users,setUsers] = useState([]);
    const [AllUsers,setAllUsers] = useState([]);
    const [userData,setUserData] = useState({name:"",email:"",api_token:""});
    const history = useHistory();
    const {register , handleSubmit , reset} = useForm();
    const [isLoading, setLoading] = useState(false);

    /**Get User Data */
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/user/info/"+user.uid)
        .then(response => setUserData(response.data));
    },[]);

    /**Save Token */
    let userToken;
    if(userData){
        userToken = userData["api_token"];
    }

    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/company/users/"+params.id+"?api_token="+userToken)
        .then(response => setUsers(response.data));
      },[userData]);

    let removeResponse;
    const removeUser = async (uid) =>{
        removeResponse = await axios.put(process.env.REACT_APP_API_URL+"/user/edit?api_token="+userToken,{id:uid,company_id:null});
        if (removeResponse.data.status == "success") {
            await axios.get(process.env.REACT_APP_API_URL+"/company/users/"+params.id+"?api_token="+userToken)
        .then(response => setUsers(response.data));
        await axios.get(process.env.REACT_APP_API_URL+"/user/list?api_token="+userToken)
        .then(response => setAllUsers(response.data));
        }
    }

    /**Get all Users  */
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/user/list?api_token="+userToken)
        .then(response => setAllUsers(response.data));
    },[userData]);

    /**Handling user add */
    const onSubmit = async (data) => {
        setLoading(true);
        let resp;
        try {
            resp = await axios.put(process.env.REACT_APP_API_URL+"/user/edit?api_token="+userToken,{id:data.user,company_id:params.id});
            reset();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

        if (resp.data.status == "success") {
            await axios.get(process.env.REACT_APP_API_URL+"/company/users/"+params.id+"?api_token="+userToken)
        .then(response => setUsers(response.data));
            await axios.get(process.env.REACT_APP_API_URL+"/user/list?api_token="+userToken)
        .then(response => setAllUsers(response.data));
        } else {
            setLoading(false);
        }
    };
    const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

    
    return(
        <>
        <Navmenu /> 
        <table className="ui celled table companiesTable">
            <thead>
                <tr><th>#</th>
                <th>user name</th>
                <th>user email</th>
                <th>Actions</th>
            </tr></thead>
            <tbody>
            {users.length > 0?users.map((curruser , i) =>{
            
            return (<tr key={curruser.id}> 
            <td data-label="ID">{i}</td>
            <td data-label="Name">{curruser.name}</td>
            <td data-label="Email">{curruser.email}</td>
            <td data-label="Actions">{user.uid == curruser.id?<button className="ui primary button" disabled>Remove</button>:<button className="ui primary button" onClick={() =>removeUser(curruser.id)}>Remove</button>}</td> 
            </tr>
            )}):<td colSpan="3">Company have no users</td>}
            </tbody>
        </table>

        <div className="login-container">
        <div className="ui card login-card">
            <div className="content">
            <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>
                    Available User
                    </label>
                    <select name="user" ref={register}>
                        {AllUsers.map((availuser , i) =>
                            availuser.company_id == null?<option key={availuser.id} value={availuser.id}>{availuser.name}</option>:null
                        )}
                    </select>
                </div>
                <button className="ui primary button login" type="submit">
                    Add User
                </button>
            </form>
            </div>
        </div>
        </div>
        
        </>
    );
}

export default Comapny;