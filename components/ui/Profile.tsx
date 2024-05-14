import { UserI } from '@/interfaces';
import { validatePatchUser } from '@/validation';
import { Box, Button, ButtonGroup, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: UserI;
}

const Profile = ({ onClose, isOpen, user }: Props) => {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<UserI>({
        resolver: zodResolver(validatePatchUser),
        defaultValues: user
    });

    const onSubmit = (data: UserI) => { };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <form onClick={handleSubmit(onSubmit)}>
                    <ModalHeader>{user.name}'s Profile</ModalHeader>
                    <ModalBody>
                        <Flex className='flex-col gap-3'>
                            <Box>
                                <label htmlFor='email'>Email:</label>
                                <Input id='email' isDisabled _disabled={{ textColor: "gray.400" }} {...register("email")} />
                            </Box>
                            <Box>
                                <label htmlFor='name'>Name:</label>
                                <Input id='name' {...register("name")} />
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button colorScheme='blue' isDisabled={(!isDirty || !isValid)}>Save</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default Profile