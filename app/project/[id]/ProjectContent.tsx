import KanbanCanvas from '@/components/ui/Kanban/KanbanCanvas';
import ListTable from '@/components/ui/List/ListTable';
import { ProjectI, TabI } from '@/interfaces';

interface Props {
    project: ProjectI;
    tabs: TabI[];
}

const ProjectContent = ({ tabs, project }: Props) => {
    const activeTab = tabs.find(tab => tab.active)!;

    return (
        <>
            {activeTab.name === "List" ?
                <ListTable project={project} />
                :
                <KanbanCanvas project={project} />
            }
        </>
    )
}

export default ProjectContent