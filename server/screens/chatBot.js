import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

export default function ChatBot() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    try {
      const response = await axios.post('http://10.0.2.2:3001/api/conversation', {
        message: userMessage,
      });

      const aiReply = response.data.reply;
      const newMessage = { role: 'User', message: userMessage };
      const newBotReply = { role: 'Assister', message: aiReply };
      setMessages([...messages, newMessage, newBotReply]);
      setUserMessage('');
    } catch (error) {
      console.error('Error communicating with the server:', error.message);
    }
  };

  useEffect(() => {
    // Welcome message when the component mounts
    const welcomeMessage = { role: 'Assister', message: 'What can i assist you' };
    setMessages([welcomeMessage]);

    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  }, []);

  const renderMessage = ({ item }) => {
    const isUserMessage = item.role === 'User';
    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage ? styles.userMessageContainer : styles.botMessageContainer,
        ]}
      >
        <Text style={styles.role}>{item.role}:</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chatbot</Text>
      <FlatList
        ref={flatListRef}
        style={styles.conversation}
        contentContainerStyle={styles.conversationContent}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, tw`p-2 rounded-l-xl text-base text-black`]}
          placeholder="Type your message..."
          value={userMessage}
          onChangeText={setUserMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={tw`p-3 rounded-r-xl bg-green-600`}>
          <Text style={tw`text-white font-bold text-base`}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conversation: {
    flex: 1,
    width: '100%',
  },
  conversationContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#d2f898',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E54B4B',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  role: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 17,
  },
  message: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});