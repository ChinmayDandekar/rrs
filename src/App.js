import logo from './logo.svg';
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import SearchPage from './components/SearchPage';
import Register from './components/Register';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';



function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="searchpage" element={<SearchPage />} />
      </Routes>
    </div>
  );
}



export default App;
