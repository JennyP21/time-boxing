import GroupByLabel from '@/components/ui/Kanban/Label/GroupByLabel';
import GroupByProgress from '@/components/ui/Kanban/Progress/GroupByProgress';
import { groupTypes } from '@/constants';
import { ProjectContainerI } from '@/interfaces';
import { Box } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import GroupByBucket from './Bucket/GroupByBucket';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';

const KanbanCanvas = ({ project }: ProjectContainerI) => {
    const [updateTask] = useUpdateTaskMutation();
    const searchParams = useSearchParams();
    const groupBy = searchParams.get("groupBy") || "Bucket";

    if (groupBy && !groupTypes.includes(groupBy)) {
        return null;
    }

    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const taskUpdate: any = { id: draggableId, project_id: project.id };
        if (groupBy === "Bucket") taskUpdate.bucket_id = destination.droppableId;
        if (groupBy === "Progress") taskUpdate.progress = destination.droppableId;
        if (groupBy === "Label") return; // Drag and drop between label columns is disabled

        await updateTask(taskUpdate);
    };

    const groupByMapping: { [key: string]: React.FC<ProjectContainerI> } = {
        Bucket: GroupByBucket,
        Progress: GroupByProgress,
        Label: GroupByLabel
    }

    const Content = groupBy ? groupByMapping[groupBy] : groupByMapping["Bucket"];

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
                <Content project={project} />
            </Box>
        </DragDropContext>
    )
}

export default KanbanCanvas