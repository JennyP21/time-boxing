import { handleErrors } from '@/components/utils/handleErrors';
import { deleteLabelError, getLabelsError } from '@/constants';
import { useDeleteLabelMutation, useGetLabelsByProjectIdQuery } from '@/lib/features/labelApi';
import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import AddLabel from './AddLabel';

interface Props {
    project_id: string;
}

const LabelCreator = ({ project_id }: Props) => {
    const { data: labels, error } = useGetLabelsByProjectIdQuery(project_id);
    if (error) handleErrors(error, getLabelsError.type);

    const [deleteLabel, { error: labelDeleteError, isLoading: isDeleting }] = useDeleteLabelMutation();
    if (labelDeleteError) handleErrors(labelDeleteError, deleteLabelError.type);
    const handleLabelDelete = async (id: string) => {
        await deleteLabel(id);
    }

    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Menu closeOnSelect={false}>
                <MenuButton as={Button} fontWeight="normal" fontSize="medium" rounded="10px" rightIcon={<FaAngleDown />}>
                    List Label
                </MenuButton>
                <MenuList>
                    {labels && labels.map(label => (
                        <MenuItem className='justify-between' _hover={{ bg: "gray.50" }}>
                            <Text>{label.name}</Text>
                            <Icon
                                cursor={isDeleting ? "not-allowed" : "pointer"}
                                onClick={isDeleting ? undefined : () => handleLabelDelete(label.id)}
                                as={MdOutlineDelete}
                                className='rounded-full p-1'
                                w={6}
                                h={6}
                                _hover={{ bg: "gray.300" }}
                            />
                        </MenuItem>
                    ))}
                    <MenuItem as={Button} onClick={onOpen} justifyContent="start" >Add label</MenuItem>
                </MenuList>
            </Menu>
            {labels && <AddLabel isOpen={isOpen} onClose={onClose} project_id={project_id} labels={labels} />}
        </>
    )
}

export default LabelCreator