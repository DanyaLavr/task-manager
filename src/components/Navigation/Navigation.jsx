import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <NavLink className="link" to="/">
        Home
      </NavLink>
      <NavLink className="link" to="/tasks">
        Tasks
      </NavLink>
    </nav>
  );
}
