import { StatusFilter } from "components/StatusFilter/StatusFilter";
import { TaskCounter } from "components/TaskCounter/TaskCounter";
import css from "./AppBar.module.css";
import Navigation from "components/Navigation/Navigation";
import UserMenu from "components/UserMenu/UserMenu";
import AuthMenu from "components/AuthMenu/AuthMenu";

export const AppBar = () => {
  const isLoggedIn = false;
  return (
    <header className={css.wrapper}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      {/* <section className={css.section}>
        <h2 className={css.title}>Tasks</h2>
        <TaskCounter />
      </section>
      <section className={css.section}>
        <h2 className={css.title}>Filter by status</h2>
        <StatusFilter />
      </section> */}
    </header>
  );
};
