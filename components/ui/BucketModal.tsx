import { handleErrors } from '@/components/utils/handleErrors';
import { addBucketError } from '@/constants';
import { BucketI, ProjectI } from '@/interfaces';
import { useAddBucketMutation } from '@/lib/features/bucketApi';
import { Box, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lastBucketOrder: number;
    project: ProjectI;
    buckets: BucketI[]
}

const BucketModal = ({ isOpen, onClose, lastBucketOrder, project, buckets }: Props) => {
    const [addBucket, { error, isLoading }] = useAddBucketMutation();

    if (error) handleErrors(error, addBucketError.type);

    const handleSubmit = async (e: SyntheticEvent) => {
        const target = (e.target as HTMLInputElement);
        if (target.value) {
            const data = {
                name: target.value,
                order: lastBucketOrder + 1,
                project_id: project.id
            } as BucketI;
            await addBucket(data);
        };
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Add Buckets</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Input
                            autoFocus
                            placeholder='Name your bucket and press enter'
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
                        {buckets.map((bucket) => (
                            <Box as={"span"} className='rounded-md text-sm p-1' bg={"gray.300"} key={bucket.id}>{bucket.name}</Box>
                        ))}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default BucketModal