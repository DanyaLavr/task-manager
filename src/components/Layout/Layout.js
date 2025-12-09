import { AppBar } from "components/AppBar/AppBar";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export const Layout = () => {
  return (
    <main className={css.container}>
      <AppBar />
      <Suspense fallback={<p>Loading pages, please wait...</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
};
