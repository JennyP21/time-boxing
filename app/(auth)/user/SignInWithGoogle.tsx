import { DASHBOARD_URL } from '@/constants'
import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

const SignInWithGoogle = () => {
    return (
        <Button onClick={() => signIn('google', { redirect: true, callbackUrl: DASHBOARD_URL })}>
            <Flex className='gap-2 justify-center items-center'>
                <Icon as={FcGoogle} w={6} h={6} />
                <Text>Sign in with Google</Text>
            </Flex>
        </Button>
    )
}

export default SignInWithGoogle