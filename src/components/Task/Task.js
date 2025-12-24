import { MdClose } from "react-icons/md";
import css from "./Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleCompleted } from "../../redux/tasks/operations";
import { makeSelectCommentsForTask } from "../../redux/comments/selectors";
import CommentForm from "../CommentForm/CommentForm";
import { deleteComment } from "redux/comments/operations";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const comments = useSelector(makeSelectCommentsForTask(task.comments));

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggle = () => {
    dispatch(toggleCompleted(task));
  };
  return (
    <div>
      <div className={css.wrapper}>
        <input
          type="checkbox"
          className={css.checkbox}
          checked={task.completed}
          onChange={handleToggle}
        />
        <p className={css.text}>{task.text}</p>
        <button className={css.btn} onClick={handleDelete}>
          <MdClose size={24} />
        </button>
      </div>

      <div className={css.comments}>
        <h3>Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map(comment => {
              return (
                <li key={comment.id} className={css.commentItem}>
                  {comment.text}
                  <button
                    className={css.commentBtn}
                    onClick={() =>
                      dispatch(
                        deleteComment({
                          taskId: task.id,
                          commentId: comment.id,
                        })
                      )
                    }
                  >
                    <MdClose size={14} />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No comment for this task</p>
        )}
      </div>
      <CommentForm id={task.id} />
    </div>
  );
};
