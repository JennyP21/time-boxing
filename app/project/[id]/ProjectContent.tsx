import KanbanCanvas from '@/app/KanbanCanvas';
import ListTable from '@/app/list/ListTable';
import { ProjectI, TabI } from '@/interfaces';

interface Props {
    project: ProjectI;
    tabs: TabI[];
}

const ProjectContent = ({ project, tabs }: Props) => {
    const activeTab = tabs.find(tab => tab.active)!;

    return (
        <>
            {activeTab.name === "List" ?
                <ListTable />
                :
                <KanbanCanvas />
            }
        </>
    )
}

export default ProjectContent