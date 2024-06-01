import { getLabelsError } from '@/constants';
import { ProjectI, TaskI } from '@/interfaces';
import { useGetLabelsByProjectIdQuery, useGetLabelsByTaskQuery } from '@/lib/features/labelApi';
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { handleErrors } from '../utils/handleErrors';
import AssignLabelSubMenu from './AssignLabelSubMenu';
import DeleteTask from './DeleteTask';
import UnassignLabelSubMenu from './UnassignLabelSubMenu';

interface Props {
    onOpen: () => void;
    align: "center" | "end";
    canMove: boolean;
    task: TaskI;
    project: ProjectI;
}

const MoreOptions = ({ onOpen, align, canMove, task, project }: Props) => {
    const { data: assignedLabels, error: getTaskLabelsError } = useGetLabelsByTaskQuery(task.id);
    if (getTaskLabelsError) handleErrors(getTaskLabelsError, getLabelsError.type);

    const { data: allLabels, error: getAllLabelsError } = useGetLabelsByProjectIdQuery(project.id);
    if (getAllLabelsError) handleErrors(getAllLabelsError, getLabelsError.type);

    const unassignedLabels = allLabels?.filter(label => !assignedLabels?.find(item => item.id === label.id));

    return (
        <Menu closeOnSelect={false}>
            <MenuButton as="a" className={align === "end" ? 'absolute right-2 top-1' : "w-full"}>
                <Icon as={BsThreeDotsVertical} w={4} h={4} />
            </MenuButton>
            <MenuList>
                <DeleteTask task_id={task.id} />
                {canMove && <MenuItem as='a' onClick={onOpen}>Move</MenuItem>}
                {unassignedLabels && unassignedLabels.length > 0 && <MenuItem className='w-full' as='a'>
                    <AssignLabelSubMenu labels={unassignedLabels} task_id={task.id} />
                </MenuItem>}
                {assignedLabels && assignedLabels.length > 0 && <MenuItem className='w-full' as='a'>
                    <UnassignLabelSubMenu labels={assignedLabels} task_id={task.id} />
                </MenuItem>}
            </MenuList>
        </Menu>
    )
}

export default MoreOptions