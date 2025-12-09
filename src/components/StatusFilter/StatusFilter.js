import { Button } from "components/Button/Button";
import css from "./StatusFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { statusFilter } from "redux/constants";
import { selectStatus } from "redux/selectors";
import { setStatusFilter } from "redux/filtersSlice";
export const StatusFilter = () => {
  const filter = useSelector(selectStatus);
  const dispatch = useDispatch();
  const onClick = val => dispatch(setStatusFilter(val));
  return (
    <div className={css.wrapper}>
      <Button
        onClick={() => onClick(statusFilter.all)}
        selected={filter === statusFilter.all}
      >
        All
      </Button>
      <Button
        onClick={() => onClick(statusFilter.active)}
        selected={filter === statusFilter.active}
      >
        Active
      </Button>
      <Button
        onClick={() => onClick(statusFilter.completed)}
        selected={filter === statusFilter.completed}
      >
        Completed
      </Button>
    </div>
  );
};
