/**
 * TECHBOT v2.0 - GROQ AI INTEGRATION
 * Features: Llama-3 70b Reasoning, Context Awareness, Function Calling (simulated)
 */

const TechBot = {
    // Config
    config: {
        botName: 'TechBot',
        // REPLACE THIS WITH YOUR REAL API KEY FOR LIVE AI
        // Get one at https://console.groq.com/keys
        groqKey: 'gsk_ReplaceWithYourActualKeyToEnableAI', 
        apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
        model: 'llama-3.1-70b-versatile'
    },

    // State
    isOpen: false,
    history: [],
    
    // System Prompt for Persona & Logic
    systemPrompt: `
    You are TechBot, the advanced AI assistant for "Mobile Experts", a premium repair shop in Brooklyn (1134 Liberty Ave).
    
    YOUR GOALS:
    1. Help customers get repair quotes (screens, batteries, water damage).
    2. Guide users to sell their devices using the "Trade-In Calculator".
    3. Book appointments for urgent repairs (under 1 hour).
    
    KEY BEHAVIORS:
    - Be professional, concise, and helpful. Use emojis occasionally.
    - If user mentions "selling" or "trade-in", ALWAYS suggest checking the "Instant Quote Calculator" on the Sell page.
    - If user asks for prices, give ranges (Screen: $80-$300, Battery: $50-$100) but emphasize they need to select their specific model for exact pricing.
    - If user seems stressed or urgent (e.g., "broken phone", "need fix now"), offer the "Urgent Priority Slot" for today.
    
    FORMATTING:
    - Use Markdown for bolding (**text**) and lists.
    - Keep responses under 3 sentences unless explaining a process.
    `,

    // Initialization
    init() {
        this.renderWidget();
        this.attachListeners();
        // Initial greeting
        setTimeout(() => {
            if (!this.history.length) {
                this.addMessage('bot', "👋 Hi! I'm TechBot. I can help with **Repair Quotes**, **Selling Devices**, or **Booking Appointments**. What do you need?", [
                    "Broken Screen 📱", "Sell My Phone 💰", "Store Hours ⏰"
                ]);
            }
        }, 1000);
    },

    // Render Widget HTML
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
                            <div class="techbot-status"><span class="status-dot"></span> AI Online</div>
                        </div>
                    </div>
                    <button id="techbotClose" class="text-white hover:text-gray-300">✕</button>
                </div>
                <div class="techbot-messages" id="techbotMessages"></div>
                <div class="techbot-input">
                    <textarea id="techbot-textarea" rows="1" placeholder="Ask anything..."></textarea>
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

    // Listeners
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

    toggleChat(forceState) {
        this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
        const windowEl = document.getElementById('techbotWindow');
        const badge = document.querySelector('.notification-badge');
        
        if (this.isOpen) {
            windowEl.classList.add('is-open');
            badge.style.display = 'none';
            // Focus input
            setTimeout(() => document.getElementById('techbot-textarea').focus(), 300);
        } else {
            windowEl.classList.remove('is-open');
        }
    },

    handleUserMessage() {
        const input = document.getElementById('techbot-textarea');
        const text = input.value.trim();
        if (!text) return;

        // 1. Add User Message
        this.addMessage('user', text);
        this.history.push({ role: 'user', content: text });
        input.value = '';

        // 2. Show Typing
        this.showTyping();

        // 3. Call AI or Fallback
        if (this.config.groqKey.startsWith('gsk_') && this.config.groqKey.length > 10 && !this.config.groqKey.includes("Replace")) {
            this.callGroqAPI();
        } else {
            // FALLBACK MOCK MODE (If no key provided)
            setTimeout(() => {
                this.removeTyping();
                this.mockResponse(text);
            }, 1000);
        }
    },

    // GROQ API HANDLER
    async callGroqAPI() {
        try {
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.groqKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: [
                        { role: 'system', content: this.systemPrompt },
                        ...this.history
                    ],
                    temperature: 0.7,
                    max_tokens: 200
                })
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            const botReply = data.choices[0].message.content;

            this.removeTyping();
            this.addMessage('bot', botReply);
            this.history.push({ role: 'assistant', content: botReply });

        } catch (error) {
            console.error(error);
            this.removeTyping();
            this.addMessage('bot', "⚠️ **System Offline**: I'm having trouble connecting to the AI brain right now. Please call us at (929) 789-2786.");
        }
    },

    // FALLBACK RESPONSES (No API Key)
    mockResponse(text) {
        text = text.toLowerCase();
        let reply = "I can help with that! Please visit our store at 1134 Liberty Ave.";
        let actions = [];

        if (text.includes('sell') || text.includes('worth') || text.includes('trade')) {
            reply = "💰 **Looking to sell?**\nWe offer the best rates in Brooklyn! Use our **Instant Quote Calculator** to see exactly how much your device is worth in seconds.";
            actions = ["Go to Calculator", "View Prices"];
        } else if (text.includes('screen') || text.includes('crack')) {
            reply = "📱 **Broken Screen?**\nWe can fix that in under 30 minutes! \n\nScreen repairs start at $60. What model do you have?";
            actions = ["iPhone 14", "iPhone 13", "Samsung S23"];
        } else if (text.includes('booking') || text.includes('appointment')) {
            reply = "📅 **Book a Repair**\nWe accept walk-ins, but booking guarantees your spot. We have openings today at 2:00 PM and 4:30 PM.";
            actions = ["Book 2:00 PM", "Book 4:30 PM"];
        } else if (text.includes('hour') || text.includes('open')) {
            reply = "⏰ **We are Open!**\nMon-Sun: 10am - 8pm.\nCome visit us at 1134 Liberty Ave, Brooklyn.";
        }

        this.addMessage('bot', reply, actions);
    },

    // UI Helpers
    addMessage(type, text, quickReplies = []) {
        const container = document.getElementById('techbotMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        
        // Markdown Bold Parsing
        msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        
        container.appendChild(msgDiv);

        if (type === 'bot' && quickReplies.length > 0) {
            const qrDiv = document.createElement('div');
            qrDiv.className = 'quick-replies';
            quickReplies.forEach(r => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = r;
                btn.onclick = () => {
                    document.getElementById('techbot-textarea').value = r;
                    this.handleUserMessage();
                };
                qrDiv.appendChild(btn);
            });
            container.appendChild(qrDiv);
        }

        this.scrollToBottom();
    },

    showTyping() {
        const container = document.getElementById('techbotMessages');
        const div = document.createElement('div');
        div.className = 'typing';
        div.id = 'techbotTyping';
        div.innerHTML = '<span>●</span><span>●</span><span>●</span>';
        container.appendChild(div);
        this.scrollToBottom();
    },

    removeTyping() {
        const el = document.getElementById('techbotTyping');
        if (el) el.remove();
    },

    scrollToBottom() {
        const el = document.getElementById('techbotMessages');
        el.scrollTop = el.scrollHeight;
    }
};

document.addEventListener('DOMContentLoaded', () => TechBot.init());
