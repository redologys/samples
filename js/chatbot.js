
import { getChatbotResponse } from './ai-service.js';

/**
 * TECHBOT v3.0 - ADVANCED AI INTEGRATION
 * Features: Groq Llama-3, Context Awareness, Auto-Triage
 */

export const TechBot = {
    // Configuration
    config: {
        botName: 'TechBot',
    },

    // State
    isOpen: false,
    history: [], // Stores conversation context
    
    // Configurable DOM ID map
    dom: {
        window: 'techbotWindow',
        messages: 'techbotMessages',
        input: 'techbot-textarea',
        send: 'techbotSend',
        toggle: 'techbotToggle',
        close: 'techbotClose',
        badge: 'techbotBadge' // Note: class notification-badge in existing HTML
    },

    // Initialization
    init() {
        console.log("TechBot Initializing...");
        // Check if widget exists, if not render it
        if (!document.getElementById(this.dom.window)) {
            this.renderWidget();
        }
        this.attachListeners();
        
        // Initial Greeting
        setTimeout(() => {
            if (this.history.length === 0) {
                this.addMessage('bot', "👋 **Hi! I'm TechBot.**\nI can give you an instant Quote, assess Trade-Ins, or book an urgent Repair using AI. How can I help?", [
                    "Broken Screen 📱", "Trade-In Value 💰", "Water Damage 💧", "Book Repair 📅"
                ]);
            }
        }, 1500);
    },

    // Render Widget HTML (Brutalist Style)
    renderWidget() {
        const div = document.createElement('div');
        div.className = 'techbot-widget';
        div.innerHTML = `
            <div class="techbot-window" id="${this.dom.window}">
                <div class="techbot-header">
                    <div class="flex items-center">
                        <div class="techbot-avatar">
                            <span class="material-symbols-outlined text-xl">smart_toy</span>
                        </div>
                        <div class="techbot-info">
                            <h3>${this.config.botName}</h3>
                            <div class="techbot-status"><span class="status-dot"></span> AI Online</div>
                        </div>
                    </div>
                    <button id="${this.dom.close}" class="text-white/80 hover:text-white transition-colors">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="techbot-messages" id="${this.dom.messages}"></div>
                <div class="techbot-input">
                    <textarea id="${this.dom.input}" rows="1" placeholder="Type a message..."></textarea>
                    <button class="techbot-send" id="${this.dom.send}">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
            <button class="techbot-toggle" id="${this.dom.toggle}">
                <span class="notification-badge" id="${this.dom.badge}">1</span>
                <span class="material-symbols-outlined text-3xl text-white">chat_bubble</span>
            </button>
        `;
        document.body.appendChild(div);
    },

    // Event Listeners
    attachListeners() {
        const toggle = document.getElementById(this.dom.toggle);
        const close = document.getElementById(this.dom.close);
        const send = document.getElementById(this.dom.send);
        const input = document.getElementById(this.dom.input);

        if(toggle) toggle.addEventListener('click', () => this.toggleChat());
        if(close) close.addEventListener('click', () => this.toggleChat(false));
        if(send) send.addEventListener('click', () => this.handleUserMessage());
        
        if(input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserMessage();
                }
            });
        }
    },

    // Toggle Chat Window
    toggleChat(forceState) {
        this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
        const windowEl = document.getElementById(this.dom.window);
        const badge = document.getElementById(this.dom.badge) || document.querySelector('.notification-badge');
        
        if (this.isOpen) {
            windowEl.classList.add('is-open');
            if(badge) badge.style.display = 'none';
            setTimeout(() => {
                const input = document.getElementById(this.dom.input);
                if(input) input.focus();
            }, 300);
        } else {
            windowEl.classList.remove('is-open');
        }
    },

    // Handle Messages
    async handleUserMessage() {
        const input = document.getElementById(this.dom.input);
        const text = input.value.trim();
        if (!text) return;

        // 1. Add User Message
        this.addMessage('user', text);
        this.history.push({ role: 'user', content: text });
        input.value = '';

        // 2. Show Typing Indicator
        this.showTyping();

        // 3. Call Groq AI Service
        const response = await getChatbotResponse(this.history, text);

        // 4. Handle Response
        this.removeTyping();
        this.addMessage('bot', response.message, response.suggestedActions);
        this.history.push({ role: 'assistant', content: response.message });
        
        // 5. Handle Special Actions (Redirects provided by AI intent)
        // (Actions provided in UI are buttons, but if we wanted auto-redirect we'd do it here)
    },

    // UI: Add Message
    addMessage(type, text, actions = []) {
        const container = document.getElementById(this.dom.messages);
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        
        // Basic Markdown Parsing
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
            
        msgDiv.innerHTML = formattedText;
        container.appendChild(msgDiv);

        // Render Quick Actions / Suggested Actions
        if (type === 'bot' && actions.length > 0) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'quick-replies';
            
            actions.forEach(action => {
                // If action is object {text, action}
                const label = typeof action === 'object' ? action.text : action;
                const actionType = typeof action === 'object' ? action.action : action;

                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = label;
                
                btn.onclick = () => {
                    this.executeAction(actionType, label);
                };
                actionsDiv.appendChild(btn);
            });
            container.appendChild(actionsDiv);
        }

        this.scrollToBottom();
    },

    // Execute Action Logic
    executeAction(actionType, label) {
        if (actionType.startsWith('redirect:')) {
            window.location.href = actionType.split(':')[1];
        } else if (actionType === 'call') {
            window.location.href = 'tel:347-555-0199';
        } else if (actionType === 'map') {
            window.open('https://maps.google.com/?q=1134+Liberty+Ave+Brooklyn+NY', '_blank');
        } else {
            // Treat as text input for chat
            const input = document.getElementById(this.dom.input);
            input.value = label;
            this.handleUserMessage();
        }
    },

    showTyping() {
        const container = document.getElementById(this.dom.messages);
        const div = document.createElement('div');
        div.className = 'typing';
        div.id = 'techbotTyping';
        div.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        container.appendChild(div);
        this.scrollToBottom();
    },

    removeTyping() {
        const el = document.getElementById('techbotTyping');
        if (el) el.remove();
    },

    scrollToBottom() {
        const el = document.getElementById(this.dom.messages);
        if(el) el.scrollTop = el.scrollHeight;
    }
};

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    TechBot.init();
});
