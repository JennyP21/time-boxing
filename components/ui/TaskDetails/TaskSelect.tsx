import { Select } from '@chakra-ui/react';

interface Props {
    options: string[],
    defaultValue: string,
    setData: (data: string) => void;
    type: "severity" | "progress";
    handleSubmit: (type: "severity" | "progress") => void;
    selectSize: "sm" | "md";
}

const TaskSelect = ({ options, defaultValue, setData, type, handleSubmit, selectSize }: Props) => {
    return (
        <Select defaultValue={defaultValue} onChange={(e) => setData(e.target.value)} onBlur={() => handleSubmit(type)} size={selectSize}>
            {options.map(option => (
                <option value={option} key={option}>{option}</option>
            ))}
        </Select>
    )
}

export default TaskSelect