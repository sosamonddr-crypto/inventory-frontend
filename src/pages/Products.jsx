import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductService } from "../services/productService.js";
import { SupplierService } from "../services/supplierService.js";
import ProductRow from "../components/ProductRow/ProductRow.jsx";

function Products() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        const params = {};
        if (search) params.search = search;
        if (supplierId) params.supplierId = supplierId;
        const data = await ProductService.getAll(params);
        setProducts(data);
    };

    useEffect(() => {
        const init = async () => {
            setSuppliers(await SupplierService.getAll());
            await loadProducts();
            setLoading(false);
        };
        init();
    }, []);

    useEffect(() => {
        if (!loading) loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, supplierId]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        await ProductService.remove(id);
        loadProducts();
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Products</h1>
                    <p className="page-subtitle">All the items in your catalogue</p>
                </div>
                <Link to="/products/new">
                    <button>Add Product</button>
                </Link>
            </div>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
                    <option value="">All Suppliers</option>
                    {suppliers.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p style={{ margin: "30px" }}>Loading...</p>
            ) : (
                <div className="product-grid">
                    {products.map((p) => (
                        <ProductRow key={p.id} product={p} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;