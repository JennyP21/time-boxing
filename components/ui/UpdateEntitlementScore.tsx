"use client"
import { handleErrors } from '@/components/utils/handleErrors';
import { updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import AttributeContainer from './TaskDetails/AttributeContainer';

interface Props {
    task_id: string;
    currScore: number | null | undefined;
    selectSize: "sm" | "md";
    withLabel: boolean;
}

const UpdateEntitlementScore = ({ task_id, currScore, selectSize, withLabel }: Props) => {
    const defaultVal = currScore !== null && currScore !== undefined ? String(currScore) : "1";
    const [score, setScore] = useState<string>(defaultVal);

    useEffect(() => {
        setScore(currScore !== null && currScore !== undefined ? String(currScore) : "1");
    }, [currScore]);

    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async (value: string) => {
        const parsedVal = parseInt(value, 10);
        if (!isNaN(parsedVal)) {
            const data = { id: task_id, entitlementScore: parsedVal } as TaskI;
            await updateTask(data);
        }
    }

    const selectComponent = (
        <Select
            value={score}
            onChange={(e) => {
                const val = e.target.value;
                setScore(val);
                handleSubmit(val);
            }}
            size={selectSize}
            minW="130px"
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
            <option value="1">1 - Easy</option>
            <option value="2">2 - Low-medium</option>
            <option value="3">3 - Medium</option>
            <option value="4">4 - High-medium</option>
            <option value="5">5 - Very Complex</option>
        </Select>
    );

    return (
        <>
            {withLabel ?
                <AttributeContainer name="Complexity">
                    {selectComponent}
                </AttributeContainer>
                :
                selectComponent
            }
        </>
    )
}

export default UpdateEntitlementScore;
