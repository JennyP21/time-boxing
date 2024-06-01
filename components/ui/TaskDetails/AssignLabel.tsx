import { handleErrors } from "@/components/utils/handleErrors";
import { assignLabelError } from "@/constants";
import { LabelI, Task_LabelI } from "@/interfaces";
import { useAssignLabelMutation } from '@/lib/features/labelApi';
import { MenuItem, Text } from '@chakra-ui/react';

interface Props {
    task_id: string;
    unassignedLabels: LabelI[];
}

const AssignLabel = ({ task_id, unassignedLabels }: Props) => {

    const [assignLabel, { error }] = useAssignLabelMutation();
    if (error) handleErrors(error, assignLabelError.type);

    const handleLabelAssignment = async (label_id: string) => {
        const data = {
            task_id,
            label_id,
        } as Task_LabelI;
        await assignLabel(data);
    }

    return (
        <>
            {unassignedLabels.map(label => (
                <MenuItem key={label.id} onClick={() => handleLabelAssignment(label.id)} type="button">
                    <Text>{label.name}</Text>
                </MenuItem>
            ))}
        </>
    )
}

export default AssignLabel