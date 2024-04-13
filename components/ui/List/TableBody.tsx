import CompleteTask from '@/components/ui/CompleteTask';
import { taskProgress, taskSeverity } from '@/constants';
import { ProjectI, TaskI } from '@/interfaces';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import _ from "lodash";
import { useSearchParams } from 'next/navigation';
import AddListTask from './AddListTask';
import AttributeSelector from './AttributeSelector';
import DueDate from './DueDate';
import MoreOptions from './MoreOptions';
import TaskTitle from './TaskTitle';
import UpdateBucket from './UpdateBucket';

interface Props {
    data: TaskI[] | undefined;
    project: ProjectI;
}

const TableBody = ({ data, project }: Props) => {

    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sortBy") as "title" | "progress" | "end_date" | "severity" | null;
    const dir = searchParams.get("dir") as "asc" | "desc" | null;

    const sortedData = sortBy && dir ? _.orderBy(data, function (item) {
        return item[sortBy];
    }, dir) : data;

    return (
        <Tbody>
            {sortedData?.map(item => (
                <Tr key={item.id}>
                    <Td px={3}>
                        <CompleteTask task={item} />
                    </Td>
                    <Td p={1} overflow="clip">
                        <TaskTitle task={item} />
                    </Td>
                    <Td py={0} px={1}>
                        {/* <AssignUserToTask image={item.user.image} name={item.user.name} /> */}
                    </Td>
                    <Td p={1}>
                        <UpdateBucket currData={item} project={project} />
                    </Td>
                    <Td p={1}>
                        <AttributeSelector
                            dataToUpdate='progress'
                            task_id={item.id}
                            defaultValue={item.progress}
                            data={taskProgress}
                        />
                    </Td>
                    <Td p={1}>
                        <AttributeSelector
                            dataToUpdate='severity'
                            task_id={item.id}
                            defaultValue={item.severity}
                            data={taskSeverity}
                        />
                    </Td>
                    <Td p={1}>
                        <DueDate
                            task_id={item.id}
                            currDueDate={item.end_date}
                        />
                    </Td>
                    <Td p={1}>
                        <MoreOptions task={item} />
                    </Td>
                </Tr>
            ))}
            <AddListTask project={project} />
        </Tbody>
    )
}

export default TableBody