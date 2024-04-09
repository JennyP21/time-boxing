"use client"
import { TaskI } from '@/interfaces';
import { useGetBucketsQuery } from '@/lib/features/bucketApi';
import { Select } from '@chakra-ui/react';

interface Props {
    data: TaskI;
    setData: (data: TaskI) => void;
    handleTaskUpdate?: () => void;
}

const ListBucket = ({ data, setData, handleTaskUpdate }: Props) => {
    const { data: buckets } = useGetBucketsQuery();
    if (!buckets) return null;

    return (
        <Select
            size="sm"
            defaultValue={data.bucket_id || buckets[0].id}
            onBlur={handleTaskUpdate || undefined}
            onChange={(e) => setData({ ...data, bucket_id: e.target.value })}
        >
            {buckets.map(bucket => (
                <option className='p-0' value={bucket.id} key={bucket.id}>{bucket.name}</option>
            ))}
        </Select>
    )
}

export default ListBucket