import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductService } from "../services/productService.js";
import { IMAGE_BASE_URL } from "../services/api.js";

function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const load = async () => {
            setProduct(await ProductService.getById(id));
        };
        load();
    }, [id]);

    if (!product) return <h2 className="page">Loading...</h2>;

    return (
        <div className="page">
            <div className="form-card">
                {product.imageUrl && (
                    <img
                        className="product-image"
                        src={`${IMAGE_BASE_URL}${product.imageUrl}`}
                        alt={product.name}
                    />
                )}
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>
                    <b>Price:</b> ${product.price}
                </p>
                <p>
                    <b>Quantity:</b> {product.quantity}
                </p>
                <p>
                    <b>Supplier:</b> {product.Supplier ? product.Supplier.name : "-"}
                </p>

                <div className="form-actions">
                    <Link to={`/products/${product.id}/edit`}>
                        <button className="secondary">Edit</button>
                    </Link>
                    <Link to="/products">
                        <button>Back to Products</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductView;
