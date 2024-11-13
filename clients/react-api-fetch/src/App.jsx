import MyNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div>
      <MyNavbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
