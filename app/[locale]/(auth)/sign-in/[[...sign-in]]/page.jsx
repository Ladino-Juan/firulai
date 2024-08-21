import { SignIn } from "@clerk/nextjs"

export const metadata = {
  title: "Iniciar sesión"
}

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn  appearance={{
              elements: {
                formButtonPrimary: 'bg-green-500 hover:bg-darkestGreen text-sm duration-300',
                headerSubtitle: 'text-xs',
                headerTitle: 'text-gray-600 text-lg'
              },
            }}/>
    </div>
  );

}

export default SignInPage