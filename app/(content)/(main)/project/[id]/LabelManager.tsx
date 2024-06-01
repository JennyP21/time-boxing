import { handleErrors } from '@/components/utils/handleErrors';
import { getLabelsError } from '@/constants';
import { useGetLabelsByProjectIdQuery } from '@/lib/features/labelApi';
import { Button, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';
import AddLabel from './AddLabel';
import DeleteLabel from './DeleteLabel';

const LabelManager = ({ project_id }: { project_id: string }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { data: labels, error } = useGetLabelsByProjectIdQuery(project_id);

    if (error) handleErrors(error, getLabelsError.type);

    return (
        <>
            <Menu closeOnSelect={false}>
                <MenuButton as={Button} fontWeight="normal" fontSize="medium" rounded="10px" rightIcon={<FaAngleDown />}>
                    Labels
                </MenuButton>
                <MenuList>
                    {labels && labels.map(label => (
                        <MenuItem className='justify-between' _hover={{ bg: "gray.50" }} key={label.id}>
                            <Text>{label.name}</Text>
                            <DeleteLabel label_id={label.id} />
                        </MenuItem>
                    ))}
                    <MenuItem as={Button} onClick={onOpen} justifyContent="start" >Add label</MenuItem>
                </MenuList>
            </Menu>
            {labels && <AddLabel isOpen={isOpen} onClose={onClose} project_id={project_id} labels={labels} />}
        </>
    )
}

export default LabelManager