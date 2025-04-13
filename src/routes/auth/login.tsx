import { createFileRoute, Link } from "@tanstack/react-router";

const LoginPage = () => {
  return (
    <div>
      <p>Login Page</p>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
