import ButtonSpinner from '@/components/loading/ButtonSpinner';
import { handleErrors } from '@/components/utils/handleErrors';
import { addTeamsError } from '@/constants';
import { TeamI } from '@/interfaces';
import { useAddTeamMutation } from '@/lib/features/teamApi';
import { validateTeam } from '@/validation';
import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user_id: string;
}

const AddTeam = ({ isOpen, onClose, user_id }: Props) => {
    const { register, reset, formState: { errors, isValid }, handleSubmit } = useForm<TeamI>({
        resolver: zodResolver(validateTeam)
    });

    const [addTeam, { isLoading, error }] = useAddTeamMutation();
    if (error) handleErrors(error, addTeamsError.type);

    const onSubmit = async (data: TeamI) => {
        await addTeam({ team: data, user_id });
        reset();
        onClose();
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Add new team</ModalHeader>
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
                            isDisabled={!isValid || isLoading}
                        >
                            Add {isLoading && <ButtonSpinner />}
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddTeam