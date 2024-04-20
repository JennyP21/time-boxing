"use client"
import { CustomMembersI, TeamMemberI } from '@/interfaces';
import { useRemoveMemberMutation } from '@/lib/features/teamApi';
import { Button, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: CustomMembersI;
}

const ConfirmRemove = ({ isOpen, onClose, user }: Props) => {
    const [removeMember] = useRemoveMemberMutation();
    const handleRemoveMember = async () => {
        const data = {
            team_id: user.team_id,
            user_id: user.user_id,
        } as TeamMemberI;
        await removeMember(data);
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalBody p={5}>
                    <Heading size="md">
                        Are you sure you want to remove {user.name}?
                    </Heading>
                </ModalBody>
                <ModalFooter gap={2}>
                    <Button colorScheme='blue' onClick={handleRemoveMember}>Remove</Button>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmRemove