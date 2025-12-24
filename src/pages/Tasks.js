import { TaskList } from "../components/TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../redux/tasks/operations";
import { useEffect } from "react";
import { selectIsLoading } from "../redux/tasks/selectors";
import { Helmet } from "react-helmet-async";
import { FilterMenu } from "../components/FilterMenu/FilterMenu";
import { TaskForm } from "../components/TaskForm/TaskForm";

export default function Tasks() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Tasks Page</title>
      </Helmet>
      <h1>Tasks Page</h1>
      <FilterMenu />
      <TaskForm />
      {isLoading && <p>Request in process...</p>}

      <TaskList />
    </>
  );
}
