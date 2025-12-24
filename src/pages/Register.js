import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { Helmet } from "react-helmet-async";

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Register Form</title>
      </Helmet>
      <h1>Register Page</h1>
      <RegisterForm />
    </>
  );
}
