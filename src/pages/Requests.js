import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from '../firebase/UserProvider';
import '../firebase/config';
import axios from "axios";
import { useHistory , Redirect , Link} from 'react-router-dom';
import Navmenu from "../Navmenu";
import Comapny from './Company';

const Requests= (props) =>{
    const { user } = useSession();
    const [userData,setUserData] = useState({name:"",email:"",api_token:""});
    const [requestsByUser,setrequestsByUser] = useState([]);
    const [companies,setCompanies] = useState([]);
    const [selectedCompany,setselectedCompany] = useState([]);
    const [companyUsers,setCompanyUsers] = useState([]);
    const history = useHistory();
    const {register , handleSubmit , reset} = useForm();
    const [isLoading, setLoading] = useState(false);

    /**Get all requests  */
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/request/list?api_token="+userToken)
        .then(response => setrequestsByUser(response.data));
    },[]);

  

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
    
    /**Get all companies  */
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/company/list")
        .then(response => setCompanies(response.data));
      },[]);

    const listUser= async (event) =>{
        setselectedCompany(event.target.value);
        await axios.get(process.env.REACT_APP_API_URL+"/company/users/"+event.target.value+"?api_token="+userToken)
        .then(response => setCompanyUsers(response.data));
    }
    const initUser= async (id) =>{
        await axios.get(process.env.REACT_APP_API_URL+"/company/users/"+id+"?api_token="+userToken)
        .then(response => setCompanyUsers(response.data));
    }

    useEffect(() => {
        if(companies.length>0){
            initUser(companies[0].id);
        } 
      },[companies]);
    
    /**Handling request add */
    const onSubmit = async (data) => {
        setLoading(true);
        let resp;
        try {
            resp = await axios.post(process.env.REACT_APP_API_URL+"/request/add?api_token="+userToken,{type:data.type,description:data.description,user_id:data.user,company_id:data.company,created_by_uid:user.uid});
            console.log(resp);
            reset();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

        if (resp.data.status == "success") {
           
        } else {
            setLoading(false);
        }
    };
    const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

    return (
        <>
        <Navmenu />
        <h1>Requests Created by you</h1>
        <table className="ui celled table requestsTable">
            <thead>
                <tr><th>#</th>
                <th>type</th>
                <th>status</th>
                <th>description</th>
            </tr></thead>
            <tbody>
            {requestsByUser.length>0?requestsByUser.map( (request , i) =>{
            
            return(request.created_by_uid == user.uid?<tr key={request.id}> 
            <td>{i}</td>
            <td>{request.type}</td>
            <td>{request.status}</td>
            <td>{request.description}</td>
            </tr>:null
            )}):<td colSpan="4">No Requests created</td>}
            </tbody>
        </table>
        <div className="login-container">
            <div className="ui card login-card" style={{marginTop:0}}>
            <div className="content">
            <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>
                    Type
                    </label>
                    <select
                        name="type"
                        ref={register}
                        required
                    >
                        <option key="1" value="breakdown">Breakdown</option>
                        <option key="2" value="maintenance">Maintenance</option>
                        <option key="3" value="replacement">Replacement</option>
                        <option key="4" value="demobilisation">Demobilisation</option>
                    </select>
                </div>
                <div className="field">
                    <label>
                    Company
                    </label>
                    <select
                        name="company"
                        ref={register}
                        onChange={listUser}
                        value={selectedCompany}
                        required
                    >
                    {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
                    </select>
                </div>
                <div className="field">
                <label>
                    User
                </label>
                <select
                        name="user"
                        ref={register}
                        onChange={() => listUser}
                        required
                    >
                    {companyUsers.map((Companyuser) => <option key={Companyuser.id} value={Companyuser.id}>{Companyuser.name}</option>)}
                </select>
                </div>
                <div className="field">
                <label>
                    Description
                    <textarea  name="description" placeholder="request description" ref={register} required/>
                </label>
                </div>
                <button className="ui primary button" type="submit">
                    Add Request
                </button>
            </form>
            </div>
        </div>
        </div>

        </>
    );

}

export default Requests;