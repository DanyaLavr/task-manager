import { Button } from "components/Button/Button";
import css from "./UserMenu.module.css";
export default function UserMenu() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.username}>Welcome, user</h2>
      <Button>Logout</Button>
    </div>
  );
}
