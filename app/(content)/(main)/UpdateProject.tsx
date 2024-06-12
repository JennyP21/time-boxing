import CustomError from '@/components/error/CustomError';
import ButtonSpinner from '@/components/loading/ButtonSpinner';
import { handleErrors } from '@/components/utils/handleErrors';
import { updateProjectError } from '@/constants';
import { ProjectI, TeamI } from '@/interfaces';
import { useUpdateProjectMutation } from '@/lib/features/projectApi';
import { validateProject } from '@/validation';
import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    teams: TeamI[];
    user_id: string;
    currentProject: ProjectI;
}

const UpdateProject = ({ isOpen, onClose, teams, currentProject }: Props) => {
    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<ProjectI>({
        resolver: zodResolver(validateProject),
        defaultValues: currentProject
    })

    const [updateProject, { isLoading, error }] = useUpdateProjectMutation();
    if (error) handleErrors(error, updateProjectError.type);

    const onSubmit = async (project: ProjectI) => {
        const data = {
            id: currentProject.id,
            name: project.name,
            team_id: currentProject.team_id,
            user_id: currentProject.user_id
        } as ProjectI;
        await updateProject(data);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent mx={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Update Project</ModalHeader>
                    <ModalBody>
                        <Flex className='flex-col gap-2 w-full items-center justify-start'>
                            <Input placeholder='Name your project' {...register("name")} />
                            {errors && <CustomError>{errors.name?.message}</CustomError>}
                            <Select isDisabled {...register("team_id")}>
                                <option value="">Personal</option>
                                <optgroup label="Team">
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </optgroup>
                            </Select>
                        </Flex>
                    </ModalBody>
                    <ModalFooter gap={2}>
                        <Button
                            type='submit'
                            colorScheme="blue"
                            isDisabled={(!isDirty || !isValid || isLoading)}
                        >
                            Update {isLoading && <ButtonSpinner />}
                        </Button>
                        <Button variant='ghost' onClick={() => { onClose(); reset() }}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default UpdateProject