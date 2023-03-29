import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
    const { user } = useSelector(store => store.auth);

    if (!user) {
        return <Navigate to="/auth" replace />
    }
    return <>
        <Outlet/>
    </>
};
export default ProtectedRoutes;
