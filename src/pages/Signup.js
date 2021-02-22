import React , {useState , useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { signup } from "../firebase/auth";
import axios  from "axios";
import { Link } from "react-router-dom";

function Signup(props) {
    const {register , handleSubmit , reset} = useForm();
    const [isLoading, setLoading] = useState(false);
    const [companies,setCompanies] = useState([]);
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL+"/company/list")
        .then(response => setCompanies(response.data));
      },[]);
    

  const onSubmit = async (data) => {
    let newUser;
    setLoading(true);
    try {
      newUser = await signup(data);
      reset();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

  return (
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
            <div className="field">
              <label>
                Email
            </label>
                <input type="email" name="email" placeholder="Email" ref={register} />
            </div>
            <div className="field">
              <label>
                Password
                <input type="password" name="password" placeholder="Password" ref={register} />
              </label>
            </div>
            <div className="field">
                <label>
                    Company
                </label>
                <select className="ui fluid dropdown" name="companyID" ref={register}>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
                </select>
            </div>
            <div className="field actions">
              <button className="ui primary button" type="submit">
                Sign Up
              </button>
              or
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

