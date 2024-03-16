import { Button, Center, Icon, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react';
import Image from 'next/image';

const NavLinks = () => {
    const logged_in = false;
    return (
        <>
            {logged_in ?
                <Stack
                    direction={'row'}
                    spacing="1"
                    alignItems={'center'}
                >
                    <Button size={{ sm: "md", base: "sm" }} fontWeight={400} variant={'link'}>
                        Sign In
                    </Button>
                    <Button
                        size={{ sm: "md", base: "sm" }}
                        fontWeight={600}
                        colorScheme='blue'
                    >
                        Sign Up
                    </Button>
                </Stack>
                :
                <Center>
                    <Menu>
                        <MenuButton as={Button} borderRadius="50%" colorScheme='gray' width={{ sm: 10, base: 8 }} height={{ sm: 10, base: 8 }}>
                            <Image src="profile-default.svg" fill className='object-contain' alt="profile" />
                        </MenuButton>
                        <MenuList fontSize={{ sm: "medium", base: "small" }}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Center>
            }
        </>
    )
}

export default NavLinks