import LoginForm from "./login-form";

export default function SignIn() {
  return (
    <div className="mx-auto flex flex-col mt-9">
      <h1 className="text-2xl font-semibold text-center">Sign In</h1>
      <div className="flex items-center mt-16 gap-20">
        <LoginForm />
        <p className="font-bold text-3xl">/</p>
        {/* <SocialButtons /> */}
      </div>
      <p className="text-center mt-16 text-lg font-medium">
        New to InvEasy?{" "}
        <a href="/sign-up" className="font-semibold text-clique-dark">
          Sign Up.
        </a>
      </p>
    </div>
  );
}
