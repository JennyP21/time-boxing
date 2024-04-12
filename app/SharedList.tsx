import { List, ListItem } from '@chakra-ui/react'
import LeftPanelAccordion from './LeftPanelAccordion'

const SharedList = () => {
    return (
        <LeftPanelAccordion title='Shared'>
            <List spacing={1}>
                <ListItem>Project 1</ListItem>
                <ListItem>Project 2</ListItem>
                <ListItem>Project 3</ListItem>
            </List>
        </LeftPanelAccordion>
    )
}

export default SharedList