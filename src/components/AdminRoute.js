import { Navigate } from "react-router-dom";
import AuthUser from "./AuthUser";

export default function AdminRoute({ children }) {
    const { user } = AuthUser();
    return user.role === '1' ? children : <Navigate to="/" />;
}