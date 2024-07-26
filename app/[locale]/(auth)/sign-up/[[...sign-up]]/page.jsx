import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="w-full h-[120vh] flex justify-center items-center">
      <SignUp />
      </div>
  );
};

export default SignUpPage;
