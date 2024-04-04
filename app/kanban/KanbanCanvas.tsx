"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import GroupByBucket from '../../components/ui/GroupByBucket'

const KanbanCanvas = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    let groupBy = searchParams.get("groupBy");
    if (!groupBy) {
        const params = new URLSearchParams(searchParams);
        params.set("groupBy", "Bucket");
        router.push("?" + params);
    }

    return (
        <GroupByBucket />
    )
}

export default KanbanCanvas