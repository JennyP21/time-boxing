import { ProjectI } from '@/interfaces';
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import DeleteBucket from './DeleteBucket';
import UpdateBucket from './UpdateBucket';

interface Props {
    bucket_id: string;
    currentName: string;
    project: ProjectI;
}

const BucketHeader = ({ bucket_id, currentName, project }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Flex className='w-full justify-between' p={1}>
            {<>
                {isEditing ?
                    <UpdateBucket currentName={currentName} project_id={project.id} bucket_id={bucket_id} setIsEditing={setIsEditing} />
                    :
                    <Text size="md" align='left' width="100%">{currentName}</Text>
                }
            </>}
            <Menu placement='bottom-end'>
                <MenuButton>
                    <Icon as={HiOutlineDotsHorizontal} w={4} h={4} />
                </MenuButton>
                <MenuList>
                    <DeleteBucket bucket_id={bucket_id} />
                    <MenuItem onClick={() => setIsEditing(true)}>Rename</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default BucketHeader