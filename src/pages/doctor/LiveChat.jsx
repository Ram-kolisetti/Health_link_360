import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const LiveChat = () => {
  const { patientId } = useParams();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch patient data and chat history on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await Promise.all([
          fetchPatient(),
          fetchChatHistory()
        ]);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up a mock typing indicator for demo purposes
    const typingInterval = setInterval(() => {
      const shouldShowTyping = Math.random() > 0.7;
      if (shouldShowTyping && messages.length > 0 && !isTyping) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    }, 10000);

    return () => clearInterval(typingInterval);
  }, [patientId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mock data fetching functions
  const fetchPatient = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setPatient({
          id: patientId || 'P12345',
          name: 'John Doe',
          age: 45,
          gender: 'Male',
          lastVisit: '2023-09-20',
          condition: 'Hypertension',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        });
        resolve();
      }, 800);
    });
  };

  const fetchChatHistory = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            sender: 'doctor',
            text: 'Hello Mr. Doe, how are you feeling today?',
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
          },
          {
            id: 2,
            sender: 'patient',
            text: 'Hello Dr. Smith, I\'m feeling better than yesterday. The medication seems to be working.',
            timestamp: new Date(Date.now() - 3600000 * 1.9).toISOString()
          },
          {
            id: 3,
            sender: 'doctor',
            text: 'That\'s great to hear! Have you been experiencing any side effects from the medication?',
            timestamp: new Date(Date.now() - 3600000 * 1.8).toISOString()
          },
          {
            id: 4,
            sender: 'patient',
            text: 'Just a bit of drowsiness in the morning, but it goes away after an hour or so.',
            timestamp: new Date(Date.now() - 3600000 * 1.7).toISOString()
          },
          {
            id: 5,
            sender: 'doctor',
            text: 'That\'s a common side effect and should diminish over time. Have you been able to monitor your blood pressure as we discussed?',
            timestamp: new Date(Date.now() - 3600000 * 1.6).toISOString()
          },
        ]);
        resolve();
      }, 1000);
    });
  };

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'doctor',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate patient response after a delay
    setTimeout(() => {
      const patientResponse = {
        id: messages.length + 2,
        sender: 'patient',
        text: getPatientResponse(newMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, patientResponse]);
    }, 3000);
  };

  // Simple mock response generator
  const getPatientResponse = (doctorMessage) => {
    const lowerCaseMessage = doctorMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('how are you') || lowerCaseMessage.includes('feeling')) {
      return 'I\'m feeling a bit better today, thank you for asking.';
    } else if (lowerCaseMessage.includes('medication') || lowerCaseMessage.includes('medicine')) {
      return 'I\'ve been taking the medication as prescribed, twice daily with meals.';
    } else if (lowerCaseMessage.includes('symptom') || lowerCaseMessage.includes('pain')) {
      return 'The chest pain has subsided, but I still feel some discomfort when I exert myself too much.';
    } else if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('visit')) {
      return 'I can come in for a follow-up appointment next week if that works for you.';
    } else if (lowerCaseMessage.includes('test') || lowerCaseMessage.includes('result')) {
      return 'I haven\'t received any test results yet. Should I expect them soon?';
    } else {
      return 'I understand. Is there anything specific I should be doing or monitoring?';
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Chat Header */}
            <div className="bg-blue-500 text-white p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={patient?.avatar || 'https://via.placeholder.com/40'} 
                    alt={patient?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{patient?.name || 'Patient'}</h2>
                  <p className="text-sm text-blue-100">
                    {patient?.age} years • {patient?.gender} • {patient?.condition}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'doctor' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none'}`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 text-right ${message.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </motion.div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white border border-gray-200 px-4 py-2 rounded-lg rounded-bl-none max-w-xs"
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </motion.div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  disabled={!newMessage.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;