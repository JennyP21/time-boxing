import { assignLabelError } from '@/constants';
import { LabelI, Task_LabelI } from '@/interfaces';
import { useAssignLabelMutation } from '@/lib/features/labelApi';
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { MdOutlineLabel } from 'react-icons/md';
import { handleErrors } from '../utils/handleErrors';

interface Props {
    labels: LabelI[];
    task_id: string;
}

const AssignLabelSubMenu = ({ labels, task_id }: Props) => {
    const [assignLabel, { error }] = useAssignLabelMutation();
    if (error) handleErrors(error, assignLabelError.type);

    const handleLabelAssignment = async (label_id: string) => {
        const data = {
            task_id,
            label_id,
        } as Task_LabelI;
        await assignLabel(data);
    }

    return (
        <Menu placement='bottom-start'>
            <MenuButton className="w-full" as='span'>
                <Flex className='w-full justify-between items-center'>
                    <Text>Assign Label</Text>
                    <Icon as={MdOutlineLabel} w={4} h={4} />
                </Flex>
            </MenuButton>
            <MenuList>
                {labels?.map(label => (
                    <MenuItem key={label.id} onClick={() => handleLabelAssignment(label.id)}>{label.name}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default AssignLabelSubMenu