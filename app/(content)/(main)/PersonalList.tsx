import { handleErrors } from '@/components/utils/handleErrors';
import { getIsExpanded } from '@/components/utils/handleUserState';
import { getProjectError } from '@/constants';
import { useGetProjectsByUserIdQuery } from '@/lib/features/projectApi';
import { Link } from '@chakra-ui/next-js';
import { List, ListItem, Spinner } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';

const PersonalList = ({ user_id }: { user_id: string }) => {
    const { data: projects, error, isLoading } = useGetProjectsByUserIdQuery(user_id);

    if (error) handleErrors(error, getProjectError.type);

    const name = "personal";
    const currState = getIsExpanded(name) === 'true';

    return (
        <LeftPanelAccordion isRoot={true} title='Personal' isExpanded={currState} expandData={{ name, currState }}>
            {isLoading ? <Spinner /> :
                <List>
                    {projects?.map((project) => (
                        <ListItem key={project.id} className='px-1 rounded-lg cursor-pointer overflow-clip whitespace-nowrap' _hover={{ bg: "gray.100" }}>
                            <Link href={`/project/${project.id}`} _hover={{ textDecor: "none" }}>
                                {project.name}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            }
        </LeftPanelAccordion>
    )
}

export default PersonalList