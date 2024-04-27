import Skeleton from "@/components/loading/Skeleton";

const TeamMembersLoading = () => {
    return (
        <>
            <Skeleton width={150} height={40} />
            <Skeleton height={30} />
            <Skeleton height={30} />
        </>
    )
}

export default TeamMembersLoading