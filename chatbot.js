const GEMINI_API_KEY = "AIzaSyA7bUm-2WEzRolPS1cizjjFbD_DILfoO1I";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Chatbot HTML Structure
const chatbotHTML = `
    <div class="chat-widget">
        <button class="chat-btn" id="chatBtn">
            <span>💬</span>
        </button>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <h4><span>✨</span> Sahayika AI</h4>
                <div class="close-chat" id="closeChat">&times;</div>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message ai">
                    Namaste! I am Sahayika AI. How can I assist you with your career, safety, or legal rights today?
                </div>
            </div>
            <div class="typing-indicator" id="typingIndicator">
                <div class="typing-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
                <button class="send-btn" id="sendBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
`;

// Initialize Chatbot
function initChatbot() {
    // Append HTML to body
    const div = document.createElement('div');
    div.innerHTML = chatbotHTML;
    document.body.appendChild(div);

    const chatBtn = document.getElementById('chatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    // Toggle Chat
    chatBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Send Message
    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        appendMessage(text, 'user');
        chatInput.value = '';

        // Show Typing
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are Sahayika AI, a helpful assistant for a platform empowering women. 
                            Provide guidance on career (like Asha worker, teaching, etc.), safety (SOS, digital protection), and legal rights. 
                            Keep responses concise, supportive, and empowering. 
                            User says: ${text}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;

            typingIndicator.style.display = 'none';
            appendMessage(aiResponse, 'ai');
        } catch (error) {
            console.error("Gemini API Error:", error);
            typingIndicator.style.display = 'none';
            appendMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", 'ai');
        }
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

// Start chatbot on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
