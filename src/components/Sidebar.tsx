import type { GenerationParams } from "../types";
import { ParamSlider } from "./ParamSlider";

type Props = {
  params: GenerationParams;
  onChange: (next: GenerationParams) => void;
};

export function Sidebar({ params, onChange }: Props) {
  return (
    <aside className="w-[360px] shrink-0 border-r border-zinc-800 bg-zinc-950/60">
      <div className="sticky top-0 max-h-screen overflow-y-auto p-5">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-zinc-50">
            Parametri di generazione
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            Controllo granulare dei parametri inviati a Gemini.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <ParamSlider
            label="Temperature"
            description="Regola il bilanciamento tra determinismo e creatività nella generazione del testo. A valori bassi (0.1 - 0.4), il sistema seleziona sistematicamente i termini più probabili, garantendo risposte precise. A valori elevati (1.0 - 2.0), aumenta la variabilità lessicale e l'astrazione."
            value={params.temperature}
            min={0.0}
            max={2.0}
            step={0.1}
            onChange={(temperature) => onChange({ ...params, temperature })}
            format={(n) => n.toFixed(1)}
          />

          <ParamSlider
            label="Top-P"
            description='Seleziona un sottoinsieme di termini la cui somma di probabilità (probabilità cumulata) raggiunge la soglia stabilita. Il sistema ordina i termini per probabilità e li somma progressivamente; la selezione avviene solo tra i termini nel "paniere" creato fino al raggiungimento del valore P.'
            value={params.topP}
            min={0.0}
            max={1.0}
            step={0.05}
            onChange={(topP) => onChange({ ...params, topP })}
            format={(n) => n.toFixed(2)}
          />

          <ParamSlider
            label="Top-K"
            description="Limita la scelta ai primi K termini più probabili nella classifica dei punteggi. È un limite numerico statico che impedisce al modello di scegliere termini totalmente fuori contesto, agendo come rete di sicurezza per generazioni ad alta temperatura."
            value={params.topK}
            min={1}
            max={40}
            step={1}
            onChange={(topK) => onChange({ ...params, topK })}
            format={(n) => String(Math.round(n))}
          />

          <ParamSlider
            label="Max Output Tokens"
            description="Definisce il numero massimo di unità testuali (token) generabili in una singola risposta. Un limite basso previene risposte eccessivamente lunghe; se troppo basso, la risposta potrebbe interrompersi prima della conclusione logica."
            value={params.maxOutputTokens}
            min={1}
            max={8192}
            step={128}
            onChange={(maxOutputTokens) =>
              onChange({ ...params, maxOutputTokens })
            }
            format={(n) => String(Math.round(n))}
          />

          <ParamSlider
            label="Thinking Level"
            description={"Regola l'estensione del processo di elaborazione logica (Chain of Thought) prima della risposta finale. Funziona come uno spazio di \"bozza mentale\". Livelli alti permettono di scomporre problemi complessi e verificare la coerenza prima della scrittura definitiva."}
            value={params.thinkingLevel}
            min={1}
            max={5}
            step={1}
            onChange={(thinkingLevel) => onChange({ ...params, thinkingLevel })}
            format={(n) => String(Math.round(n))}
          />
        </div>
      </div>
    </aside>
  );
}

