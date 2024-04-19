import { taskProgress } from '@/constants'
import { ProjectContainerI } from '@/interfaces'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import Progress from './Progress'

const GroupByProgress: React.FC<ProjectContainerI> = ({ project }: ProjectContainerI) => {
    return (
        <GroupByContainer>
            {taskProgress.map(progress => (
                <React.Fragment key={progress}>
                    <Progress progress={progress} project={project} />
                </React.Fragment>
            ))}
        </GroupByContainer>
    )
}

export default GroupByProgress