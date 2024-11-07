import MyNavbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
// import './App.css'

function App() {
  return (
    <div>
      <MyNavbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default App
