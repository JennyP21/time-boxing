import { taskSeverity } from '@/constants'
import GroupByContainer from '../GroupByContainer'
import Severity from './Severity'
import React from 'react'
import { PropsWithProject } from '@/interfaces'

const GroupBySeverity: React.FC<PropsWithProject> = ({ project }: PropsWithProject) => {
    return (
        <GroupByContainer>
            {taskSeverity.map(severity => (
                <React.Fragment key={severity}>
                    <Severity severity={severity} />
                </React.Fragment>
            ))}
        </GroupByContainer>
    )
}

export default GroupBySeverity