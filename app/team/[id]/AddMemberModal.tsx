import { TeamI } from '@/interfaces';
import { CloseButton, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spinner } from '@chakra-ui/react';

interface Props {
    team: TeamI;
    onClose: () => void;
    isOpen: boolean;
}

const AddMemberModal = ({ isOpen, onClose, team }: Props) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent className='relative'>
                <CloseButton className='absolute right-1 top-1' onClick={onClose} alignSelf="end" />
                <ModalHeader>Add new members to {team.name} Team</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Input placeholder='Enter the email of the person' />
                        <InputRightElement>
                            <Spinner color="gray.300" />
                        </InputRightElement>
                    </InputGroup>
                    <Flex className='flex-col gap-1 my-3 p-1 min-h-48 rounded-md border-2 border-gray.200'>

                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddMemberModal