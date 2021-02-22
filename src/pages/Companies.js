import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from '../firebase/UserProvider';
import '../firebase/config';
import axios from "axios";
import { useHistory , Redirect , Link} from 'react-router-dom';
import Navmenu from "../Navmenu";

const Companies= (props) =>{
    const { user } = useSession();
    const [companies,setCompanies] = useState([]);
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/company/list")
        .then(response => setCompanies(response.data));
      },[]);


        return (
        <>
        <Navmenu />
        <h1>Comapnies</h1>
        <table className="ui celled table companiesTable">
            <thead>
                <tr><th>#</th>
                <th>Name</th>
                <th>Actions</th>
            </tr></thead>
            <tbody>
            {companies.map((company , i) =>{
            const URL = "/company/"+company.id; 
            const editURL = "/company/edit/"+company.id; 
            return(<tr key={company.id}> 
            <td data-label="ID">{i}</td>
            <td data-label="Name">{company.name}</td>
            <td data-label="Actions"><Link to={URL}>View</Link> / <Link to={editURL}>Edit</Link></td> 
            </tr>
            )})}
            </tbody>
        </table>
        </>
    );

}

export default Companies;