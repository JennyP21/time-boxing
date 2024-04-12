import { List, ListItem } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';

const PersonalList = () => {
    return (
        <LeftPanelAccordion title='Personal'>
            <List spacing={1}>
                <ListItem>Project 1</ListItem>
                <ListItem>Project 2</ListItem>
                <ListItem>Project 3</ListItem>
            </List>
        </LeftPanelAccordion>
    )
}

export default PersonalList