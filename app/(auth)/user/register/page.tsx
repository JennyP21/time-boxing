"use client"
import CustomError from '@/components/error/CustomError';
import { toast } from '@/components/error/Toast';
import ButtonSpinner from '@/components/loading/ButtonSpinner';
import ImageSelectorContainer from '@/components/ui/ImageSelectorContainer';
import Logo from '@/components/ui/Logo';
import { handleErrors } from '@/components/utils/handleErrors';
import { DASHBOARD_URL, userRegistrationError } from '@/constants';
import { UserI } from '@/interfaces';
import { useAddUserMutation } from '@/lib/features/userApi';
import { validateUser } from '@/validation';
import { Link } from '@chakra-ui/next-js';
import { Box, Button, ButtonGroup, Center, Flex, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import SignInWithGoogle from '../SignInWithGoogle';

const Register = () => {
    const session = useSession();
    const navigation = useRouter();
    if (session && session.data?.user) navigation.push(DASHBOARD_URL);

    const { register, handleSubmit, setValue, getValues, formState: { errors, isValid } } = useForm<UserI>({
        resolver: zodResolver(validateUser)
    });

    const [addUser, { error, isLoading }] = useAddUserMutation();
    if (error) handleErrors(error, userRegistrationError.type);

    const onSubmit = async (data: UserI) => {
        const imageData = getValues().imageData;
        const { name, email, password } = data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (imageData) formData.append("imageData", imageData);
        const user = await addUser(formData);
        if (user) {
            toast.success("Registered successfully");
            navigation.replace("/user/signin");
        }
    };

    return (
        <Box className='w-full h-full' bgImage="/images/signin-bg.jpg" objectFit="cover">
            <Center className='w-full h-full'>
                <Flex className='flex-col gap-4 bg-white p-10'>
                    <Logo />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errors && <CustomError>{errors.password?.message}</CustomError>}
                        <Flex className='flex-col gap-4'>
                            <Box>
                                <ImageSelectorContainer setValue={setValue} />
                            </Box>
                            <Box>
                                <label className='font-bold' htmlFor='name'>Name:</label>
                                <Input id='name' {...register("name")} min={3} isRequired />
                            </Box>
                            <Box>
                                <label className='font-bold' htmlFor='email'>Email:</label>
                                <Input id='email' {...register("email")} isRequired />
                            </Box>
                            <Box>
                                <label className='font-bold' htmlFor='password'>Password:</label>
                                <Input id='password' type='password' {...register("password")} isRequired />
                            </Box>
                            <ButtonGroup>
                                <Button type='submit' colorScheme='blue' isDisabled={!isValid || isLoading}>Register {isLoading && <ButtonSpinner />}</Button>
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

export default Register