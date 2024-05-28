import { handleErrors } from '@/components/utils/handleErrors';
import { updateBucketError } from '@/constants';
import { BucketI } from '@/interfaces';
import { useUpdateBucketMutation } from '@/lib/features/bucketApi';
import { Input, Spinner } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';

interface Props {
    project_id: string;
    currentName: string;
    bucket_id: string;
    setIsEditing: (value: boolean) => void;
}

const UpdateBucket = ({ currentName, project_id, setIsEditing, bucket_id }: Props) => {
    const [updateBucket, { error, isLoading }] = useUpdateBucketMutation();
    if (error) handleErrors(error, updateBucketError.type);

    const handleBucketUpdate = async (e: SyntheticEvent) => {
        const updatedName = (e.target as HTMLInputElement).value;
        if (currentName !== updatedName && updatedName.length > 0) {
            const data = {
                id: bucket_id,
                project_id,
                name: updatedName,
            } as BucketI;
            await updateBucket(data);
        }
        setIsEditing(false);
    }

    return (
        <>
            {isLoading ?
                <Spinner size="sm" />
                :
                <Input
                    autoFocus
                    size={"xs"}
                    onBlur={(e) => handleBucketUpdate(e)}
                    defaultValue={currentName}
                    onKeyDown={(e) => e.key === "Enter" && handleBucketUpdate(e)}
                />
            }
        </>
    )
}

export default UpdateBucket