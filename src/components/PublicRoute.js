import { Navigate } from "react-router-dom";
import AuthUser from "./AuthUser";

export default function PublicRoute({ children }) {
    const { user } = AuthUser();
    return !user ? children : <Navigate to="/" />;
}