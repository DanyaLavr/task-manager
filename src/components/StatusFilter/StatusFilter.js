import { Button } from "../Button/Button";
import css from "./StatusFilter.module.css";
import { useSelector } from "react-redux";
import { statusFilter } from "../../redux/filters/selectors";
import { selectFilter } from "../../redux/filters/selectors";
import { useDispatch } from "react-redux";
import { setStatusFilter } from "../../redux/filters/filtersSlice";

export const StatusFilter = () => {
  const filter = useSelector(selectFilter); // all

  const dispatch = useDispatch();

  const haddleFilterChange = (filter) => dispatch(setStatusFilter(filter));

  //!!! filter === statusFilter.all || all === all - true
  //!!! filter === statusFilter.active || all === active - false
  //!!! filter === statusFilter.completed || all === completed - false

  return (
    <div className={css.wrapper}>
      <Button
        selected={filter === statusFilter.all}
        onClick={() => haddleFilterChange(statusFilter.all)}
      >
        All
      </Button>
      <Button
        selected={filter === statusFilter.active}
        onClick={() => haddleFilterChange(statusFilter.active)}
      >
        Active
      </Button>
      <Button
        selected={filter === statusFilter.completed}
        onClick={() => haddleFilterChange(statusFilter.completed)}
      >
        Completed
      </Button>
    </div>
  );
};
