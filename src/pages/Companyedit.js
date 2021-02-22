import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';
import '../firebase/config';
import axios from "axios";
import { useHistory , Redirect , Link} from 'react-router-dom';
import Navmenu from "../Navmenu";
import { useForm } from 'react-hook-form';


const Comapnyedit = () =>{
    const params = useParams();
    const { user } = useSession();
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


    /**Handling update company */
    const onSubmit = async (data) => {
        setLoading(true);
        let resp;
        try {
            resp = await axios.put(process.env.REACT_APP_API_URL+"/company/edit?api_token="+userToken,{id:params.id,name:data.name});
            reset();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

        if (resp.data.status == "success") {
            history.push('/companies');
        } else {
            setLoading(false);
        }
    };
    const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

    
    return(
        <>
        <Navmenu /> 

        <div className="login-container">
        <div className="ui card login-card">
            <div className="content">
            <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>
                    Company Name
                    </label>
                    <input type="text" ref={register} name="name" />
                </div>
                <button className="ui primary button login" type="submit">
                    Update company
                </button>
            </form>
            </div>
        </div>
        </div>
        
        </>
    );
}

export default Comapnyedit;