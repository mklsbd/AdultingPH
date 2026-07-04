"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircleQuestion, X, Send, Sparkles } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AdultingPH assistant. Ask me anything about getting your SSS, NBI, PhilHealth, Pag-IBIG, or BIR requirements as a first-time job seeker.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I couldn't reach the assistant service just now. Please check the Agency Directory for step-by-step guides in the meantime.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-accent-violet text-white shadow-glow-violet flex items-center justify-center hover:bg-accent-indigo transition-all active:scale-95"
        aria-label="Open AI assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircleQuestion className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[92vw] max-w-sm glass-panel-light flex flex-col overflow-hidden animate-fade-up">
          <div className="flex items-center gap-2 px-4 py-3.5 bg-navy-900 text-white">
            <Sparkles className="h-4.5 w-4.5 text-accent-violet" />
            <div>
              <p className="font-semibold text-sm leading-tight">AdultingPH Assistant</p>
              <p className="text-[11px] text-white/50 leading-tight">
                Guidance only — not an official agency channel
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 max-h-96 overflow-y-auto px-4 py-4 space-y-3 bg-white/70">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-2xl px-3.5 py-2.5 max-w-[85%] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-navy-900 text-white"
                    : "bg-white text-navy-800 border border-navy-100"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white text-navy-400 border border-navy-100 text-sm rounded-2xl px-3.5 py-2.5 max-w-[70%]">
                Typing…
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 border-t border-navy-100 bg-white/90">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about requirements, steps, fees…"
              className="input-field text-sm py-2"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="btn-accent px-3 py-2.5 shrink-0"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
