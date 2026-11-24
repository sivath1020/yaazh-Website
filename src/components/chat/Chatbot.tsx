import { useEffect, useRef, useState } from 'react';
import { ArrowRight, LoaderCircle, Send, X } from 'lucide-react';
import botIcon from '../../assets/bot.optimized.webp';
import { askGeminiDirect, getLocalAssistantResponse } from '../../lib/chatFallback';
import './Chatbot.css';

type ChatMessage = { role: 'user' | 'assistant'; content: string };
interface ChatbotProps { open: boolean; onClose: () => void; onContact: () => void; }
const SUGGESTIONS = ['What services do you offer?', 'I need a website for my business', 'How can I contact your team?'];

export function Chatbot({ open, onClose, onContact }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const sending = useRef(false);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'auto' });
  }, [messages, pending, error, open]);

  useEffect(() => () => request.current?.abort(), []);

  const close = () => {
    onClose();
    document.getElementById('navbar-chatbot-toggle')?.focus();
  };

  const send = async (text = input) => {
    const content = text.trim();
    if (!content || sending.current || content.length > 1500) return;
    let history: ChatMessage[] = [...messages, { role: 'user' as const, content }].slice(-19);
    while (history.length > 1 && history.reduce((sum, message) => sum + message.content.length, 0) > 18000) history = history.slice(2);
    sending.current = true;
    setMessages(history);
    setInput(''); setError(''); setPending(true);
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 35000);

    try {
      let reply: string | null = null;

      // 1. First attempt: call /api/chat (works when Netlify Functions or backend is running)
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });
        if (response.ok) {
          const data = await response.json().catch(() => null);
          if (typeof data?.reply === 'string' && data.reply.trim()) {
            reply = data.reply.trim();
          }
        }
      } catch {
        // Backend endpoint unavailable or returned 404 (e.g. static Netlify drop)
      }

      // 2. Second attempt: call Gemini API directly if /api/chat was not available
      if (!reply) {
        try {
          reply = await askGeminiDirect(history, controller.signal);
        } catch {
          // 3. Third attempt: instant intelligent local responder (guarantees zero downtime)
          reply = getLocalAssistantResponse(content);
        }
      }

      if (!reply) {
        reply = getLocalAssistantResponse(content);
      }

      setMessages([...history, { role: 'assistant', content: reply }]);
    } catch (failure) {
      setMessages(history.slice(0, -1));
      setInput(content);
      setError(
        failure instanceof DOMException && failure.name === 'AbortError'
          ? 'That took too long. Please try again or contact our team.'
          : failure instanceof Error
          ? failure.message
          : 'Unable to connect. Please try again.'
      );
    } finally {
      window.clearTimeout(timeout);
      sending.current = false;
      setPending(false);
      request.current = null;
    }
  };

  if (!open) return null;
  return (
    <section id="yaazh-chatbot" className="yaazh-chat" role="dialog" aria-labelledby="yaazh-chat-title" onKeyDown={event => { if (event.key === 'Escape') close(); }}>
      <header className="yaazh-chat__header">
        <span className="yaazh-chat__mark">
          <img src={botIcon} alt="Yaazh AI Assistant" title="Yaazh AI Assistant" width={28} height={28} className="yaazh-chat__bot-icon" />
        </span>
        <div>
          <h2 id="yaazh-chat-title">Yaazh assistant</h2>
          <p>Your guide to all things digital</p>
        </div>
        <button type="button" onClick={close} aria-label="Close chatbot">
          <X size={19} />
        </button>
      </header>

      <div className="yaazh-chat__conversation" ref={scrollRef} data-lenis-prevent>
        <div className="yaazh-chat__welcome">
          <span>LET’S BUILD SOMETHING</span>
          <h3>Hi there. How can I help?</h3>
          <p>Ask about our services, share your idea, or find the right team to talk to.</p>
        </div>
        {!messages.length && (
          <div className="yaazh-chat__suggestions">
            {SUGGESTIONS.map(text => (
              <button type="button" key={text} disabled={pending} onClick={() => void send(text)}>
                {text}
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        )}
        <div role="log" aria-label="Chat messages" aria-live="polite" aria-relevant="additions text">
          {messages.map((message, index) => (
            <div key={index} className={`yaazh-chat__message yaazh-chat__message--${message.role}`}>
              <span className="sr-only">{message.role === 'user' ? 'You' : 'Yaazh assistant'}: </span>
              {message.content}
            </div>
          ))}
        </div>
        {pending && (
          <p className="yaazh-chat__thinking" role="status">
            <LoaderCircle size={14} className="yaazh-chat__spinner" /> Thinking…
          </p>
        )}
        {error && <p className="yaazh-chat__error" role="alert">{error}</p>}
      </div>

      <div className="yaazh-chat__composer">
        <form onSubmit={event => { event.preventDefault(); void send(); }}>
          <label htmlFor="yaazh-chat-input" className="sr-only">Your message</label>
          <textarea
            id="yaazh-chat-input"
            ref={inputRef}
            rows={2}
            maxLength={1500}
            value={input}
            placeholder="Tell us what’s on your mind…"
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                void send();
              }
            }}
          />
          <button type="submit" disabled={pending || !input.trim()} aria-label="Send message">
            {pending ? <LoaderCircle size={18} className="yaazh-chat__spinner" /> : <Send size={18} />}
          </button>
        </form>
        <div className="yaazh-chat__fineprint">
          <span>AI assistant · Answers may need checking</span>
          <button type="button" onClick={() => { close(); onContact(); }}>
            Talk to our team
          </button>
        </div>
      </div>
    </section>
  );
}
