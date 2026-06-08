"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    VStack,
    HStack,
    Box,
    Text,
    IconButton,
    useDisclosure,
    Spinner,
    Tag,
    TagLabel,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import { FiMessageSquare, FiSend, FiCpu } from 'react-icons/fi';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
}

const AIChatDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init-msg',
            sender: 'ai',
            text: "Hello! I am your AI Board Assistant, connected to your custom MCP database server. Ask me to create projects, add tasks, or modify steps in natural language!"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async (textToSend?: string) => {
        const text = (textToSend || inputValue).trim();
        if (!text) return;

        // Add user message
        const userMsgId = Date.now().toString();
        const newMessages: Message[] = [...messages, { id: userMsgId, sender: 'user', text }];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await res.json();
            
            // Add AI response
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    sender: 'ai',
                    text: data.reply || "No reply returned."
                }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    sender: 'ai',
                    text: `Error connecting to AI backend: ${error}`
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const suggestions = [
        "Create project AD Migration",
        "Add task Audit active directory under To Do",
        "List my projects",
        "Add step 'Setup GPOs' to task 'Audit active directory'"
    ];

    return (
        <>
            {/* Floating Action Button (FAB) */}
            <Button
                position="fixed"
                bottom="24px"
                right="24px"
                zIndex="1000"
                w="60px"
                h="60px"
                borderRadius="full"
                bgGradient="linear(to-r, blue.400, purple.500)"
                color="white"
                shadow="0 4px 20px rgba(99, 102, 241, 0.4)"
                _hover={{
                    transform: 'scale(1.08) translateY(-2px)',
                    shadow: '0 8px 30px rgba(99, 102, 241, 0.6)',
                    bgGradient: 'linear(to-r, blue.500, purple.600)'
                }}
                _active={{
                    transform: 'scale(0.95)'
                }}
                transition="all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                onClick={onOpen}
                leftIcon={<FiMessageSquare size={22} style={{ marginRight: '-8px' }} />}
            />

            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
                <DrawerOverlay backdropFilter="blur(3px)" />
                <DrawerContent borderLeftRadius="2xl" overflow="hidden">
                    <DrawerCloseButton color="gray.600" />
                    
                    {/* Header */}
                    <DrawerHeader 
                        bgGradient="linear(to-r, blue.500, purple.600)" 
                        color="white"
                        py={5}
                        px={6}
                    >
                        <HStack spacing={3}>
                            <FiCpu size={24} />
                            <Box>
                                <Text fontSize="lg" fontWeight="bold">AI Board Assistant</Text>
                                <Text fontSize="xs" opacity={0.8} fontWeight="medium">Connected to time-boxing-mcp</Text>
                            </Box>
                        </HStack>
                    </DrawerHeader>

                    {/* Chat Body */}
                    <DrawerBody bg="gray.50" display="flex" flexDirection="column" p={4}>
                        {/* Messages Area */}
                        <VStack 
                            flex="1" 
                            overflowY="auto" 
                            spacing={4} 
                            align="stretch"
                            py={2}
                            px={1}
                        >
                            {messages.map((msg) => {
                                const isUser = msg.sender === 'user';
                                return (
                                    <Box
                                        key={msg.id}
                                        alignSelf={isUser ? 'flex-end' : 'flex-start'}
                                        maxW="85%"
                                        bg={isUser ? 'blue.500' : 'white'}
                                        color={isUser ? 'white' : 'gray.800'}
                                        borderRadius="xl"
                                        borderBottomRightRadius={isUser ? 'none' : 'xl'}
                                        borderTopLeftRadius={isUser ? 'xl' : 'none'}
                                        boxShadow="sm"
                                        borderWidth={isUser ? '0' : '1px'}
                                        borderColor="gray.200"
                                        px={4}
                                        py={3}
                                    >
                                        <Text fontSize="sm" whiteSpace="pre-wrap">{msg.text}</Text>
                                    </Box>
                                );
                            })}
                            {isLoading && (
                                <Box alignSelf="flex-start" bg="white" borderRadius="xl" borderTopLeftRadius="none" borderColor="gray.200" borderWidth="1px" px={4} py={3}>
                                    <HStack spacing={2}>
                                        <Spinner size="xs" color="blue.500" />
                                        <Text fontSize="xs" color="gray.500">MCP Server is executing command...</Text>
                                    </HStack>
                                </Box>
                            )}
                            <div ref={chatEndRef} />
                        </VStack>

                        {/* Suggestion Pills */}
                        <Box py={3} borderTop="1px" borderColor="gray.100">
                            <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={2}>SUGGESTIONS</Text>
                            <Wrap spacing={2}>
                                {suggestions.map((sug, idx) => (
                                    <WrapItem key={idx}>
                                        <Tag
                                            size="sm"
                                            borderRadius="full"
                                            variant="solid"
                                            bg="white"
                                            color="gray.600"
                                            borderWidth="1px"
                                            borderColor="gray.300"
                                            _hover={{ bg: 'blue.50', color: 'blue.600', borderColor: 'blue.300', cursor: 'pointer' }}
                                            onClick={() => handleSend(sug)}
                                            transition="all 0.15s"
                                        >
                                            <TagLabel fontWeight="medium" fontSize="xs">{sug}</TagLabel>
                                        </Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </Box>

                        {/* Input Footer */}
                        <HStack spacing={2} pt={3} borderTop="1px" borderColor="gray.200" bg="gray.50">
                            <Input
                                placeholder="Ask AI to manage your board..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                                bg="white"
                                shadow="inner"
                                focusBorderColor="blue.400"
                                borderRadius="lg"
                            />
                            <IconButton
                                aria-label="Send message"
                                icon={<FiSend />}
                                onClick={() => handleSend()}
                                isLoading={isLoading}
                                colorScheme="blue"
                                borderRadius="lg"
                            />
                        </HStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default AIChatDrawer;
