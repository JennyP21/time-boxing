import TeamMembersLoading from '@/components/loading/TeamMembersLoading';
import { convertToCustomMembersList } from '@/components/utils';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamMembersError } from '@/constants';
import { TeamI } from '@/interfaces';
import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import { Flex } from '@chakra-ui/react';
import AccordionTeamUserList from './AccordionTeamUserList';
import AddMemberContainer from './AddMemberContainer';


const ManageMembers = ({ team }: { team: TeamI }) => {
    const { data, isLoading, error } = useGetTeamMembersQuery(team.id);

    if (error) handleErrors(error, getTeamMembersError.type);

    const users = convertToCustomMembersList(data);

    const owners = users.filter(user => user.role === "owner");
    const members = users.filter(user => user.role === "member");

    return (
        <>
            {isLoading ? <TeamMembersLoading />
                :
                <Flex className='flex-col gap-3'>
                    <AddMemberContainer team={team} />
                    <AccordionTeamUserList label='Owners' list={owners} />
                    <AccordionTeamUserList label='Members' list={members} />
                </Flex >
            }
        </>
    )
}

export default ManageMembers