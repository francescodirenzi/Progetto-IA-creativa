import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { ChatMessage } from "../types";

type Props = {
  message: ChatMessage;
};

export function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={clsx("flex", isUser ? "justify-end" : "justify-start")}
      aria-label={isUser ? "Messaggio utente" : "Messaggio modello"}
    >
      <div
        className={clsx(
          "max-w-[min(48rem,100%)] rounded-2xl border px-4 py-3",
          isUser
            ? "border-indigo-600/40 bg-indigo-600/15 text-zinc-50"
            : "border-zinc-800 bg-zinc-950/40 text-zinc-50",
        )}
      >
        <div className="prose prose-invert max-w-none prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:p-4 prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

