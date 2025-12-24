import { LoginForm } from "../components/LoginForm/LoginForm";
import { Helmet } from "react-helmet-async";
export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <h1>Login Page</h1>

      <LoginForm />
    </>
  );
}
