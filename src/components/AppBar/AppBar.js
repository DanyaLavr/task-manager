import css from "./AppBar.module.css";
import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthMenu } from "../AuthMenu/AuthMenu";
import { useAuth } from "../../hooks/useAuth";

export const AppBar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header className={css.wrapper}>
      <Navigation />

      {isLoggedIn ? <UserMenu /> : <AuthMenu />}
    </header>
  );
};
