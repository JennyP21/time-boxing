import { Button, ButtonSpinner, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';

interface Props {
    isOpen: boolean;
    item: string;
    onClose: () => void;
    handleRemove: () => void;
    isLoading: boolean;
}

const ConfirmDelete = ({ isOpen, onClose, item, handleRemove, isLoading }: Props) => {

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent mx={2}>
                <ModalBody p={5}>
                    <Heading size="md">
                        Confirm delete {item}?
                    </Heading>
                </ModalBody>
                <ModalFooter gap={2}>
                    <Button colorScheme='red' variant="outline" onClick={handleRemove} disabled={isLoading}>Remove {isLoading && <ButtonSpinner />}</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmDelete