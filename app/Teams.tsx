import { convertToTeamList } from '@/components/utils';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import React from 'react';
import LeftPanelAccordion from './LeftPanelAccordion';
import TeamList from './TeamList';

interface Props {
    user_id: string;
}

const Teams = ({ user_id }: Props) => {
    const { data } = useGetTeamsByUserIdQuery(user_id);

    const teams = convertToTeamList(data);

    return (
        <LeftPanelAccordion title='Teams'>
            {teams?.map(team => (
                <React.Fragment key={team.id}>
                    <TeamList team={team} />
                </React.Fragment>
            ))}
        </LeftPanelAccordion>
    )
}

export default Teams