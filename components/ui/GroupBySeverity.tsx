import { taskSeverity } from '@/constants'
import GroupByContainer from './GroupByContainer'

const GroupBySeverity = () => {
    return (
        <GroupByContainer>
            {taskSeverity.map(severity => (
                <p key={severity}>{severity}</p>
            ))}
        </GroupByContainer>
    )
}

export default GroupBySeverity