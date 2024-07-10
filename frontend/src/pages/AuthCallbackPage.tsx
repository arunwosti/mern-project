import { useCreateMyUser } from "../api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const {createUser, } = useCreateMyUser(); // calling end point from anywhere in application
    const hasCreatedUser = useRef(false); // this line allows the useeffect to fire only once as useRef stores the state value

    useEffect(() => {
        if(user?.sub && user?.email&& !hasCreatedUser.current){
            createUser({auth0Id: user.sub, email: user.email});
            hasCreatedUser.current = true;
       }
       navigate("/");
    }, [createUser, navigate, user]);

    return <>Loading....</>
}

export default AuthCallbackPage;