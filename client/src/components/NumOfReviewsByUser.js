
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../features/authSlice";




const NumOfReviewsByUser = () => {
    

    const dispatch = useDispatch();

    const { oneUserByAdmin } = useSelector((store) => store.auth);
    

    useEffect(() => {
    
    }, []);
    

    return <div>Yo!</div>;
};
export default NumOfReviewsByUser;
