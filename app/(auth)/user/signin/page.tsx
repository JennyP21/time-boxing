"use client"
import { useSession } from 'next-auth/react';
import SignIn from './SignIn';
import { useRouter } from 'next/navigation';
import { DASHBOARD_URL } from '@/constants';

interface Props {
    searchParams?: Record<"callbackUrl" | "error", string>;
}

const SignInPage = ({ searchParams }: Props) => {
    const session = useSession();
    const navigation = useRouter();
    if (session && session.data?.user) navigation.push(DASHBOARD_URL);

    return (
        <SignIn callbackUrl={searchParams?.callbackUrl} />
    )
}

export default SignInPage