import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SupplierService } from "../services/supplierService.js";

function SupplierForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(isEdit);

    useEffect(() => {
        const load = async () => {
            if (isEdit) {
                const supplier = await SupplierService.getById(id);
                setName(supplier.name);
                setContactEmail(supplier.contactEmail);
                setPhone(supplier.phone);
                setLoading(false);
            }
        };
        load();
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = { name, contactEmail, phone };

        try {
            if (isEdit) {
                await SupplierService.update(id, payload);
            } else {
                await SupplierService.create(payload);
            }
            navigate("/suppliers");
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
                <h2>{isEdit ? "Edit Supplier" : "Add Supplier"}</h2>

                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Contact Email</label>
                    <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />

                    <label>Phone</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} />

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
                        <button type="submit">{isEdit ? "Save Changes" : "Add Supplier"}</button>
                        <button type="button" onClick={() => navigate("/suppliers")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SupplierForm;
