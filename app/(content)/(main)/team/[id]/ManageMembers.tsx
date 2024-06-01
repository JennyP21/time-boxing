import TeamMembersLoading from '@/components/loading/TeamMembersLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamMembersError } from '@/constants';
import { TeamI } from '@/interfaces';
import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import { Flex } from '@chakra-ui/react';
import AccordionTeamUserList from './AccordionTeamUserList';
import AddMemberContainer from './AddMemberContainer';
import { convertToCustomMembersList } from '@/components/utils';

const ManageMembers = ({ team }: { team: TeamI }) => {
    const { data, isLoading, error } = useGetTeamMembersQuery(team.id);

    if (error) handleErrors(error, getTeamMembersError.type);

    const customList = convertToCustomMembersList(data);

    const owners = customList.filter(user => user.role === "owner");
    const members = customList.filter(user => user.role === "member");

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