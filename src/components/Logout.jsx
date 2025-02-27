import { useDispatch } from "react-redux";
import { logout } from "../feature/authSlice";
import { useNavigate } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <h5 onClick={handleLogout} className='px-2 flex items-center'><span className='px-2'><PiSignIn className="w-7 h-7"/></span>Sign out</h5>
  );
}

export default Logout;
