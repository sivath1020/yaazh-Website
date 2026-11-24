// Client-side fallback handler for Yaazh 360 Assistant
// Ensures the chat works seamlessly on static hosting (Netlify Drop / S3 / GitHub Pages)
// even when serverless functions are not deployed.

const SYSTEM_INSTRUCTION = `You are the Yaazh 360 Digitech website assistant. Help visitors understand the company's services and choose a useful next step. Reply in the visitor's language, including Tamil when requested. Be warm and concise, normally under 120 words. Use plain text, not Markdown formatting.
Verified company information:
Yaazh 360 Digitech offers custom software and ERP, website and e-commerce development, mobile applications, UI/UX and creative design, digital marketing, SEO, social media management, Google/Meta advertising, and programmatic advertising.
Location: Peelamedu, Avinashi Rd, Coimbatore, Tamil Nadu 641014, India.
Contact: +91 90470 44440; yaazh360digitech@gmail.com. Hours: Monday to Saturday, 9:00 AM to 7:00 PM IST.
Website pages: /services, /work, /about, /careers, /contact. The chat has a Talk to our team button that opens the enquiry form.
Do not invent prices, delivery dates, guarantees, client names, vacancies, team member names, or company policies. For a quote, ask about the visitor's goal and suggest contacting the team. For current openings, direct them to /careers. If a question is unrelated, gently guide the visitor back to digital services.`;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function askGeminiDirect(
  messages: ChatMessage[],
  signal?: AbortSignal
): Promise<string> {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim();
  const model =
    (import.meta.env.VITE_GEMINI_MODEL as string | undefined)?.trim() ||
    'gemini-flash-latest';

  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: 1200 },
      }),
      signal,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts
    ?.filter((p: { text?: string; thought?: boolean }) => !p.thought && typeof p.text === 'string')
    .map((p: { text: string }) => p.text)
    .join('')
    .trim();

  if (!reply) {
    throw new Error('EMPTY_REPLY');
  }

  return reply;
}

// Built-in intelligent emergency responder for Yaazh 360
// Guarantees zero downtime even during total network outages or API exhaustion
export function getLocalAssistantResponse(lastQuery: string): string {
  const q = lastQuery.toLowerCase().trim();

  // Tamil greeting
  if (q.includes('வணக்கம்') || q.includes('வணக') || q.includes('tamil')) {
    return 'வணக்கம்! யாழ் 360-க்கு (Yaazh 360 Digitech) நல்வரவு. நாங்கள் பிரத்யேக மென்பொருள் (Custom Software & ERP), இணையதள வடிவமைப்பு, மொபைல் ஆப்ஸ் மற்றும் டிஜிட்டல் மார்க்கெட்டிங் சேவைகளை வழங்குகிறோம். உங்கள் தேவைகளை அறிய எங்களை +91 90470 44440 என்ற எண்ணில் அழைக்கலாம் அல்லது "Talk to our team" பொத்தானை அழுத்தலாம்.';
  }

  // Greetings
  if (['hi', 'hello', 'hey', 'start', 'good morning', 'good afternoon', 'good evening', 'hola'].some((g) => q === g || q.startsWith(g + ' ') || q.endsWith(' ' + g))) {
    return 'Hello! Welcome to Yaazh 360 Digitech. We engineer custom enterprise software, web and mobile apps, and high-impact digital marketing systems. How can we help accelerate your business today?';
  }

  // Services
  if (q.includes('service') || q.includes('what do you do') || q.includes('offer')) {
    return 'We specialize in enterprise digital transformation:\n• Custom Software & ERP Systems\n• Web & E-Commerce Development\n• iOS & Android Mobile Apps\n• Performance Marketing & Google/Meta Paid Ads\n• Technical SEO & Conversion Optimization\n• UI/UX Product Design\n\nFeel free to explore our /services page or click "Talk to our team" for a personalized roadmap.';
  }

  // Website / Web development
  if (q.includes('website') || q.includes('web dev') || q.includes('ecommerce') || q.includes('e-commerce') || q.includes('shop')) {
    return 'We craft custom, lightning-fast web platforms and e-commerce architectures tailored to enterprise scale. We focus on modern tech stacks, conversion optimization, and responsive design. Let us know your timeline or click "Talk to our team" for an audit.';
  }

  // Mobile App
  if (q.includes('app') || q.includes('android') || q.includes('ios') || q.includes('flutter') || q.includes('react native')) {
    return 'We build high-performance native and cross-platform iOS and Android applications with scalable backends, secure APIs, and intuitive user experiences. Would you like to schedule an architecture consultation with our engineering team?';
  }

  // SEO / Marketing
  if (q.includes('seo') || q.includes('marketing') || q.includes('google ad') || q.includes('meta ad') || q.includes('ppc') || q.includes('ads')) {
    return 'Our growth division manages data-driven performance marketing: technical organic SEO, Google Search & PMax ads, Meta campaigns, and conversion rate optimization (CRO) to maximize ROAS. Contact us at +91 90470 44440 to discuss your growth goals.';
  }

  // Pricing / Quote
  if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('rate') || q.includes('pricing') || q.includes('charge')) {
    return 'Every enterprise project is tailored to specific architecture and scale requirements. To give you an accurate scope and transparent estimate, please click "Talk to our team" to share your goals or call us directly at +91 90470 44440.';
  }

  // Contact / Phone / Email / Office
  if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('email') || q.includes('reach') || q.includes('office') || q.includes('location') || q.includes('address')) {
    return 'You can connect directly with our team:\n📞 Phone / WhatsApp: +91 90470 44440\n✉️ Email: yaazh360digitech@gmail.com\n📍 Office: Peelamedu, Avinashi Rd, Coimbatore, Tamil Nadu 641014\n⏰ Hours: Monday to Saturday, 9:00 AM – 7:00 PM IST';
  }

  // Careers / Jobs
  if (q.includes('career') || q.includes('job') || q.includes('hiring') || q.includes('vacancy') || q.includes('apply')) {
    return 'We are actively hiring high-calibre builders and marketers! Please visit our /careers page to view active openings or send your profile directly to yaazh360digitech@gmail.com.';
  }

  // Default fallback
  return 'Thank you for reaching out to Yaazh 360 Digitech. We build bespoke software, cloud architectures, and performance marketing engines. To discuss your exact requirements with our senior team, please call +91 90470 44440 or click "Talk to our team" to submit an enquiry.';
}

