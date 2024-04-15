"use client"
import { ProjectI } from '@/interfaces';
import { useAddProjectMutation } from '@/lib/features/projectApi';
import { Input, ListItem, Text } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';

interface Props {
    user_id?: string;
    team_id?: string;
}

const AddProject = ({ user_id, team_id }: Props) => {
    const [active, setActive] = useState(false);

    const [addProject] = useAddProjectMutation();

    const handleProjectAddition = async (e: SyntheticEvent) => {
        const name = (e.target as HTMLInputElement).value;
        if (name) {
            const data = user_id ? {
                name,
                user_id
            } as ProjectI : {
                name,
                team_id
            } as ProjectI;
            await addProject(data);
        }
        setActive(false);
    }

    return (
        <ListItem className='px-1 rounded-lg border-2 border-gray-300' _hover={{ bg: "gray.100" }}>
            {active ?
                <Input
                    autoFocus
                    size="small"
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    onBlur={(e) => handleProjectAddition(e)}
                    onKeyDown={(e) => e.key === "Enter" && handleProjectAddition(e)}
                    placeholder='Add new project'
                />
                :
                <Text className='cursor-pointer' onClick={() => setActive(true)}>
                    {user_id ? "Add personal project" : "Add team project"}
                </Text>
            }
        </ListItem>
    )
}

export default AddProject