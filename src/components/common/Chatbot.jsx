import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([{
    id: 1,
    text: 'Hello! I\'m your HealthLink360 assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(input.toLowerCase());
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple response logic (would be replaced with actual API in production)
  const getBotResponse = (message) => {
    if (message.includes('appointment') || message.includes('book')) {
      return 'To book an appointment, go to the "Book Appointment" section in the patient portal. You can select your preferred hospital, doctor, and time slot there.';
    } else if (message.includes('emergency')) {
      return 'For medical emergencies, please call 911 immediately. You can also use the Emergency QR code in your patient portal to quickly share your medical information with emergency responders.';
    } else if (message.includes('prescription') || message.includes('medicine')) {
      return 'You can view all your prescriptions in the E-Prescription section. Your doctor can update these after each consultation.';
    } else if (message.includes('records') || message.includes('history')) {
      return 'Your complete medical history is available in the Health Records section. It includes past consultations, test reports, and prescriptions.';
    } else if (message.includes('doctor') || message.includes('specialist')) {
      return 'You can find doctors by specialty when booking an appointment. Each doctor\'s profile includes their qualifications and available time slots.';
    } else if (message.includes('payment') || message.includes('bill')) {
      return 'Payment options are available in your patient portal. We accept most insurance plans and offer various payment methods including credit cards and online transfers.';
    } else if (message.includes('hello') || message.includes('hi')) {
      return 'Hello! How can I assist you with HealthLink360 today?';
    } else if (message.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    } else {
      return 'I\'m not sure I understand. Could you rephrase your question? You can ask about appointments, prescriptions, medical records, or finding doctors.';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="w-80 h-96 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="font-medium">HealthLink Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Close chatbot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user' 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-white shadow-sm rounded-tl-none'}`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div 
              className="flex justify-start mb-3"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <button 
            type="submit" 
            className="bg-primary-600 text-white px-3 flex items-center justify-center hover:bg-primary-700 transition-colors"
            disabled={!input.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Ask about appointments, prescriptions, or emergencies
        </div>
      </form>
    </motion.div>
  );
};

export default Chatbot;