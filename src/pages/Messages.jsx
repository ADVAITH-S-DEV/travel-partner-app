"use client"

import { useState, useEffect, useRef } from "react"
import Header from "../components/Header"
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa"

const Messages = ({ onLogout }) => {
  const [contacts, setContacts] = useState([])
  const [activeContact, setActiveContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Mock data - in a real app, you would fetch this from your API
    const mockContacts = [
      {
        id: 1,
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        lastMessage: "Looking forward to our trip!",
        lastMessageTime: "10:30 AM",
        unread: 2,
      },
      {
        id: 2,
        name: "Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        lastMessage: "Do you want to meet before the trip?",
        lastMessageTime: "Yesterday",
        unread: 0,
      },
      {
        id: 3,
        name: "TravelBuddy Assistant",
        avatar: "/placeholder.svg?height=50&width=50",
        lastMessage: "How can I help you today?",
        lastMessageTime: "2 days ago",
        unread: 0,
        isBot: true,
      },
    ]

    setContacts(mockContacts)

    // Set the first contact as active by default
    if (mockContacts.length > 0 && !activeContact) {
      setActiveContact(mockContacts[0])
      loadMessages(mockContacts[0].id)
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadMessages = (contactId) => {
    // Mock data - in a real app, you would fetch this from your API
    let mockMessages = []

    if (contactId === 1) {
      mockMessages = [
        {
          id: 1,
          senderId: 1,
          text: "Hey there! Excited about our Bali trip?",
          timestamp: "10:15 AM",
        },
        {
          id: 2,
          senderId: "me",
          text: "Yes, I can't wait! Have you booked your flights yet?",
          timestamp: "10:18 AM",
        },
        {
          id: 3,
          senderId: 1,
          text: "Not yet, I'm looking at options. Do you want to try to get on the same flight?",
          timestamp: "10:20 AM",
        },
        {
          id: 4,
          senderId: "me",
          text: "That would be great! I was looking at the ones departing around noon.",
          timestamp: "10:25 AM",
        },
        {
          id: 5,
          senderId: 1,
          text: "Perfect! I'll check those out. Looking forward to our trip!",
          timestamp: "10:30 AM",
        },
      ]
    } else if (contactId === 2) {
      mockMessages = [
        {
          id: 1,
          senderId: 2,
          text: "Hi! I saw we're both going to Bali in December.",
          timestamp: "Yesterday, 3:45 PM",
        },
        {
          id: 2,
          senderId: "me",
          text: "Yes! Are you staying in Ubud or near the beach?",
          timestamp: "Yesterday, 4:00 PM",
        },
        {
          id: 3,
          senderId: 2,
          text: "I'll be in Ubud for the first few days, then heading to Seminyak. You?",
          timestamp: "Yesterday, 4:05 PM",
        },
        {
          id: 4,
          senderId: "me",
          text: "Similar plan! I'll be in Ubud Dec 15-18, then Seminyak until the 28th.",
          timestamp: "Yesterday, 4:10 PM",
        },
        {
          id: 5,
          senderId: 2,
          text: "Do you want to meet before the trip?",
          timestamp: "Yesterday, 4:15 PM",
        },
      ]
    } else if (contactId === 3) {
      mockMessages = [
        {
          id: 1,
          senderId: 3,
          text: "Hello! I'm your TravelBuddy Assistant. How can I help you plan your perfect trip?",
          timestamp: "2 days ago, 11:00 AM",
        },
        {
          id: 2,
          senderId: "me",
          text: "I'm looking for recommendations for Bali in December.",
          timestamp: "2 days ago, 11:05 AM",
        },
        {
          id: 3,
          senderId: 3,
          text: "December is a great time to visit Bali, though it's the rainy season. I recommend staying in Ubud for cultural experiences and Seminyak or Canggu for beaches. Would you like specific hotel or activity recommendations?",
          timestamp: "2 days ago, 11:07 AM",
        },
        {
          id: 4,
          senderId: "me",
          text: "Yes, please suggest some activities that are good even during rainy season.",
          timestamp: "2 days ago, 11:10 AM",
        },
        {
          id: 5,
          senderId: 3,
          text: "How can I help you today?",
          timestamp: "2 days ago, 11:15 AM",
        },
      ]
    }

    setMessages(mockMessages)
  }

  const handleContactSelect = (contact) => {
    setActiveContact(contact)
    loadMessages(contact.id)

    // Mark messages as read
    setContacts((prevContacts) => prevContacts.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      senderId: "me",
      text: newMessage,
      timestamp: "Just now",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // If chatting with bot, simulate response
    if (activeContact.isBot) {
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          senderId: activeContact.id,
          text: "I'm here to help with your travel plans! What specific information do you need?",
          timestamp: "Just now",
        }
        setMessages((prevMessages) => [...prevMessages, botResponse])
      }, 1000)
    }
  }

  return (
    <div className="messages-page">
      <Header isAuthenticated={true} onLogout={onLogout} />

      <div className="messages-container">
        <div className="messages-sidebar">
          <div className="sidebar-header">
            <h2>Messages</h2>
          </div>

          <div className="contacts-list">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`contact-item ${activeContact?.id === contact.id ? "active" : ""}`}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="contact-avatar">
                  <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                </div>
                <div className="contact-info">
                  <div className="contact-name-time">
                    <h3>{contact.name}</h3>
                    <span className="contact-time">{contact.lastMessageTime}</span>
                  </div>
                  <p className="contact-last-message">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && <div className="unread-badge">{contact.unread}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="messages-main">
          {activeContact ? (
            <>
              <div className="chat-header">
                <div className="chat-contact">
                  <img
                    src={activeContact.avatar || "/placeholder.svg"}
                    alt={activeContact.name}
                    className="chat-avatar"
                  />
                  <div className="chat-contact-info">
                    <h2>{activeContact.name}</h2>
                    <p>{activeContact.isBot ? "TravelBuddy Assistant" : "Travel Partner"}</p>
                  </div>
                </div>
              </div>

              <div className="chat-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.senderId === "me" ? "message-sent" : "message-received"}`}
                  >
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form className="chat-input" onSubmit={handleSendMessage}>
                <button type="button" className="chat-attach">
                  <FaPaperclip />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="button" className="chat-emoji">
                  <FaSmile />
                </button>
                <button type="submit" className="chat-send">
                  <FaPaperPlane />
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages

