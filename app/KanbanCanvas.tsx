"use client"
import GroupByLabel from '@/components/ui/Label/GroupByLabel';
import GroupByProgress from '@/components/ui/Progress/GroupByProgress';
import GroupBySeverity from '@/components/ui/Severity/GroupBySeverity';
import { groupTypes } from '@/constants';
import { useSearchParams } from 'next/navigation';
import GroupByBucket from '../components/ui/Bucket/GroupByBucket';

const KanbanCanvas = () => {
    const groupBy = useSearchParams().get("groupBy");

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