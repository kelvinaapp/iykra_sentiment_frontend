import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography, Avatar, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LanguageIcon from '@mui/icons-material/Language';
import ImageIcon from '@mui/icons-material/Image';
import { deepPurple } from '@mui/material/colors';

const ChatContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#1e1e1e',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#2d2d2d',
  borderTop: '1px solid #404040',
}));

const MessageBubble = styled(Paper)(({ isUser, theme }) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  maxWidth: '70%',
  width: 'fit-content',
  backgroundColor: isUser ? '#2b5278' : '#373737',
  color: '#fff',
  borderRadius: 12,
  ...(isUser && {
    marginLeft: 'auto',
  }),
}));

const ActionBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  '& > *': {
    color: '#808080',
  },
}));

const ChatbotDashboard = () => {
  const [messages, setMessages] = useState([
    { text: 'Hai, Kelvin! Apa kabar? 😊', isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: 'Terima kasih atas pesannya. Saya akan membantu menganalisis data untuk Anda.',
          isUser: false
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            {!message.isUser && (
              <Avatar
                sx={{
                  bgcolor: deepPurple[500],
                  mr: 1,
                  width: 32,
                  height: 32,
                }}
              >
                AI
              </Avatar>
            )}
            <MessageBubble isUser={message.isUser}>
              <Typography variant="body1">{message.text}</Typography>
            </MessageBubble>
          </Box>
        ))}
      </MessagesContainer>
      
      <InputContainer>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message ChatGPT"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                backgroundColor: '#1e1e1e',
                '& fieldset': {
                  borderColor: '#404040',
                },
                '&:hover fieldset': {
                  borderColor: '#606060',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#808080',
                },
              },
            }}
          />
          <IconButton 
            onClick={handleSend}
            sx={{ 
              color: '#fff',
              backgroundColor: '#1e1e1e',
              '&:hover': {
                backgroundColor: '#2d2d2d',
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
        <ActionBar>
          <AttachFileIcon />
          <LanguageIcon />
          <ImageIcon />
          <Typography variant="caption" sx={{ ml: 'auto', color: '#808080' }}>
            ChatGPT can make mistakes. Check important info.
          </Typography>
        </ActionBar>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatbotDashboard;
