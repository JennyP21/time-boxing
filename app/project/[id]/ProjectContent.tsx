import { ProjectI } from '@/interfaces'
import React from 'react'

interface Props {
    project: ProjectI;
}

const ProjectContent = ({ project }: Props) => {
    return (
        <div>{project.name}</div>
    )
}

export default ProjectContent