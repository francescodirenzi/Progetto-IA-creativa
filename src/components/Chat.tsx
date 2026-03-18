import { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import type { ChatMessage, GenerationParams } from "../types";
import { LoadingDots } from "./LoadingDots";
import { MessageBubble } from "./MessageBubble";
import {
  buildGenerationConfig,
  buildThinkingInstruction,
  getModelWithSystemInstruction,
} from "../lib/gemini";
import { uid } from "../lib/utils";

type Props = {
  params: GenerationParams;
};

function toGeminiHistory(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));
}

export function Chat({ params }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !sending,
    [input, sending],
  );

  async function send() {
    const prompt = input.trim();
    if (!prompt || sending) return;

    setError(null);
    setSending(true);
    setInput("");

    const userMsg: ChatMessage = { id: uid(), role: "user", content: prompt };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);

    try {
      const model = getModelWithSystemInstruction(
        buildThinkingInstruction(params.thinkingLevel),
      );

      // Recreate a chat session each send to ensure generationConfig is current.
      const chat = model.startChat({
        history: toGeminiHistory(messages),
        generationConfig: buildGenerationConfig(params),
      });

      const res = await chat.sendMessage(prompt);
      const text = res.response.text();
      setMessages((prev) => [...prev, { id: uid(), role: "model", content: text }]);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Errore sconosciuto durante la richiesta.";
      setError(msg);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/60 px-6 py-4">
        <div>
          <h1 className="text-sm font-semibold text-zinc-50">
            Gemini Param Chat
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Ogni richiesta usa i parametri correnti della sidebar.
          </p>
        </div>
        <div className="text-xs text-zinc-400 tabular-nums">
          Temp {params.temperature.toFixed(1)} · Top-P {params.topP.toFixed(2)} ·
          Top-K {Math.round(params.topK)} · Max {Math.round(params.maxOutputTokens)} ·
          Think {Math.round(params.thinkingLevel)}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200">
              Imposta i parametri nella sidebar e inviami un messaggio. Supporto{" "}
              <span className="font-semibold">Markdown</span> e blocchi di codice.
            </div>
          ) : null}
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {sending ? (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200">
                <LoadingDots />
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>
      </div>

      <footer className="border-t border-zinc-800 bg-zinc-950/60 px-6 py-4">
        <div className="mx-auto flex w-full max-w-5xl gap-3">
          <textarea
            className="min-h-[44px] flex-1 resize-none rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-50 outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="Scrivi un messaggio… (Shift+Enter per andare a capo)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <button
            type="button"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canSend}
            onClick={() => void send()}
          >
            <Send className="h-4 w-4" />
            Invia
          </button>
        </div>
      </footer>
    </section>
  );
}

