import { Button } from '@chakra-ui/react';
import React from 'react'

interface Props {
    team_id: string;
}

const AddMember = ({ team_id }: Props) => {
    return (
        <Button className='self-start w-fit' colorScheme='blue'>+ Add Member</Button>
    )
}

export default AddMember