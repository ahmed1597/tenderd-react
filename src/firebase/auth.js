import firebase from "firebase/app";
import  "firebase/auth";
import axios from "axios";

export const signup = async ({ firstName, lastName, email, password  , companyID}) => {
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = resp.user;
    await axios.post(process.env.REACT_APP_API_URL+"/user/add",{id:user.uid,name:firstName+" "+lastName,email:email,password:password,company_id:companyID});
    await user.updateProfile({ displayName: `${firstName} ${lastName}` });
    return user;
};

export const logout = () => {
    return firebase.auth().signOut();
};

export const login = async ({ email, password }) => {
const resp = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

return resp.user;
};
