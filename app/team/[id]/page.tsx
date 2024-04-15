"use client"
import { convertToTeamMembersList } from "@/components/utils";
import { useGetTeamMembersQuery } from "@/lib/features/teamApi"
import { List, ListItem } from "@chakra-ui/react";

const Team = ({ params }: { params: { id: string } }) => {
    const { data } = useGetTeamMembersQuery(params.id);

    const members = convertToTeamMembersList(data);

    return (
        <div>
            Members:
            <List>
                {members && members.map(member => (
                    <ListItem key={member.id}>{member.user_id} {member.role}</ListItem>
                ))}
            </List>
        </div>
    )
}

export default Team