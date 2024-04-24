import { ProjectI, TeamI } from '@/interfaces';
import { useAddProjectMutation } from '@/lib/features/projectApi';
import { validateProject } from '@/validation';
import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    teams: TeamI[];
    user_id: string;
}

const AddProject = ({ isOpen, onClose, teams, user_id }: Props) => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ProjectI>({
        resolver: zodResolver(validateProject)
    })
    const [addProject, { isLoading }] = useAddProjectMutation();

    const onSubmit = async (project: ProjectI) => {
        const data = project.team_id ? {
            name: project.name,
            team_id: project.team_id
        } as ProjectI : {
            name: project.name,
            user_id
        } as ProjectI;
        await addProject(data);
        reset();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Add new project</ModalHeader>
                    <ModalBody>
                        <Flex className='flex-col gap-2 w-full items-center justify-start'>
                            <Input placeholder='Name your project' {...register("name")} />
                            {errors && <Text fontSize="small" textColor='red.400' alignSelf="start">{errors.name?.message}</Text>}
                            <Select {...register("team_id")}>
                                <option value="">Personal</option>
                                <optgroup label="Team">
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </optgroup>
                            </Select>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type='submit'
                            colorScheme="blue"
                            disabled={!isValid}
                        >
                            {"Add "} {isLoading && <Spinner size="sm" />}
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddProject