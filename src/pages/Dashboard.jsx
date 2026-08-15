import { useEffect, useState } from "react";
import { ProductService } from "../services/productService.js";
import { SupplierService } from "../services/supplierService.js";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const [productList, supplierList] = await Promise.all([
                ProductService.getAll(),
                SupplierService.getAll(),
            ]);
            setProducts(productList);
            setSuppliers(supplierList);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <h2 className="page">Loading...</h2>;

    const lowStockCount = products.filter((p) => p.quantity < 5).length;

    return (
        <div>
            <h1>Inventory Dashboard</h1>

            <div className="cards">
                <div className="card">
                    Products
                    <br />
                    <b>{products.length}</b>
                </div>

                <div className="card">
                    Low Stock
                    <br />
                    <b>{lowStockCount}</b>
                </div>

                <div className="card">
                    Suppliers
                    <br />
                    <b>{suppliers.length}</b>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
