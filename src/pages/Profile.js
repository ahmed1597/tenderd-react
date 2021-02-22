import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from '../firebase/UserProvider';
import '../firebase/config';
import axios from "axios";
import { logout } from '../firebase/auth';
import { useHistory , Redirect} from 'react-router-dom';

const Profile= (props) =>{
    const { user } = useSession();
    const history = useHistory();
    const {register , handleSubmit , reset} = useForm();
    const [isLoading, setLoading] = useState(false);
    const [userData,setUserData] = useState({name:"",email:"",api_token:""});
    const [company,setCompany] = useState([]);

    /**logout handler */
    const logoutUser = async () => {
        await logout();
        history.push('/login');
    };


    /**Get User Data */
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/user/info/"+user.uid)
        .then(response => setUserData(response.data));
    },[]);

    /**Get user company name*/
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/company/list/"+userData["company_id"])
        .then(response => setCompany(response.data));
    },[userData]);

    /**Save Token */
    let userToken="";
    if(userData){
        userToken = userData["api_token"];
    }
    
    /**Handling update */
    const onSubmit = async (data) => {
        setLoading(true);
        let resp;
        try {
            resp = await axios.put(process.env.REACT_APP_API_URL+"/user/edit?api_token="+userToken,{id:userData["id"],name:data.firstName+" "+data.lastName});
            reset();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

        if (resp.data.status == "success") {
            setUserData({name:data.firstName+" "+data.lastName,email:userData["email"],api_token:userToken,company_id:userData["company_id"]});
        } else {
            setLoading(false);
        }
    };
    const formClassName = `ui form ${isLoading ? 'loading' : ''}`;
if(userData)
    return (
        <>
        <div className="login-container">
        <div className="ui card login-card">
            <div className="content">
                <div className="header">
                    {userData["name"]}
                </div>
                <div className="meta">
                    {company.name}
                </div>
                <div className="description">
                    {userData["email"]}
                </div>
                {!!user && (
                    <div className="description">
                        <button className="ui primary button login" onClick={logoutUser}>
                            LOGOUT
                        </button>
                    </div>
                )}
                
            </div>
        </div>
        </div>
        <div className="login-container">
        <div className="ui card login-card">
            <div className="content">
            <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
                <div className="two fields">
                <div className="field">
                    <label>
                    First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        ref={register}
                    />
                </div>
                <div className="field">
                    <label>
                    Last Name
                    </label>
                    <input type="text" name="lastName" placeholder="Last Name" ref={register}/>
                </div>
                </div>
                <button className="ui primary button login" type="submit">
                    Update Name
                </button>
            </form>
            </div>
        </div>
        </div>
        </>
    );

    else{

    }
}

export default Profile;