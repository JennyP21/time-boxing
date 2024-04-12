"use client"
import { ProjectI } from '@/interfaces';
import { useAddProjectMutation } from '@/lib/features/projectApi';
import { Input, ListItem, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { SyntheticEvent, useState } from 'react';

const AddProject = () => {
    const session = useSession();
    const [active, setActive] = useState(false);

    const [addProject] = useAddProjectMutation();

    const handleProjectAddition = async (e: SyntheticEvent) => {
        const name = (e.target as HTMLInputElement).value;
        if (name) {
            const data = {
                name,
                user_id: session.data?.user.id
            } as ProjectI;
            await addProject(data);
        }
        setActive(false);
    }

    return (
        <ListItem className='px-1 rounded-lg' _hover={{ bg: "gray.100" }}>
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
                    Add new project
                </Text>
            }
        </ListItem>
    )
}

export default AddProject