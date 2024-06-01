import { unassignLabelError } from '@/constants';
import { LabelI, Task_LabelI } from '@/interfaces';
import { useUnassignLabelMutation } from '@/lib/features/labelApi';
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { MdOutlineLabelOff } from 'react-icons/md';
import { handleErrors } from '../utils/handleErrors';

interface Props {
    labels: LabelI[];
    task_id: string;
}

const UnassignLabelSubMenu = ({ labels, task_id }: Props) => {
    const [unassignLabel, { error }] = useUnassignLabelMutation();
    if (error) handleErrors(error, unassignLabelError.type);

    const handleLabelUnAssignment = async (label_id: string) => {
        const data = {
            task_id,
            label_id,
        } as Task_LabelI;
        await unassignLabel(data)
    }

    return (
        <Menu placement='bottom-start'>
            <MenuButton className="w-full" as='span'>
                <Flex className='w-full justify-between items-center'>
                    <Text>Unassign Label</Text>
                    <Icon as={MdOutlineLabelOff} w={4} h={4} />
                </Flex>
            </MenuButton>
            <MenuList>
                {labels?.map(label => (
                    <MenuItem key={label.id} onClick={() => handleLabelUnAssignment(label.id)}>{label.name}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default UnassignLabelSubMenu