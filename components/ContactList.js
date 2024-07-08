import React from 'react';
import { Box, List, ListItem, Text, Avatar, HStack, VStack } from "@chakra-ui/react";

const ContactList = ({ contacts, selectContact }) => {
  return (
    <Box w="300px" p="4" borderRight="1px solid #ccc" bg="gray.50">
      <Text fontSize="2xl" mb="4" fontWeight="bold">Contacts</Text>
      <List spacing={3}>
        {contacts.map(contact => (
          <ListItem
            key={contact.id}
            p="2"
            borderRadius="md"
            _hover={{ bg: "teal.50", cursor: "pointer" }}
            onClick={() => selectContact(contact)}
          >
            <HStack>
              <Avatar name={contact.name} size="sm" />
              <VStack align="start" spacing="0">
                <Text fontSize="md" fontWeight="bold">{contact.name}</Text>
                <Text fontSize="sm" color="gray.500">Last message preview...</Text>
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContactList;