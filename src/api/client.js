const apiBase = import.meta.env.VITE_API_URL || "";

export async function api(path, options) {
  // If path starts with /api, make it absolute in prod
  const url = path.startsWith("http")
    ? path
    : apiBase + path;
  // For cookies (JWT auth), always include credentials
  return fetch(url, { credentials: "include", ...options });
}

  export const checkAuth = () =>
  api('/api/auth/me')          
    .then(r => (r.ok ? r.json() : null))
    .catch(() => null);



export const logout = () => api('/api/auth/logout', { method: 'POST' });

export const fetchMyUrls = () => api('/api/create/my');