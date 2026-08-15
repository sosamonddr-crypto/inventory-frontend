import { api } from "./api.js";

function toFormData(product) {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description || "");
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("supplierId", product.supplierId);
    if (product.image) {
        formData.append("image", product.image); // real File object
    }
    return formData;
}

export const ProductService = {
    getAll: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return api.get(`/products${query ? `?${query}` : ""}`);
    },
    getById: (id) => api.get(`/products/${id}`),
    create: (product) => api.post("/products", toFormData(product)),
    update: (id, product) => api.put(`/products/${id}`, toFormData(product)),
    remove: (id) => api.del(`/products/${id}`),
};
