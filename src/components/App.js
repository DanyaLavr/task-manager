import { Layout } from "components/Layout/Layout";
import { AppBar } from "components/AppBar/AppBar";
import { TaskForm } from "components/TaskForm/TaskForm";
import { TaskList } from "components/TaskList/TaskList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "redux/opertions";
import { selectTasksError, selectTasksLoading } from "redux/selectors";
import { selectAllTasks } from "redux/taskSlice";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

const HomePage = lazy(() => import("../pages/Home.jsx"));
const LoginPage = lazy(() => import("../pages/Login.jsx"));
const RegisterPage = lazy(() => import("../pages/Register.jsx"));
const TasksPage = lazy(() => import("../pages/Tasks.jsx"));
export const App = () => {
  // const dispatch = useDispatch();
  // const tasks = useSelector(selectAllTasks);
  // const isTasksLoading = useSelector(selectTasksLoading);
  // const errorTasks = useSelector(selectTasksError);
  // useEffect(() => {
  //   dispatch(fetchAll());
  // }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>

    // <Layout>
    //   <AppBar />
    //   <TaskForm />
    //   {isTasksLoading && <p>Loading...</p>}
    //   {errorTasks && <p>Error: {errorTasks}</p>}
    //   {tasks.length && <TaskList />}
    // </Layout>
  );
};
