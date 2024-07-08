import { useState } from 'react';
import { Flex, Box } from "@chakra-ui/react";
import ContactList from '../components/ContactList';
import ChatWindow from '../components/ChatWindow';

const Home = () => {
  const [contacts] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const selectContact = (contact) => {
    setSelectedContact(contact);
    setMessages([]);
  };

  return (
    <Flex h="100vh">
      <ContactList contacts={contacts} selectContact={selectContact} />
      <Box flex="1" d="flex" flexDirection="column" p="4">
        {selectedContact ? (
          <ChatWindow
            userId={selectedContact.id}
            messages={messages}
            setMessages={setMessages}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
          />
        ) : (
          <Box p="4" textAlign="center" color="gray.500">
            Select a contact to start chatting
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Home;