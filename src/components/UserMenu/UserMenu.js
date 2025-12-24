import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "components/Button/Button";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.wrapper}>
      <h2 className={css.username}>Welcome, {user.name}</h2>
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </div>
  );
};
