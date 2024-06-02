import { ProjectI, TaskI } from '@/interfaces';
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Input, InputGroup, Text } from '@chakra-ui/react';
import BucketSelector from '../BucketSelector';

interface Props {
    active: boolean,
    setActive: (value: boolean) => void;
    data: TaskI;
    setData: (value: TaskI) => void;
    hasBucketSelector: boolean;
    handleSubmit: () => void;
    project: ProjectI;
}

const AddTask = ({ active, setActive, data, setData, hasBucketSelector, handleSubmit, project }: Props) => {
    return (
        <>
            <Button
                className='p-2 rounded-sm w-full text-center shadow-sm hover:shadow-md transition-all'
                background="gray.50"
                fontWeight="normal"
                onClick={() => setActive(true)}
            >
                Add Task
            </Button>
            {active && <Card background="gray.50">
                <CardHeader>
                    <Input autoFocus placeholder='Enter a task name.' py={0} h={7} defaultValue={data.title} onChange={(e) => {
                        setData({ ...data, title: e.target.value });
                    }} onBlur={(e) => (
                        e.target.value.trim() === "" && setActive(false)
                    )} />
                </CardHeader>
                <CardBody py={0}>
                    <Flex flexDir="column" justifyContent="left" gap={3}>
                        {hasBucketSelector && <BucketSelector project={project} selectedTask={data as TaskI} setSelectedTask={setData} />}
                        <InputGroup alignItems="center" gap={2}>
                            <Text>Due:</Text>
                            <Input type='Date' w="fit-content" size="md" onChange={(e) => setData({ ...data, end_date: e.target.value })} />
                        </InputGroup>
                    </Flex>
                </CardBody>
                <CardFooter>
                    <Button
                        className='p-2 rounded-sm w-full text-center shadow-sm hover:shadow-md transition-all'
                        background="blackAlpha.300"
                        fontWeight="normal"
                        isDisabled={data.bucket_id === "" || data.title === ""}
                        onClick={handleSubmit}
                    >
                        Add Task
                    </Button>
                </CardFooter>
            </Card>}
        </>
    )
}

export default AddTask