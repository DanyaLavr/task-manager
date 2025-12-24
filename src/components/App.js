import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Layout } from "./Layout/Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import NotificationContainer from "./Notification/Notification";

const HomePage = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const TasksPage = lazy(() => import("../pages/Tasks"));

export const App = () => {
  return (
    <>
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/login"
            element={
              <RestrictedRoute component={<LoginPage />} redirectTo="/tasks" />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/tasks"
              />
            }
          />
          {/* <Route path="/tasks" element={<TasksPage />} /> */}
          <Route
            path="/tasks"
            element={
              <PrivateRoute component={<TasksPage />} redirectTo="/login" />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
