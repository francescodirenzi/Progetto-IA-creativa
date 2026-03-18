import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerationParams } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

export function assertApiKey() {
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY. Create frontend/.env.local with VITE_GEMINI_API_KEY=YOUR_KEY",
    );
  }
}

export function getModel() {
  assertApiKey();
  const genAI = new GoogleGenerativeAI(apiKey!);
  // Model name can be adjusted if needed.
  return genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });
}

export function getModelWithSystemInstruction(systemInstruction: string) {
  assertApiKey();
  const genAI = new GoogleGenerativeAI(apiKey!);
  return genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction,
  });
}

export function buildGenerationConfig(params: GenerationParams) {
  return {
    temperature: params.temperature,
    topP: params.topP,
    topK: params.topK,
    maxOutputTokens: params.maxOutputTokens,
  };
}

export function buildThinkingInstruction(thinkingLevel: number) {
  // @google/generative-ai doesn't expose an official thinkingLevel field.
  // This instruction approximates the requested control while preserving SDK compatibility.
  const level = Math.min(5, Math.max(1, Math.round(thinkingLevel)));
  return [
    "Thinking Level:",
    `${level}/5.`,
    "Use a proportionate amount of internal reasoning before answering.",
    "Do not reveal chain-of-thought. Provide only the final answer.",
  ].join(" ");
}

