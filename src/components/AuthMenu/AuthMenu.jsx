import { NavLink } from "react-router-dom";
import css from "./AuthMenu.module.css";
export default function AuthMenu() {
  return (
    <div className="">
      <NavLink className="link" to="/register">
        Register
      </NavLink>
      <NavLink className="link" to="/login">
        Login
      </NavLink>
    </div>
  );
}
