import { AddMemberI, TeamI } from '@/interfaces';
import { useAddMemberMutation } from '@/lib/features/teamApi';
import { validateAddTeamMember } from '@/validation';
import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import RoleSelector from './RoleSelector';

interface Props {
    team: TeamI;
    onClose: () => void;
    isOpen: boolean;
}

const AddMemberModal = ({ isOpen, onClose, team }: Props) => {
    const [addMember, { isLoading }] = useAddMemberMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<AddMemberI>({
        resolver: zodResolver(validateAddTeamMember)
    });

    const onSubmit = async (data: AddMemberI) => {
        const updateData = {
            ...data,
            team_id: team.id,
        }
        await addMember(updateData);
        onClose();
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent className='relative'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Add new members to {team.name} Team</ModalHeader>
                    <ModalBody>
                        <Flex className='flex-col gap-2 my-3 p-1 rounded-md'>
                            <Input type="email" isRequired placeholder='Enter the email of the person' {...register("user_email")} />
                            {errors &&
                                <Text>
                                    {errors.user_email?.message}
                                </Text>
                            }
                            <RoleSelector register={register} />
                        </Flex>
                    </ModalBody>
                    <ModalFooter gap={2}>
                        <Button colorScheme="blue" type='submit'>Add {isLoading && <Spinner />}</Button>
                        <Button type='reset' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddMemberModal