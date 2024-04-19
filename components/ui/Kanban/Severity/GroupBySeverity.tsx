import { taskSeverity } from '@/constants'
import { ProjectContainerI } from '@/interfaces'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import Severity from './Severity'

const GroupBySeverity: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    return (
        <GroupByContainer>
            {taskSeverity.map(severity => (
                <React.Fragment key={severity}>
                    <Severity severity={severity} project={project} />
                </React.Fragment>
            ))}
        </GroupByContainer>
    )
}

export default GroupBySeverity