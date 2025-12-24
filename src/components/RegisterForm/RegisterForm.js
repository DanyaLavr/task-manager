import css from "./RegisterForm.module.css";
import { Button } from "../Button/Button";
import { register } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "redux/notification/notificationSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerInitialValues } from "lib/formik/initialValues";
import { RegisterSchema } from "lib/formik/schemas";
import { selectUserIsLoading } from "redux/auth/selectors";
import { Loader } from "components/Loader/Loader";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);
  const handleSubmit = async values => {
    const res = await dispatch(register(values));
    if (register.fulfilled.match(res))
      dispatch(
        addNotification({ message: "Реєстрація завершена", type: "success" })
      );
    if (register.rejected.match(res)) {
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
      initialValues={registerInitialValues}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <Field name="name" placeholder="name" />
          <ErrorMessage name="name" />
        </label>
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
          Register
        </Button>
      </Form>
    </Formik>
  );
};
