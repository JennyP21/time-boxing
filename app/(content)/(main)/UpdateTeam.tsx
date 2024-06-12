import ButtonSpinner from '@/components/loading/ButtonSpinner';
import { handleErrors } from '@/components/utils/handleErrors';
import { updateTeamsError } from '@/constants';
import { TeamI } from '@/interfaces';
import { useUpdateTeamMutation } from '@/lib/features/teamApi';
import { validateTeam } from '@/validation';
import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentTeam: TeamI;
}

const UpdateTeam = ({ isOpen, onClose, currentTeam }: Props) => {
    const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<TeamI>({
        resolver: zodResolver(validateTeam),
        defaultValues: currentTeam
    });

    const [updateTeam, { isLoading, error }] = useUpdateTeamMutation();
    if (error) handleErrors(error, updateTeamsError.type);

    const onSubmit = async (data: TeamI) => {
        await updateTeam({ ...data, id: currentTeam.id });
        onClose();
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mx={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Update team</ModalHeader>
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
                            isDisabled={!isDirty || !isValid || isLoading}
                        >
                            Update {isLoading && <ButtonSpinner />}
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default UpdateTeam