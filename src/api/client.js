
export const api = (path, options = {}) =>
  fetch(path, {
    credentials: 'include',         
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  export const checkAuth = () =>
  api('/api/auth/me')          
    .then(r => (r.ok ? r.json() : null))
    .catch(() => null);



export const logout = () => api('/api/auth/logout', { method: 'POST' });

export const fetchMyUrls = () => api('/api/create/my');