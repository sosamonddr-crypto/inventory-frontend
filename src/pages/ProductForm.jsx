import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "../services/productService.js";
import { SupplierService } from "../services/supplierService.js";

function ProductForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [image, setImage] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(isEdit);

    useEffect(() => {
        const load = async () => {
            setSuppliers(await SupplierService.getAll());
            if (isEdit) {
                const product = await ProductService.getById(id);
                setName(product.name);
                setDescription(product.description || "");
                setPrice(product.price);
                setQuantity(product.quantity);
                setSupplierId(product.supplierId || "");
                setExistingImageUrl(product.imageUrl);
                setLoading(false);
            }
        };
        load();
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = { name, description, price, quantity, supplierId, image };

        try {
            if (isEdit) {
                await ProductService.update(id, payload);
            } else {
                await ProductService.create(payload);
            }
            navigate("/products");
        } catch (err) {
            if (err.details) {
                setErrors(err.details);
            } else {
                setErrors([{ message: err.message }]);
            }
        }
    };

    if (loading) return <h2 className="page">Loading...</h2>;

    return (
        <div className="page">
            <div className="form-card">
                <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Description</label>
                    <textarea
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label>Quantity</label>
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <label>Supplier</label>
                    <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
                        <option value="">Select a supplier</option>
                        {suppliers.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>

                    <label>Image</label>
                    {existingImageUrl && !image && (
                        <p style={{ fontSize: "13px" }}>Current image will be kept unless you choose a new one.</p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    {errors.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                            {errors.map((err, i) => (
                                <p key={i} className="error-text">
                                    {err.field ? `${err.field}: ${err.message}` : err.message}
                                </p>
                            ))}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit">{isEdit ? "Save Changes" : "Add Product"}</button>
                        <button type="button" onClick={() => navigate("/products")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;
