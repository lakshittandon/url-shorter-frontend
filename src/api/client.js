const apiBase = import.meta.env.VITE_API_URL || "";

// src/api/client.js
export async function api(path, options = {}) {
  const apiBase = import.meta.env.VITE_API_URL || "";
  const url = path.startsWith("http") ? path : apiBase + path;

  // Add these debug logs:
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("fetching login URL:", url);

  const opts = {
    credentials: "include",
    ...options
  };

  if (opts.body && typeof opts.body === "object") {
    opts.headers = {
      "Content-Type": "application/json",
      ...(opts.headers || {})
    };
    opts.body = JSON.stringify(opts.body);
  }

  return fetch(url, opts);
}

  export const checkAuth = () =>
  api('/api/auth/me')          
    .then(r => (r.ok ? r.json() : null))
    .catch(() => null);



export const logout = () => api('/api/auth/logout', { method: 'POST' });

export const fetchMyUrls = () => api('/api/create/my');