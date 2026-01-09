
/**
 * MOBILE EXPERTS AI SERVICE
 * Powered by Groq & Llama-3
 */

const GROQ_API_KEY = 'gsk_WaIjiMJyU9y0iT6OmGEyWGdyb3FYY4U0p0Hph3T2swhrYE5psf8';

class GroqClient {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.dangerouslyAllowBrowser = config.dangerouslyAllowBrowser;
    }

    chat = {
        completions: {
            create: async (params) => {
                if (!this.dangerouslyAllowBrowser) throw new Error("Browser usage not enabled");
                
                try {
                    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params)
                    });

                    if (!response.ok) {
                        const err = await response.json();
                        throw new Error(err.error?.message || 'Groq API Error');
                    }

                    return await response.json();
                } catch (error) {
                    console.error("Groq API Call Failed:", error);
                    throw error;
                }
            }
        }
    }
}

// Initialize Groq
const groq = new GroqClient({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

// SYSTEM PROMPTS
const CHATBOT_SYSTEM_PROMPT = `You are a helpful assistant for Brooklyn's Mobile Experts, a repair shop at 1134 Liberty Ave, Brooklyn, NY 11208. Phone: (347) 555-0199.

Your capabilities:
1. REPAIR QUOTES: Provide instant estimates.
   - iPhone Screen: X/XS ($80), 11 ($100), 12 ($110), 13 ($140), 14 ($160), 15 ($180)
   - Battery: Older ($60), Newer ($90)
   - Water damage diagnostics: $35 (Same-day service usually available)
   
2. DEVICE TRADE-INS: Help customers evaluate devices.
   - Ask for Model, Storage, Condition.
   - Suggest repair vs trade-in.
   
3. PHONE LINE SERVICES:
   - New line: $29 fee (often waived).
   - Bill Pay: No fee.
   - Carrier Switching: Support T-Mobile, AT&T, Verizon, Metro.

4. APPOINTMENTS:
   - Store Hours: Mon-Sat 10AM-8PM, Sun 11AM-7PM.
   - Location: 1134 Liberty Ave, Brooklyn, NY.

Personality: Professional, friendly, concise (max 3 sentences). Use emojis sparingly.
ALWAYS confirm details before quoting. If uncertain, suggest calling (347) 555-0199.`;

/**
 * MAIN CHAT FUNCTION
 */
export async function getChatbotResponse(conversationHistory, userMessage) {
    try {
        const messages = [
            { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: userMessage }
        ];

        const response = await groq.chat.completions.create({
            model: 'llama-3.1-70b-versatile',
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
            stream: false
        });

        const botReply = response.choices[0]?.message?.content;
        
        // Analyze intent
        const intent = await analyzeIntent(userMessage, botReply);
        const actions = generateActions(intent);

        return {
            message: botReply,
            intent: intent,
            suggestedActions: actions
        };

    } catch (error) {
        console.error('Groq Error:', error);
        return {
            message: "I'm having a bit of trouble connecting to the server. Please call us at (347) 555-0199 for immediate help.",
            intent: 'error',
            suggestedActions: [{ text: 'Call Now', action: 'call' }]
        };
    }
}

/**
 * INTENT ANALYSIS
 */
async function analyzeIntent(userMessage, botResponse) {
    const intentPrompt = `Analyze this customer message and classify primary intent:
    
    Customer: "${userMessage}"
    Bot Reply: "${botResponse}"
    
    Categories:
    - repair_quote (pricing, broken screen, battery)
    - trade_in (sell, buy back, worth)
    - phone_service (bill pay, activation, sim)
    - appointment (book, schedule, hours, location)
    - urgent (water damage, won't turn on, emergency)
    - general_question (other)
    
    Return ONLY the category name.`;

    try {
        const response = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: intentPrompt }],
            temperature: 0.3,
            max_tokens: 20
        });
        return response.choices[0]?.message?.content.trim().toLowerCase();
    } catch (e) {
        return 'general_question';
    }
}

/**
 * GENERATE ACTIONS
 */
function generateActions(intent) {
    const actionMap = {
        repair_quote: [
            { text: 'Book Repair', action: 'redirect:booking.html' },
            { text: 'Call Expert', action: 'call' }
        ],
        trade_in: [
            { text: 'Start Calculator', action: 'redirect:sell.html' },
            { text: 'View Inventory', action: 'redirect:inventory.html' }
        ],
        phone_service: [
            { text: 'View Plans', action: 'redirect:phone-services.html' },
            { text: 'Activate', action: 'redirect:phone-services.html#activate' }
        ],
        appointment: [
            { text: 'Book Now', action: 'redirect:booking.html' },
            { text: 'Get Directions', action: 'map' }
        ],
        urgent: [
            { text: '🚨 Call Now', action: 'call' },
            { text: 'Get Directions', action: 'map' },
            { text: 'Book Priority', action: 'redirect:booking.html' }
        ]
    };

    let actions = actionMap[intent] || [
        { text: 'View Services', action: 'redirect:phone-services.html' },
        { text: 'Contact Us', action: 'redirect:contact.html' }
    ];

    // Clean up string matching if AI returns extra text
    if (intent.includes('repair')) actions = actionMap.repair_quote;
    if (intent.includes('sell') || intent.includes('trade')) actions = actionMap.trade_in;
    if (intent.includes('urgent')) actions = actionMap.urgent;

    return actions;
}

/**
 * TRADE-IN ASSESSMENT
 */
export async function assessDeviceCondition(deviceModel, userDescription) {
    const prompt = `Device: ${deviceModel}
    User Description: "${userDescription}"
    
    Analyze:
    1. Condition Grade (Excellent/Good/Fair/Poor)
    2. Estimated Value Range (Based on: Excellent=$300, Good=$220, Fair=$150, Poor=$50 - adjust for model)
    3. Issues Detected
    
    Return JSON: { "grade": "...", "value": "...", "issues": [], "message": "Short friendly explanation" }`;

    try {
        const response = await groq.chat.completions.create({
            model: 'llama-3.1-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.4
        });
        return JSON.parse(response.choices[0]?.message?.content);
    } catch (e) {
        console.error(e);
        return null; // Fallback
    }
}

/**
 * REPAIR DIAGNOSTIC
 */
export async function diagnoseRepairIssue(issueDescription) {
    const prompt = `Diagnose this phone issue: "${issueDescription}"
    
    Provide:
    1. Most likely cause
    2. Estimated Repair Cost (Range)
    3. Repair Time Estimate
    4. Urgency Level (High/Medium/Low)
    
    Return JSON: { "cause": "...", "cost_range": "...", "time": "...", "urgency": "...", "advice": "..." }`;
    
    try {
        const response = await groq.chat.completions.create({
            model: 'llama-3.1-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.3
        });
        return JSON.parse(response.choices[0]?.message?.content);
    } catch (e) {
        return { cause: "Unknown", cost_range: "$50-$150", advice: "Please bring it in for a free diagnostic." };
    }
}

/**
 * REPAIR VS SELL RECOMMENDATION
 */
export async function recommendRepairOrSell(deviceModel, repairCost, tradeInValue) {
    const prompt = `Device: ${deviceModel}
    Repair Cost: $${repairCost}
    Trade-In Value: $${tradeInValue}
    
    Should the user Repair or Sell?
    Logic:
    - If repair cost > 50% of trade-in value -> Lean towards Sell/Upgrade.
    - If device is > 3 years old -> Lean towards Sell.
    
    Return JSON: { "recommendation": "REPAIR" or "SELL", "reasoning": "...", "confidence": "..." }`;

    try {
         const response = await groq.chat.completions.create({
            model: 'llama-3.1-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.3
        });
        return JSON.parse(response.choices[0]?.message?.content);
    } catch (e) {
        return { recommendation: "REPAIR", reasoning: "It's usually cheaper to repair." }; // Default
    }
}

/**
 * CALCULATE TRADE IN VALUE (Specific)
 */
export async function calculateTradeInValue(device, storage, condition) {
    const prompt = `Calculate precise trade-in value.
    Device: ${device}
    Storage: ${storage}
    Condition: ${condition}
    
    Ref Pricing (Excellent):
    - iPhone 15 Pro Max: $800
    - iPhone 14 Pro: $500
    - Galaxy S24 Ultra: $750
    - Older phones: Drop significantly
    
    Return JSON: { "value": Integer, "currency": "USD" }`;
    
    try {
        const response = await groq.chat.completions.create({
            model: 'llama-3.1-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.1
        });
        return JSON.parse(response.choices[0]?.message?.content);
    } catch (e) {
        return { value: 0 };
    }
}

/**
 * MASTER CUSTOMER ADVISOR
 * Generates a holistic plan for the customer
 */
export async function masterCustomerAdvisor(conversationHistory) {
     const prompt = `Analyze this conversation history and create a 'Next Step Plan' for the customer.
     Identify if they need a booking link, a direction, or a phone call.
     
     Return JSON: { "summary": "...", "next_step": "...", "action_url": "..." }`;
     
     // Implementation would use getting last few messages
     // For now, this is a placeholder for the advanced logic
     return { summary: "Customer is inquiring.", next_step: "Offer Assistance", action_url: "javascript:void(0)" };
}
