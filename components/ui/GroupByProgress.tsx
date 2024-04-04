import { taskProgress } from '@/constants'
import GroupByContainer from './GroupByContainer'

const GroupByProgress = () => {
    return (
        <GroupByContainer>
            {taskProgress.map(progress => (
                <p key={progress}>{progress}</p>
            ))}
        </GroupByContainer>
    )
}

export default GroupByProgress