import TaskCardLoading from '@/components/loading/TaskCardLoading';
import Stack from '@/components/ui/Kanban/Stack';
import { LabelI, ProjectI, TaskWithDetailsI } from '@/interfaces';
import AddTaskContainer from '../../AddTaskContainer';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    label: LabelI;
    project: ProjectI;
    tasks: TaskWithDetailsI[] | undefined;
    isLoading: boolean;
}

const Label = ({ label, project, tasks, isLoading }: Props) => {
    return (
        <Stack>
            <GroupHeader>{label.name}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' label_id={label.id} />
            {isLoading ? <TaskCardLoading /> :
                <TasksList columnId={label.id} data={tasks} project={project} />
            }
        </Stack>
    )
}

export default Label;