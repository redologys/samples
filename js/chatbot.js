/**
 * ADVANCED TECHBOT LOGIC
 * Features: State management, Smart Fallbacks, Markdown rendering, Animations
 */

const TechBot = {
    // State
    isOpen: false,
    history: [],
    
    // Config
    config: {
        botName: 'TechBot',
        address: '1134 Liberty Ave, Brooklyn, NY 11208',
        phone: '(929) 789-2786',
        hours: 'Mon-Sun: 10am - 8pm'
    },

    // Initialization
    init() {
        this.renderWidget();
        this.attachListeners();
        this.addMessage('bot', "👋 Hi! I'm TechBot. Need a repair quote or store info?", [
            "Get Repair Quote", "Sell My Device", "Store Hours", "Location"
        ]);
    },

    // Render HTML Structure
    renderWidget() {
        const div = document.createElement('div');
        div.className = 'techbot-widget';
        div.innerHTML = `
            <div class="techbot-window" id="techbotWindow">
                <div class="techbot-header">
                    <div class="flex items-center">
                        <div class="techbot-avatar">🤖</div>
                        <div class="techbot-info">
                            <h3>${this.config.botName}</h3>
                            <div class="techbot-status"><span class="status-dot"></span> Online</div>
                        </div>
                    </div>
                    <button id="techbotClose" class="text-white hover:text-gray-300">✕</button>
                </div>
                <div class="techbot-messages" id="techbotMessages"></div>
                <div class="techbot-input">
                    <textarea id="techbot-textarea" rows="1" placeholder="Type a message..."></textarea>
                    <button class="techbot-send" id="techbotSend">➤</button>
                </div>
            </div>
            <button class="techbot-toggle" id="techbotToggle">
                <span class="notification-badge">1</span>
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
            </button>
        `;
        document.body.appendChild(div);
    },

    // Event Listeners
    attachListeners() {
        const toggle = document.getElementById('techbotToggle');
        const close = document.getElementById('techbotClose');
        const send = document.getElementById('techbotSend');
        const input = document.getElementById('techbot-textarea');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.toggleChat(false));
        
        send.addEventListener('click', () => this.handleUserMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });
    },

    // Toggle Window
    toggleChat(forceState) {
        this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
        const windowEl = document.getElementById('techbotWindow');
        const badge = document.querySelector('.notification-badge');
        
        if (this.isOpen) {
            windowEl.classList.add('is-open');
            badge.style.display = 'none';
        } else {
            windowEl.classList.remove('is-open');
        }
    },

    // Handle User Message
    handleUserMessage() {
        const input = document.getElementById('techbot-textarea');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        input.value = '';
        
        this.showTyping();
        
        // Simulate Network Delay
        setTimeout(() => {
            this.removeTyping();
            this.generateResponse(text.toLowerCase());
        }, 1200);
    },

    // Generate Smart Response (Mock NLP)
    generateResponse(text) {
        let response = "";
        let quickReplies = [];

        // Logic
        if (text.includes('repair') || text.includes('fix') || text.includes('broken')) {
            response = "📱 **Repair Services**\nWe fix screens, batteries, and more in under 1 hour! \n\nSelect your device to get an instant quote:";
            quickReplies = ["iPhone Repair", "Samsung Repair", "Other Device"];
        } else if (text.includes('sell') || text.includes('cash') || text.includes('worth')) {
            response = "💰 **Sell Your Device**\nWe pay top dollar for used electronics. \n\nCheck our [Buyback Calculator](sell.html) for an instant offer!";
            quickReplies = ["Check Prices", "Trade-In Info"];
        } else if (text.includes('price') || text.includes('cost') || text.includes('much')) {
            response = "For exact pricing, please use our **Instant Quote** tool on the homepage. \n\nTypical prices:\n• Screens: from $49\n• Batteries: from $39";
            quickReplies = ["Get Quote"];
        } else if (text.includes('location') || text.includes('where') || text.includes('address')) {
            response = `📍 **Location**\nWe are located at:\n**${this.config.address}**\n\n(Near Grant Ave Station - A Train)`;
            quickReplies = ["Get Directions", "Store Hours"];
        } else if (text.includes('hours') || text.includes('open') || text.includes('time')) {
            response = `⏰ **Store Hours**\n${this.config.hours}\nOpen 7 days a week!`;
        } else {
            response = "I can help with repairs, buying devices, or store info. What do you need?";
            quickReplies = ["Repair Quote", "Location", "Sell Device"];
        }

        this.addMessage('bot', response, quickReplies);
    },

    // Add Message to UI
    addMessage(type, text, quickReplies = []) {
        const messagesContainer = document.getElementById('techbotMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        
        // Simple Markdown Parsing
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        msgDiv.innerHTML = formattedText;
        messagesContainer.appendChild(msgDiv);

        // Add Quick Replies if Bot
        if (type === 'bot' && quickReplies.length > 0) {
            const qrDiv = document.createElement('div');
            qrDiv.className = 'quick-replies';
            quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = reply;
                btn.onclick = () => {
                    const input = document.getElementById('techbot-textarea');
                    input.value = reply;
                    this.handleUserMessage();
                };
                qrDiv.appendChild(btn);
            });
            messagesContainer.appendChild(qrDiv);
        }

        this.scrollToBottom();
    },

    // Typing Indicator
    showTyping() {
        const messagesContainer = document.getElementById('techbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing';
        typingDiv.id = 'techbotTyping';
        typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    },

    removeTyping() {
        const typing = document.getElementById('techbotTyping');
        if (typing) typing.remove();
    },

    scrollToBottom() {
        const messagesContainer = document.getElementById('techbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};

// Auto-Launch
document.addEventListener('DOMContentLoaded', () => {
    TechBot.init();
});
