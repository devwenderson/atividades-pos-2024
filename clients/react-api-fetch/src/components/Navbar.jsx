import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="container">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Pokedex</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to={"/"}>Início</Link></li>
            <li><Link to={"/sobre"}>Sobre</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;