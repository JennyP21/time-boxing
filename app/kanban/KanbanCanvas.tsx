"use client"
import GroupByLabel from '@/components/ui/GroupByLabel';
import GroupByProgress from '@/components/ui/GroupByProgress';
import GroupBySeverity from '@/components/ui/GroupBySeverity';
import { groupTypes } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import GroupByBucket from '../../components/ui/GroupByBucket';

const KanbanCanvas = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    let groupBy = searchParams.get("groupBy");
    if (!groupBy) {
        const params = new URLSearchParams(searchParams);
        params.set("groupBy", "Bucket");
        router.push("?" + params);
    }
    if (groupBy && !groupTypes.includes(groupBy)) {
        return null;
    }

    const groupByMapping: { [key: string]: () => JSX.Element } = {
        Bucket: GroupByBucket,
        Severity: GroupBySeverity,
        Progress: GroupByProgress,
        Label: GroupByLabel
    }

    const Content = groupBy ? groupByMapping[groupBy] : groupByMapping["Bucket"];

    return (
        <Content />
    )
}

export default KanbanCanvas