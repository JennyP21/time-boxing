import { taskSeverity } from '@/constants'
import GroupByContainer from './GroupByContainer'

const GroupByLabel = () => {
    return (
        <GroupByContainer>
            {taskSeverity.map(severity => (
                <p key={severity}>{severity}</p>
            ))}
        </GroupByContainer>
    )
}

export default GroupByLabel