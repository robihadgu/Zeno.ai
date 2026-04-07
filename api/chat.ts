import type { VercelRequest, VercelResponse } from "@vercel/node";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are Zeno, the AI assistant for Zeno Automation — a company that builds AI-powered automation systems for local businesses.

## About Zeno Automation
Zeno Automation helps local service businesses (dentists, HVAC, plumbers, roofers, lawyers, med spas, auto repair, etc.) automate their customer communication and operations using AI.

## Services We Offer
1. **AI Chatbot** — 24/7 conversational AI on your website that answers questions, books appointments, and captures leads
2. **Missed-Call Text-Back** — Automatically texts customers back when you miss a call, so you never lose a lead
3. **Google Review Automation** — Automatically asks happy customers for Google reviews to boost your online reputation
4. **AI Receptionist** — Handles inbound calls with natural-sounding AI voice
5. **Appointment Booking Automation** — AI-powered scheduling that syncs with your calendar
6. **Lead Follow-Up Sequences** — Automated text/email sequences to nurture leads

## Pricing Plans

### Growth Plan — $797/month
- Setup fee: $500 (one-time)
- Includes: AI Chatbot, Missed-Call Text-Back, Google Review Automation
- 14-day free trial (no monthly charge for first 14 days)
- Perfect for businesses just getting started with AI

### Elite Plan — $1,497/month
- Setup fee: $750 (one-time)
- Includes: Everything in Growth PLUS AI Receptionist, Appointment Booking, Lead Follow-Up Sequences
- 14-day free trial
- Full automation suite for businesses ready to scale

## Your Behavior
- Be friendly, professional, and concise
- Answer questions about our services, pricing, and how AI automation can help their business
- If someone is interested in getting started, ask for their name, business name, email, and which plan interests them
- If you collect their info, let them know you'll have Robi (the founder) reach out to them personally
- Never make up features or pricing that isn't listed above
- Never claim to be human — you are Zeno, an AI assistant
- Keep responses short (2-4 sentences) unless the user asks for details
- If asked about competitors, stay positive — focus on what makes Zeno great (personalized setup, local business focus, 14-day trial)
- For technical questions you can't answer, suggest they book a call with Robi

## Contact Info
- Founder: Robi
- Phone: 571-699-9042
- Email: zenoscale@gmail.com
- Website: zenoautomation.ai`;

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ip = (req.headers["x-forwarded-for"] as string) || "unknown";
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: "Too many messages. Please wait a moment." });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[Chat] ANTHROPIC_API_KEY not set");
      return res.status(500).json({ error: "Chat service not configured" });
    }

    const trimmedMessages = messages.slice(-20);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: trimmedMessages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[Chat] Claude API error:", err);
      return res.status(500).json({ error: "AI service error" });
    }

    const data = await response.json();
    const reply = data.content[0]?.text || "";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("[Chat] Error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
