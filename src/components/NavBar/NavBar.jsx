import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function NavBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="nav">
           <h2>📦 StockSOS</h2>
            <div>
                <Link to="/">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/suppliers">Suppliers</Link>
                <a onClick={handleLogout}>Logout</a>
            </div>
        </div>
    );
}

export default NavBar;
