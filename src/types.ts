export type Role = "user" | "model";

export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

export type GenerationParams = {
  temperature: number; // 0..2
  topP: number; // 0..1
  topK: number; // 1..40
  maxOutputTokens: number; // 1..8192
  thinkingLevel: number; // 1..5 (prompt-level control for @google/generative-ai)
};

