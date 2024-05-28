import { handleErrors } from '@/components/utils/handleErrors';
import { deleteBucketError } from '@/constants';
import { useDeleteBucketMutation } from '@/lib/features/bucketApi';
import { MenuItem } from '@chakra-ui/react';

const DeleteBucket = ({ bucket_id }: { bucket_id: string }) => {
    const [deleteBucket, { error: deleteError }] = useDeleteBucketMutation();
    const handleBucketDelete = async () => await deleteBucket(bucket_id);
    if (deleteError) handleErrors(deleteError, deleteBucketError.type);

    return (
        <MenuItem onClick={handleBucketDelete}>Delete</MenuItem>
    )
}

export default DeleteBucket