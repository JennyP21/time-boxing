import { taskProgress } from '@/constants'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import Progress from './Progress'
import { PropsWithProject } from '@/interfaces'

const GroupByProgress: React.FC<PropsWithProject> = ({ project }: PropsWithProject) => {
    return (
        <GroupByContainer>
            {taskProgress.map(progress => (
                <React.Fragment key={progress}>
                    <Progress progress={progress} />
                </React.Fragment>
            ))}
        </GroupByContainer>
    )
}

export default GroupByProgress