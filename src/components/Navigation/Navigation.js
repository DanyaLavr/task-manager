import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { useAuth } from "../../hooks/useAuth";

const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} to="/tasks">
          Tasks
        </NavLink>
      )}
    </nav>
  );
};
