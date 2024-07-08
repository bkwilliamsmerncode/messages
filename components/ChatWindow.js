import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Input, Button, HStack } from "@chakra-ui/react";
import { io } from 'socket.io-client';

const socket = io({
  path: "/api/socket_io",
});

const ChatWindow = ({ userId, messages, setMessages, currentMessage, setCurrentMessage }) => {
  useEffect(() => {
    socket.emit('join', { userId });

    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('receiveMessage');
    };
  }, [userId]);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const message = currentMessage;
      socket.emit('sendMessage', { userId, message });
      setCurrentMessage('');
    }
  };

  return (
    <Box flex="1" p="4" d="flex" flexDirection="column">
      <Box flex="1" overflowY="auto" bg="gray.50" p="4" borderRadius="md" mb="4">
        <VStack spacing={4} align="stretch">
          {messages.map((msg, index) => (
            <Box
              key={index}
              alignSelf={index % 2 === 0 ? "flex-start" : "flex-end"}
              bg={index % 2 === 0 ? "teal.100" : "blue.100"}
              borderRadius="md"
              p="2"
            >
              <Text>{msg}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <HStack>
        <Input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          flex="1"
        />
        <Button onClick={sendMessage} colorScheme="teal">Send</Button>
      </HStack>
    </Box>
  );
};

export default ChatWindow;