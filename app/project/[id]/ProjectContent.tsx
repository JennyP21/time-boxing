import { ProjectI, TabI } from '@/interfaces'
import React from 'react'

interface Props {
    project: ProjectI;
    tabs: TabI[];
}

const ProjectContent = ({ project, tabs }: Props) => {
    return (
        <div>{project.name}</div>
    )
}

export default ProjectContent