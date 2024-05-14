"use client"
import CustomError from '@/components/error/CustomError';
import { toast } from "@/components/error/Toast";
import ButtonSpinner from '@/components/loading/ButtonSpinner';
import Logo from '@/components/ui/Logo';
import { DASHBOARD_URL, userSignInError } from '@/constants';
import { AccountI } from '@/interfaces';
import { validateUserSignin } from '@/validation';
import { Link } from '@chakra-ui/next-js';
import { Box, Button, ButtonGroup, Center, Flex, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SignInWithGoogle from '../SignInWithGoogle';

interface Props {
    callbackUrl?: string;
}

const SignIn = ({ callbackUrl }: Props) => {
    const [loading, setLoading] = useState(false);
    const navigation = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<AccountI>({
        resolver: zodResolver(validateUserSignin)
    });

    const onSubmit = async (data: AccountI) => {
        const { email, password } = data;
        setLoading(true);
        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        })
        setLoading(false);
        if (result?.error) {
            toast.error(result.error, { toastId: userSignInError.type });
        } else if (result?.ok) {
            navigation.push(callbackUrl ?? DASHBOARD_URL);
        }
    };

    return (
        <Box className='w-full h-full' bgImage="/images/signin-bg.jpg" objectFit="cover">
            <Center className='w-full h-full'>
                <Flex className='flex-col gap-4 bg-white p-10'>
                    <Logo />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errors && errors.password && <CustomError>{errors.password.message}</CustomError>}
                        <Flex className='flex-col gap-4'>
                            <Box>
                                <label className='font-bold' htmlFor='email'>Email:</label>
                                <Input id='email' {...register("email")} isRequired />
                            </Box>
                            <Box>
                                <label className='font-bold' htmlFor='password'>Password:</label>
                                <Input id='password' type='password' {...register("password")} isRequired autoComplete='on' />
                            </Box>
                            <ButtonGroup>
                                <Button type='submit' colorScheme='blue'>Login {loading && <ButtonSpinner />}</Button>
                                <Link href="/"><Button>Cancel</Button></Link>
                            </ButtonGroup>
                        </Flex>
                    </form>
                    <SignInWithGoogle />
                </Flex>
            </Center>
        </Box>
    )
}

export default SignIn