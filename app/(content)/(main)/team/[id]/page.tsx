import TeamDetails from "./TeamDetails";

const Team = ({ params }: { params: { id: string } }) => {
    return (
        <TeamDetails team_id={params.id} />
    )
}

export default Team