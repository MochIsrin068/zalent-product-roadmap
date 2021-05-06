import { Link } from "react-router-dom";

import Authentication from "../Services/Authentication";

import Logo from "../Assets/images/Logo";
import ExitIcon from "../Assets/icons/ExitIcon";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <Link to="/">
        <Logo />
      </Link>

      <div
        onClick={() => {
          Authentication.logout();
          window.location.reload();
        }}
      >
        <ExitIcon />
      </div>
    </nav>
  );
};

export default Sidebar;
