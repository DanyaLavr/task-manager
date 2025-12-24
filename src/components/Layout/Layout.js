import { Outlet } from "react-router-dom";
import { AppBar } from "../AppBar/AppBar";
import css from "./Layout.module.css";
import { Suspense } from "react";

export const Layout = () => {
  return (
    <main className={css.container}>
      <AppBar />
      <Suspense fallback={<p>Loading pages please wait</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
};
