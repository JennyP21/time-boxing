import { userUpdateError } from '@/constants';
import { UserI } from '@/interfaces';
import { useUpdateUserMutation } from '@/lib/features/userApi';
import { validatePatchUser } from '@/validation';
import { Box, Button, ButtonGroup, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ButtonSpinner from '../loading/ButtonSpinner';
import { handleErrors } from '../utils/handleErrors';
import ImageSelector from './ImageSelector';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: UserI;
}

const Profile = ({ onClose, isOpen, user }: Props) => {
    const { register, handleSubmit, setValue, getValues, formState: { isDirty, isValid } } = useForm<UserI>({
        resolver: zodResolver(validatePatchUser),
        defaultValues: { id: user.id, email: user.email, name: user.name, image: user.image, imageData: undefined }
    });

    const [updateUser, { error, isLoading }] = useUpdateUserMutation();
    if (error) handleErrors(error, userUpdateError.type);

    const onSubmit = async (data: UserI) => {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("name", data.name);
        const imageData = getValues().imageData;
        if (imageData) formData.append("imageData", imageData);
        await updateUser(formData);
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>{user.name}'s Profile</ModalHeader>
                    <ModalBody>
                        <Flex className='flex-col gap-3'>
                            <Box>
                                <ImageSelector setValue={setValue} defaultImage={user.image} />
                            </Box>
                            <Box>
                                <label htmlFor='email'>Email:</label>
                                <Input id='email' isDisabled _disabled={{ textColor: "gray.400" }} {...register("email")} />
                            </Box>
                            <Box>
                                <label htmlFor='name'>Name:</label>
                                <Input id='name' {...register("name")} min={3} />
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type='submit' colorScheme='blue' isDisabled={(!isDirty || !isValid)}>
                                Save {isLoading && <ButtonSpinner />}
                            </Button>
                            <Button onClick={onClose}>Close</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default Profile