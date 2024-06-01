import KanbanCanvas from '@/components/ui/Kanban/KanbanCanvas';
import ListTable from '@/components/ui/List/ListTable';
import { getView } from '@/components/utils/handleUserState';
import { PROJECT_VIEW_TYPE } from '@/constants';
import { ProjectI } from '@/interfaces';

const ProjectContent = ({ project }: { project: ProjectI }) => {
    const currentView = getView(project.id) || PROJECT_VIEW_TYPE;

    return (
        <>
            {currentView === PROJECT_VIEW_TYPE ?
                <ListTable project={project} />
                :
                <KanbanCanvas project={project} />
            }
        </>
    )
}

export default ProjectContent