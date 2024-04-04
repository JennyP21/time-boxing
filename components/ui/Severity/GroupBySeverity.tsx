import { taskSeverity } from '@/constants'
import GroupByContainer from '../GroupByContainer'
import Severity from './Severity'

const GroupBySeverity = () => {
    return (
        <GroupByContainer>
            {taskSeverity.map(severity => (
                <Severity name={severity} />
            ))}
        </GroupByContainer>
    )
}

export default GroupBySeverity