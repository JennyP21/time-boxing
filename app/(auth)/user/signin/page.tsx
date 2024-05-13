"use client"
import SignIn from './SignIn';

interface Props {
    searchParams?: Record<"callbackUrl" | "error", string>;
}

const SignInPage = ({ searchParams }: Props) => {
    return (
        <SignIn authError={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
    )
}

export default SignInPage