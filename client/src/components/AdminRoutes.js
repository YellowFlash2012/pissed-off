import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
    const { user } = useSelector((store) => store.auth);

    if (!user || (user && !user.isAdmin)) {
        return <Navigate to="/home" replace />;
    }
    return (
    
            <Outlet />
        
    );
};
export default AdminRoutes;
