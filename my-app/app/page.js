import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Home() {
  return (
    <>
    <div className='w-full h-screen flex flex-row justify-center items-center'>

    <SignIn routing="path" path="/"></SignIn>
    </div>
    </>
  );
}
