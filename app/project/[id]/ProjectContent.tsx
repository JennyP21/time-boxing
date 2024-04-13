import KanbanCanvas from '@/components/ui/Kanban/KanbanCanvas';
import ListTable from '@/components/ui/List/ListTable';
import { TabI } from '@/interfaces';

interface Props {
    tabs: TabI[];
}

const ProjectContent = ({ tabs }: Props) => {
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