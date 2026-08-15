const BASE_URL = "https://inventory-management-system-44py.onrender.com/api";

async function request(path, options = {}) {
    const token = localStorage.getItem("token");

    const headers = { ...options.headers };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    // Only set JSON content-type when we're not sending a file upload
    if (!(options.body instanceof FormData) && options.body) {
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Not authenticated");
    }

    if (res.status === 204) {
        return null; // no content, e.g. DELETE
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const message = data?.error || data?.message || "Request failed";
        const error = new Error(message);
        error.details = data?.details;
        throw error;
    }

    return data;
}

export const api = {
    get: (path) => request(path),
    post: (path, body) =>
        request(path, {
            method: "POST",
            body: body instanceof FormData ? body : JSON.stringify(body),
        }),
    put: (path, body) =>
        request(path, {
            method: "PUT",
            body: body instanceof FormData ? body : JSON.stringify(body),
        }),
    del: (path) => request(path, { method: "DELETE" }),
};

export const IMAGE_BASE_URL = "https://inventory-management-system-44py.onrender.com";
