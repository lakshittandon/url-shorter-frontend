import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, checkAuth } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [form, set] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const onChange = e => set({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await api('/api/auth/login', {
        method: 'POST',
        body: form,
      });
      if (!res.ok) throw new Error(await res.text());
      const me = await checkAuth();
      console.log("me after login:", me);  // get user info
      setUser(me);                   // update context
      nav('/');                      // go to Home
    } catch (err) {
      setMsg(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="card">
      <h1 className="card__title">Log In</h1>
      <form onSubmit={submit} className="flex-col gap-4">
        <input name="email"    placeholder="Email"    value={form.email}    onChange={onChange} required type="email" />
        <input name="password" placeholder="Password" value={form.password} onChange={onChange} required type="password"/>
        <button className="btn">Sign In</button>
      </form>
      {msg && <p className="error">{msg}</p>}
      <p className="mt-2 text-sm">
        No account? <Link to="/register" className="link">Sign Up</Link>
      </p>
    </div>
    </div>
  );
}