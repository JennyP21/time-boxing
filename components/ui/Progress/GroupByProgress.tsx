import { taskProgress } from '@/constants'
import React from 'react'
import GroupByContainer from '../GroupByContainer'
import Progress from './Progress'

const GroupByProgress = () => {
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