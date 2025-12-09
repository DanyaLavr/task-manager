import { Button } from "components/Button/Button";
import css from "./Comment.module.css";
import { useDispatch } from "react-redux";
import { addComment } from "redux/opertions";
import { useRef } from "react";
export default function CommentForm({ id }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const onSubmit = e => {
    e.preventDefault();
    dispatch(addComment({ id, text: inputRef.current.value }));
  };
  return (
    <form action="" onSubmit={onSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        ref={inputRef}
        placeholder="Enter comment..."
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
