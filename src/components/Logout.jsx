import { useDispatch } from "react-redux";
import { logout } from "../feature/authSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 focus:ring-4 focus:ring-red-500"
    >
      Logout
    </button>
  );
}

export default Logout;
