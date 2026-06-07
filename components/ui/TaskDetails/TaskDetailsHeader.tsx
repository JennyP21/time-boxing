import { TaskWithDetailsI } from '@/interfaces';
import { ModalHeader } from '@chakra-ui/react';
import UserAssignmentContainer from '../UserAssignmentContainer';
import LabelDetails from './LabelDetails';
import TaskDetailsHeaderDescription from './TaskDetailsHeaderDescription';
import TaskDetailsHeaderTitle from './TaskDetailsHeaderTitle';

interface Props {
    project_id: string;
    currentTitle: string;
    task: TaskWithDetailsI;
}

const TaskDetailsHeader = ({ task, currentTitle, project_id }: Props) => {
    return (
        <ModalHeader fontWeight="500" fontSize="small" pb={0}>
            <TaskDetailsHeaderTitle />
            <TaskDetailsHeaderDescription currentTitle={currentTitle} task={task} />
            <UserAssignmentContainer project_id={project_id} task_id={task.id} assignedUsers={task.task_assignees ? task.task_assignees.map(ta => ta.user) : []} />
            <LabelDetails task_id={task.id} project_id={project_id} />
        </ModalHeader>
    )
}

export default TaskDetailsHeader