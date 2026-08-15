import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../services/api.js";

const MAX_STOCK_DISPLAY = 50;

function getStockStatus(quantity) {
    if (quantity === 0) return { label: "Out of stock", className: "out" };
    if (quantity < 5) return { label: "Low stock", className: "low-badge" };
    return { label: "In stock", className: "in" };
}

function ProductRow({ product, onDelete }) {
    const stock = getStockStatus(product.quantity);
    const barWidth = Math.min((product.quantity / MAX_STOCK_DISPLAY) * 100, 100);

    return (
        <div className="product-card">
            <div className="product-card-image-wrap">
                {product.imageUrl ? (
                    <img
                        src={`${IMAGE_BASE_URL}${product.imageUrl}`}
                        alt={product.name}
                        className="product-card-image"
                    />
                ) : (
                    <div className="product-card-image product-card-noimage">📦</div>
                )}
                <span className={`stock-badge ${stock.className}`}>{stock.label}</span>
            </div>

            <div className="product-card-body">
                <p className="product-card-supplier">
                    {product.Supplier ? product.Supplier.name : "No supplier"}
                </p>
                <h3 className="product-card-name">{product.name}</h3>

                <div className="stock-bar-row">
                    <div className="stock-bar-track">
                        <div
                            className={`stock-bar-fill ${stock.className}`}
                            style={{ width: `${barWidth}%` }}
                        />
                    </div>
                    <span className="stock-bar-label">{product.quantity} left</span>
                </div>

                <div className="product-card-footer">
                    <span className="product-card-price">${product.price}</span>
                    <div className="product-card-actions">
                        <Link to={`/products/${product.id}`}>
                            <button className="secondary">View</button>
                        </Link>
                        <Link to={`/products/${product.id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        <button className="danger" onClick={() => onDelete(product.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductRow;