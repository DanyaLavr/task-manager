import css from "./LoginForm.module.css";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { addNotification } from "redux/notification/notificationSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginInitialValues } from "lib/formik/initialValues";
import { LoginSchema } from "lib/formik/schemas";
import { Loader } from "components/Loader/Loader";
import { selectUserIsLoading } from "redux/auth/selectors";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);
  const handleSubmit = async values => {
    const res = await dispatch(login(values));
    if (login.fulfilled.match(res))
      dispatch(
        addNotification({
          message: "Вітаємо! Ви успішно увійшли в систему",
          type: "success",
        })
      );
    if (login.rejected.match(res)) {
      const error = res.payload || "Невідома помилка";
      dispatch(
        addNotification({
          message: `Упс... Сталась помилка ${error}`,
          type: "error",
        })
      );
    }
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <Field name="email" type="email" placeholder="email" />
          <ErrorMessage name="email" />
        </label>
        <label className={css.label}>
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" />
        </label>
        {isLoading && <Loader />}
        <Button disabled={isLoading} type="submit">
          Login
        </Button>
      </Form>
    </Formik>
  );
};
