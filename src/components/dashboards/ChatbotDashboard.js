import React, { useState, useRef, useEffect } from "react";
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper, 
  Typography, 
  Avatar, 
  styled, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions 
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { deepPurple } from "@mui/material/colors";
import ReactMarkdown from "react-markdown";

const ChatContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#1e1e1e',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#2d2d2d',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#2d2d2d',
  borderTop: '1px solid #404040',
}));

const MessageBubble = styled(Paper)(({ isUser, theme }) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  maxWidth: '85%',
  width: 'fit-content',
  backgroundColor: isUser ? '#2b5278' : '#373737',
  color: '#fff',
  borderRadius: 12,
  fontSize: '0.9rem',
  ...(isUser && {
    marginLeft: 'auto',
  }),
  '& pre': {
    margin: '8px 0',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: '#1e1e1e !important',
    overflow: 'auto',
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: '0.85rem',
    maxHeight: '300px',
  },
  '& code': {
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: '0.85rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 4px',
    borderRadius: '4px',
  },
  '& p': {
    margin: '0.3em 0',
    fontSize: '0.9rem',
  },
  '& ul, & ol': {
    marginLeft: theme.spacing(2),
    fontSize: '0.9rem',
  },
  '& a': {
    color: '#64b5f6',
    textDecoration: 'underline',
  },
  '& blockquote': {
    borderLeft: '4px solid #666',
    margin: '0.5em 0',
    padding: '0.3em 0.8em',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: '0.9rem',
  },
  '& h1': {
    fontSize: '1.2rem',
    margin: '0.4em 0',
    fontWeight: 600,
  },
  '& h2': {
    fontSize: '1.1rem',
    margin: '0.3em 0',
    fontWeight: 600,
  },
  '& h3, & h4, & h5, & h6': {
    fontSize: '1rem',
    margin: '0.2em 0',
    fontWeight: 600,
  },
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: '#888',
  marginTop: '2px',
  marginBottom: theme.spacing(1),
  ...(theme.direction === 'ltr' ? { marginLeft: '44px' } : { marginRight: '44px' }),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#373737',
    color: '#fff',
    fontSize: '0.9rem',
    '&.Mui-focused fieldset': {
      borderColor: '#5c6bc0',
    },
  },
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  padding: '8px',
  '& span': {
    width: '5px',
    height: '5px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    animation: 'typing 1s infinite ease-in-out',
    '&:nth-of-type(1)': {
      animationDelay: '0s',
    },
    '&:nth-of-type(2)': {
      animationDelay: '0.2s',
    },
    '&:nth-of-type(3)': {
      animationDelay: '0.4s',
    },
  },
  '@keyframes typing': {
    '0%, 100%': {
      transform: 'scale(1)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'scale(1.5)',
      opacity: 1,
    },
  },
}));

const formatTimestamp = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const ChatbotDashboard = () => {
  const initialMessage = {
    text: '# Hai, Kelvin! 👋\nSaya siap membantu Anda menganalisis data. Beberapa hal yang bisa saya bantu:\n\n- Analisis sentimen\n- Analisis kompetitor\n- Feedback pelanggan\n\nSilakan tanyakan apa saja! 😊',
    isUser: false,
    timestamp: new Date()
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const now = new Date();
      setMessages([...messages, { text: input, isUser: true, timestamp: now }]);
      setInput('');
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          text: 'Terima kasih atas pertanyaannya. Saya akan membantu menganalisis data sesuai dengan kebutuhan Anda. Mari kita mulai dengan mengidentifikasi poin-poin penting dari data yang ada.',
          isUser: false,
          timestamp: new Date(now.getTime() + 2000)
        }]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setOpenConfirmDialog(true);
  };

  const confirmReset = () => {
    setMessages([{ ...initialMessage, timestamp: new Date() }]);
    setInput('');
    setIsTyping(false);
    setOpenConfirmDialog(false);
  };

  return (
    <ChatContainer>
      <Box sx={{ 
        position: 'relative', 
        borderBottom: '1px solid #404040',
        backgroundColor: '#2d2d2d',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="subtitle1" sx={{ color: '#fff', fontSize: '0.9rem' }}>
          Chat Assistant
        </Typography>
        <Button
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          sx={{
            color: '#fff',
            fontSize: '0.8rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Reset Chat
        </Button>
      </Box>

      <MessagesContainer>
        {messages.map((message, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
              {!message.isUser && (
                <Avatar
                  sx={{
                    bgcolor: deepPurple[500],
                    mr: 1,
                    width: 28,
                    height: 28,
                    fontSize: '0.9rem',
                  }}
                >
                  AI
                </Avatar>
              )}
              <MessageBubble isUser={message.isUser}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </MessageBubble>
            </Box>
            <TimeStamp align={message.isUser ? 'right' : 'left'}>
              {formatTimestamp(message.timestamp)}
            </TimeStamp>
          </Box>
        ))}
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                mr: 1,
                width: 28,
                height: 28,
                fontSize: '0.9rem',
              }}
            >
              AI
            </Avatar>
            <MessageBubble>
              <TypingIndicator>
                <span />
                <span />
                <span />
              </TypingIndicator>
            </MessageBubble>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer>
        <StyledTextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik pesan Anda di sini..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" color="inherit">
                  <AttachFileIcon />
                </IconButton>
                <IconButton size="small" color="inherit" onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </Box>
            ),
          }}
        />
      </InputContainer>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#2d2d2d',
            color: '#fff',
          }
        }}
      >
        <DialogTitle sx={{ fontSize: '1rem' }}>
          Reset Chat
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '0.9rem' }}>
            Apakah Anda yakin ingin memulai chat baru? Semua riwayat chat akan dihapus.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenConfirmDialog(false)}
            sx={{ 
              color: '#fff',
              fontSize: '0.8rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Batal
          </Button>
          <Button 
            onClick={confirmReset}
            variant="contained" 
            color="error"
            sx={{ fontSize: '0.8rem' }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </ChatContainer>
  );
};

export default ChatbotDashboard;
