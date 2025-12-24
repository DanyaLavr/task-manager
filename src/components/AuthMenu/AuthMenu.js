import { NavLink } from "react-router-dom";
import css from "./AuthMenu.module.css";

export const AuthMenu = () => {
  return (
    <div>
      <NavLink to="/register" className={css.link}>
        Register
      </NavLink>
      <NavLink to="/login" className={css.link}>
        Login
      </NavLink>
    </div>
  );
};
