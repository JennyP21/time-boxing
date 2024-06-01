import Skeleton from "@/components/loading/Skeleton";
import { handleErrors } from "@/components/utils/handleErrors";
import { getLabelsError } from "@/constants";
import { useGetLabelsByProjectIdQuery, useGetLabelsByTaskQuery } from '@/lib/features/labelApi';
import { Flex, Icon, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { MdOutlineNewLabel } from "react-icons/md";
import AssignLabel from "./AssignLabel";
import UnassignLabel from "./UnassignLabel";

interface Props {
    task_id: string;
    project_id: string;
}

const LabelDetails = ({ task_id, project_id }: Props) => {
    const { data: assignedLabels, error: getTaskLabelsError } = useGetLabelsByTaskQuery(task_id);
    if (getTaskLabelsError) handleErrors(getTaskLabelsError, getLabelsError.type);

    const { data: allLabels, error: getAllLabelsError, isLoading } = useGetLabelsByProjectIdQuery(project_id);
    if (getAllLabelsError) handleErrors(getAllLabelsError, getLabelsError.type);

    const unassignedLabels = allLabels?.filter(label => !assignedLabels?.find(item => item.id === label.id));

    return (
        <Flex className='my-2'>
            {unassignedLabels && unassignedLabels.length > 0 &&
                <Menu>
                    <MenuButton>
                        <Icon as={MdOutlineNewLabel} w={6} h={6} mr={2} />
                    </MenuButton>
                    <MenuList>
                        <AssignLabel task_id={task_id} unassignedLabels={unassignedLabels} />
                        {isLoading && <Skeleton count={3} width="100%" height="25px" />}
                    </MenuList>
                </Menu>}
            <UnassignLabel task_id={task_id} assignedLabels={assignedLabels} />
        </Flex>
    )
}

export default LabelDetails