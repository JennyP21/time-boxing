import { Select } from '@chakra-ui/react';

interface Props {
    options: string[],
    defaultValue: string,
}

const TaskSelect = ({ options }: Props) => {
    return (
        <Select>
            {options.map(option => (
                <option value={option} key={option}>{option}</option>
            ))}
        </Select>
    )
}

export default TaskSelect