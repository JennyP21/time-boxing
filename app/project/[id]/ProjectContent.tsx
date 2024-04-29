import KanbanCanvas from '@/components/ui/Kanban/KanbanCanvas';
import ListTable from '@/components/ui/List/ListTable';
import { getView } from '@/components/utils/handleUserState';
import { ProjectI, TabI } from '@/interfaces';

interface Props {
    project: ProjectI;
    tabs: TabI[];
}

const ProjectContent = ({ tabs, project }: Props) => {
    const currentView = getView(project.id) || "List";

    return (
        <>
            {currentView === "List" ?
                <ListTable project={project} />
                :
                <KanbanCanvas project={project} />
            }
        </>
    )
}

export default ProjectContent