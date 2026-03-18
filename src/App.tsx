import { useState } from "react";
import type { GenerationParams } from "./types";
import { Sidebar } from "./components/Sidebar";
import { Chat } from "./components/Chat";

const DEFAULT_PARAMS: GenerationParams = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  thinkingLevel: 1,
};

export default function App() {
  const [params, setParams] = useState<GenerationParams>(DEFAULT_PARAMS);

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <div className="flex h-full">
        <Sidebar params={params} onChange={setParams} />
        <Chat params={params} />
      </div>
    </div>
  );
}

