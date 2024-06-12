import { handleErrors } from '@/components/utils/handleErrors';
import { addLabelError } from '@/constants';
import { LabelI } from '@/interfaces';
import { useAddLabelMutation } from '@/lib/features/labelApi';
import { Box, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    project_id: string;
    labels: LabelI[];
}

const AddLabel = ({ isOpen, onClose, project_id, labels }: Props) => {

    const [addLabel, { isLoading, error }] = useAddLabelMutation();

    if (error) handleErrors(error, addLabelError.type);

    const handleSubmit = async (e: SyntheticEvent) => {
        const value = (e.target as HTMLInputElement).value;
        if (value) {
            const data = {
                name: value,
                project_id,
            } as LabelI;
            await addLabel(data);
        }
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent mx={2}>
                <ModalCloseButton />
                <ModalHeader>Add Labels</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Input
                            autoFocus
                            placeholder='Name your label and press enter'
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e);
                                    (e.target as HTMLInputElement).value = "";
                                }
                            }}
                            onBlur={(e) => {
                                handleSubmit(e)
                                e.target.value = "";
                            }}
                            isDisabled={isLoading}
                        />
                        {isLoading &&
                            <InputRightElement>
                                <Spinner />
                            </InputRightElement>
                        }
                    </InputGroup>
                    <Flex className='gap-1 items-start justify-start w-full min-h-48 my-2 rounded-md p-1' border="1px" borderColor="gray.200">
                        {labels.map((label) => (
                            <Box as={"span"} className='rounded-md text-sm p-1' bg={"gray.300"} key={label.id}>{label.name}</Box>
                        ))}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddLabel