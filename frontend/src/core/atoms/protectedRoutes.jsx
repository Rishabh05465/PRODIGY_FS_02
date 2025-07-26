import {useEffect} from "react"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token")
  useEffect(() => {
    if (!token || token === "") {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token || token === "") {
    return null; // Render nothing until navigation happens
  }
  return children;
};

export default ProtectedRoute;