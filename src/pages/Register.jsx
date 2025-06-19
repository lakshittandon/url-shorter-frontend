import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, checkAuth } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [form, set]  = useState({ name: '', email: '', password: '' });
  const [msg,  setMsg] = useState('');

  const onChange = e => set({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const me = await checkAuth();  // get user info
      setUser(me);                   // update context
      nav('/');                      // go to Home
    } catch (err) {
      setMsg(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="card">
      <h1 className="card__title">Sign Up</h1>
      <form onSubmit={submit} className="flex-col gap-4">
        <input name="name"     placeholder="Name"     value={form.name}     onChange={onChange} required />
        <input name="email"    placeholder="Email"    value={form.email}    onChange={onChange} required type="email" />
        <input name="password" placeholder="Password" value={form.password} onChange={onChange} required type="password"/>
        <button className="btn">Create Account</button>
      </form>
      {msg && <p className="error">{msg}</p>}
      <p className="mt-2 text-sm">
        Already have an account? <Link to="/login" className="link">Log In</Link>
      </p>
    </div>
    </div>
  );
}