import { Button } from "../Button/Button";
import css from "./TaskForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/tasks/operations";
import { useAuth } from "../../hooks/useAuth";
import { selectAllUsers } from "redux/user/usersSlice";

export const TaskForm = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isAdmin = user.role === "admin";
  const users = useSelector(selectAllUsers);
  if (!isAdmin) return null;
  console.log(users);
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const selectedUserEmail = form.elements.userEmails.value;
    const textTask = form.elements.text.value;

    if (textTask.trim() !== "" && selectedUserEmail) {
      const selectedUser = users.find(elem => elem.email === selectedUserEmail);
      const userId = selectedUser.uid;
      dispatch(addTask({ text: textTask, userId }));
      form.reset();
      return;
    }
    alert("Task cannot be empty!");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.field}
        type="text"
        name="text"
        placeholder="Enter task text..."
      />
      <select name="userEmails" required>
        <option value="">Select user...</option>
        {users.map(user => (
          <option key={user.uid} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>
      <Button type="submit">Add task</Button>
    </form>
  );
};
