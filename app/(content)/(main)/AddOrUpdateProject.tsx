import CustomError from '@/components/error/CustomError';
import ButtonSpinner from '@/components/loading/ButtonSpinner';
import { handleErrors } from '@/components/utils/handleErrors';
import { addProjectError, updateProjectError } from '@/constants';
import { ProjectI, TeamI } from '@/interfaces';
import { useAddProjectMutation, useUpdateProjectMutation } from '@/lib/features/projectApi';
import { validateProject } from '@/validation';
import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEqual } from 'lodash';
import { useForm } from 'react-hook-form';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    teams: TeamI[];
    user_id: string;
    currentProject?: ProjectI;
}

const AddOrUpdateProject = ({ isOpen, onClose, teams, user_id, currentProject }: Props) => {
    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<ProjectI>({
        resolver: zodResolver(validateProject),
        defaultValues: currentProject
    })
    const [addProject, { isLoading: isAdding, error: projectAddError }] = useAddProjectMutation();
    if (projectAddError) handleErrors(projectAddError, addProjectError.type);

    const [updateProject, { isLoading: isUpdating, error: projectUpdateError }] = useUpdateProjectMutation();
    if (projectUpdateError) handleErrors(projectUpdateError, updateProjectError.type);

    const onSubmit = async (project: ProjectI) => {
        if (!currentProject) {
            const data = project.team_id ? {
                name: project.name,
                team_id: project.team_id
            } as ProjectI : {
                name: project.name,
                user_id
            } as ProjectI;
            await addProject(data);
        } else {
            if (!isEqual(project, currentProject)) {
                const data = {
                    id: currentProject.id,
                    name: project.name,
                    team_id: currentProject.team_id,
                    user_id: currentProject.user_id
                } as ProjectI;

                await updateProject(data);
            }
        }
        onClose();
    }

    const isLoading = isUpdating || isAdding;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>{currentProject ? "Update Project" : "Add new project"}</ModalHeader>
                    <ModalBody>
                        <Flex className='flex-col gap-2 w-full items-center justify-start'>
                            <Input placeholder='Name your project' {...register("name")} />
                            {errors && <CustomError>{errors.name?.message}</CustomError>}
                            <Select isDisabled={currentProject !== undefined} {...register("team_id")}>
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
                            {currentProject ? "Update" : "Add"} {isLoading && <ButtonSpinner />}
                        </Button>
                        <Button variant='ghost' onClick={() => { onClose(); reset() }}>Close</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddOrUpdateProject