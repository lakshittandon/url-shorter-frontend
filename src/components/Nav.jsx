import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../api/client';

export default function Nav() {
  const { user, setUser } = useAuth();

  const doLogout = async () => {
    await logout();
    setUser(null);   
  };

  return (
    <nav className="nav">
      {user ? (
        <>
          <span>Hi, {user.email}</span>
          <button onClick={doLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
}