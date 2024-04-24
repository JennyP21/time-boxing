import { TeamI } from '@/interfaces';
import { useAddTeamMutation, useUpdateTeamMutation } from '@/lib/features/teamApi';
import { validateTeam } from '@/validation';
import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user_id?: string;
    currentTeam?: TeamI;
}

const AddOrUpdateTeam = ({ isOpen, onClose, user_id, currentTeam }: Props) => {
    const { register, reset, formState: { errors, isValid }, handleSubmit } = useForm<TeamI>({
        resolver: zodResolver(validateTeam),
        defaultValues: currentTeam
    });

    const [addTeam, { isLoading: isAdding }] = useAddTeamMutation();
    const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
    const onSubmit = async (data: TeamI) => {
        if (currentTeam) {
            await updateTeam({ ...data, id: currentTeam.id });
        } else if (user_id) {
            await addTeam({ team: data, user_id });
            reset();
        }
        onClose();
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>{currentTeam ? "Update" : "Add new"} team</ModalHeader>
                    <ModalBody>
                        <Flex className='flex-col gap-2'>
                            <Input placeholder="Name you team" {...register("name")} />
                            <Text variant="error">{errors && errors.name?.message}</Text>
                            <Textarea placeholder='Description' {...register("desc")} />
                            <Text variant="error">{errors && errors.desc?.message}</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter gap={2}>
                        <Button
                            type='submit'
                            colorScheme="blue"
                            isDisabled={!isValid}
                        >
                            {currentTeam ? "Update" : "Add"} {(isUpdating || isAdding) && <Spinner ml={1} size="sm" />}
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddOrUpdateTeam