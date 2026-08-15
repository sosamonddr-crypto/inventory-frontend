import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Layout from "./components/Layout/Layout.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import ProductView from "./pages/ProductView.jsx";
import ProductForm from "./pages/ProductForm.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import SupplierForm from "./pages/SupplierForm.jsx";

// Wraps every protected page in PrivateRoute + Layout just once,
// instead of repeating both on every single <Route>.
function ProtectedLayout() {
    return (
        <PrivateRoute>
            <Layout>
                <Outlet />
            </Layout>
        </PrivateRoute>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/new" element={<ProductForm />} />
                        <Route path="/products/:id" element={<ProductView />} />
                        <Route path="/products/:id/edit" element={<ProductForm />} />
                        <Route path="/suppliers" element={<Suppliers />} />
                        <Route path="/suppliers/new" element={<SupplierForm />} />
                        <Route path="/suppliers/:id/edit" element={<SupplierForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;