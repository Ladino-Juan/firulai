import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Registrarse"
}


const SignUpPage = () => {
  return (
    <div className="w-full h-[120vh] flex justify-center items-center">
      <SignUp appearance={{
              elements: {
                formButtonPrimary: 'bg-green-500 hover:bg-darkestGreen text-sm duration-300',
                   headerSubtitle: 'text-xs',
                headerTitle: 'text-gray-600 text-lg',
              },
            }}/>
      </div>
  );
};

export default SignUpPage;
