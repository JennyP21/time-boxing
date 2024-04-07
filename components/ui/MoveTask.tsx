"use client"
import { BucketI, TaskI } from "@/interfaces";
import { useUpdateTaskMutation } from "@/lib/features/taskApi";
import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    task_id: string;
    user_id: string;
    bucket_id: string;
    buckets: BucketI[];
}

const MoveTask = ({ isOpen, onClose, task_id, bucket_id, user_id, buckets }: Props) => {
    const currentBucket = buckets.filter(bucket => bucket.id === bucket_id)[0];
    const moveBuckets = buckets.filter(bucket => bucket.id !== bucket_id);

    const [selectedBucket, setSelectedBucket] = useState(moveBuckets[0].id);

    const [updateTask] = useUpdateTaskMutation();

    const handleTaskMove = async () => {
        const data = {
            id: task_id,
            user_id,
            bucket_id: selectedBucket,
        } as TaskI;
        await updateTask(data);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose the bucket to move to</ModalHeader>
                <ModalBody>
                    <Flex justifyContent="center" gap={3}>
                        <Flex alignItems="center" gap={1}>
                            <Text>From:</Text>
                            <Select disabled>
                                <option value={currentBucket?.id}>{currentBucket?.name}</option>
                            </Select>
                        </Flex>
                        <Flex alignItems="center" gap={1}>
                            <Text>To:</Text>
                            <Select onChange={(e) => setSelectedBucket(e.target.value)}>
                                {moveBuckets?.map(bucket => (
                                    <option key={bucket.id} value={bucket.id}>{bucket.name}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter gap={2}>
                    <Button colorScheme='blue' onClick={handleTaskMove}>Move</Button>
                    <Button variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MoveTask