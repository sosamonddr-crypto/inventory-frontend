import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SupplierService } from "../services/supplierService.js";

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setSuppliers(await SupplierService.getAll());
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this supplier?")) return;
        await SupplierService.remove(id);
        load();
    };

    if (loading) return <h2 className="page">Loading...</h2>;

    return (
        <div>
            <h1>Suppliers</h1>

            <div className="search">
                <Link to="/suppliers/new">
                    <button>Add Supplier</button>
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((s) => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.contactEmail}</td>
                            <td>{s.phone}</td>
                            <td>
                                <Link to={`/suppliers/${s.id}/edit`}>
                                    <button className="secondary">Edit</button>
                                </Link>{" "}
                                <button className="danger" onClick={() => handleDelete(s.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Suppliers;
