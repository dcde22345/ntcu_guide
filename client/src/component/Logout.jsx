import Axios from "axios";
import { Navigate } from "react-router-dom";
const Logout=()=>{
    Axios.get("http://localhost:3001"+"/logout")

    return <Navigate to="/login"/>
}

export default Logout;
