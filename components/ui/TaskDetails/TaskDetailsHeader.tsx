import { TaskI } from '@/interfaces';
import { ModalHeader } from '@chakra-ui/react';
import AssignUserContainer from '../AssignUserContainer';
import LabelDetails from './LabelDetails';
import TaskDetailsHeaderDescription from './TaskDetailsHeaderDescription';
import TaskDetailsHeaderTitle from './TaskDetailsHeaderTitle';

interface Props {
    project_id: string;
    currentTitle: string;
    task: TaskI;
}

const TaskDetailsHeader = ({ task, currentTitle, project_id }: Props) => {
    return (
        <ModalHeader fontWeight="500" fontSize="small" pb={0}>
            <TaskDetailsHeaderTitle />
            <TaskDetailsHeaderDescription currentTitle={currentTitle} task={task} />
            <AssignUserContainer project_id={project_id} task_id={task.id} />
            <LabelDetails task_id={task.id} project_id={project_id} />
        </ModalHeader>
    )
}

export default TaskDetailsHeader