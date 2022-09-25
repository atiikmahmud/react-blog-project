import { Navigate } from "react-router-dom";
import AuthUser from "./AuthUser";

export default function PrivateRoute({ children }) {
    const { user } = AuthUser();
    return user ? children : <Navigate to="/login" />;
}