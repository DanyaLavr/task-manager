import { addComment } from "redux/comments/operations";
import { Button } from "../Button/Button";
import style from "./CommentForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CommentForm({ id }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addComment({ id, text }));
    setText("");
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.field}
        type="text"
        placeholder="Enter comment text..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button type="submit">Add Comment</Button>
    </form>
  );
}
