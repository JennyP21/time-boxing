import { convertToTeamList } from '@/components/utils';
import { handleErrors } from '@/components/utils/handleErrors';
import { getIsExpanded } from '@/components/utils/handleUserState';
import { getTeamsError } from '@/constants';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import React from 'react';
import LeftPanelAccordion from './LeftPanelAccordion';
import TeamList from './TeamList';

interface Props {
    user_id: string;
}

const Teams = ({ user_id }: Props) => {
    const { data, error } = useGetTeamsByUserIdQuery(user_id);

    if (error) handleErrors(error, getTeamsError.type);

    const teams = convertToTeamList(data);

    const name = "team";
    const currState = getIsExpanded(name) === 'true';

    return (
        <LeftPanelAccordion title='Teams' link='/team' isExpanded={currState} expandData={{ name, currState }}>
            {teams && teams.map(team => (
                <React.Fragment key={team.id}>
                    <TeamList teams={team} />
                </React.Fragment>
            ))}
        </LeftPanelAccordion>
    )
}

export default Teams