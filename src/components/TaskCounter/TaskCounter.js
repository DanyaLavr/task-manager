import { useSelector } from "react-redux";
import css from "./TaskCounter.module.css";
import { selectTaskCounter, selectTasks } from "redux/selectors";

export const TaskCounter = () => {
  const { completed, active } = useSelector(selectTaskCounter);
  return (
    <div>
      <p className={css.text}>Active: {active}</p>
      <p className={css.text}>Completed: {completed}</p>
    </div>
  );
};
