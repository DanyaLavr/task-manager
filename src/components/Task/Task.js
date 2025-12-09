import { MdClose } from "react-icons/md";
import css from "./Task.module.css";
import { useDispatch, useSelector } from "react-redux";

import { deleteComment, deleteTask, toggleCompleted } from "redux/opertions";
import { makeSelectCommentsForTask } from "redux/selectors";
import CommentForm from "components/CommentForm/CommentForm";

export const Task = ({ task }) => {
  const comments = useSelector(makeSelectCommentsForTask(task.comments));

  const dispatch = useDispatch();
  return (
    <>
      <div className={css.wrapper}>
        <input
          type="checkbox"
          className={css.checkbox}
          checked={task.completed}
          onChange={() => {
            dispatch(toggleCompleted(task));
          }}
        />
        <p className={css.text}>{task.text}</p>
        <button
          className={css.btn}
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <MdClose size={24} />
        </button>
      </div>
      <CommentForm id={task.id} />
      <div className={css.comments}>
        <h4>Comments</h4>
        <ul>
          {comments?.length > 0 ? (
            comments.map(elem => (
              <li className={css.listItem} key={elem.id}>
                <p> {elem.text}</p>
                <button
                  className={css.btn}
                  onClick={() =>
                    dispatch(
                      deleteComment({ taskId: task.id, commentId: elem.id })
                    )
                  }
                >
                  <MdClose size={14} />
                </button>
              </li>
            ))
          ) : (
            <p>No comments</p>
          )}
        </ul>
      </div>
    </>
  );
};
