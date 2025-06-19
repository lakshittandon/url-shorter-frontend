import UrlShortener from "../components/UrlShortener.jsx";
import "../index.css";     
import { useAuth } from '../context/AuthContext';

function Home() {
  return (
    <div className="app-wrapper">
      <UrlShortener />
    </div>
  );
}

export default Home;