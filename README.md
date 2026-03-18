# Gemini Param Chat (SPA)

SPA React (Vite) con Tailwind (dark mode di default) per interagire con Gemini usando `@google/generative-ai`, con controllo granulare dei parametri di generazione.

## Requisiti

- Node.js LTS (consigliato) + npm

## Setup

1. Crea `frontend/.env.local`:

```bash
VITE_GEMINI_API_KEY=LA_TUA_CHIAVE
```

2. Installa e avvia:

```bash
cd frontend
npm install
npm run dev
```

## Note

- Il parametro **Thinking Level** è applicato come `systemInstruction` (lo SDK `@google/generative-ai` non espone un campo “thinkingLevel” in `generationConfig`).

