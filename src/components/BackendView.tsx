import React, { useState } from 'react';
import { Terminal, Copy, CheckCircle2, Download } from 'lucide-react';

const pythonCodeMain = `from fastapi import FastAPI, Request, BackgroundTasks
import sqlite3
import os
from datetime import datetime
from ai_service import extract_intent
from vault_manager import append_to_inbox, add_task_to_project

app = FastAPI()
VAULT_PATH = os.getenv("VMS_VAULT_PATH", "./Vault")

# Assicurati che le cartelle esistano
os.makedirs(f"{VAULT_PATH}/Inbox", exist_ok=True)
os.makedirs(f"{VAULT_PATH}/Projects", exist_ok=True)
os.makedirs(f"{VAULT_PATH}/Daily", exist_ok=True)

@app.post("/webhook/telegram")
async def telegram_webhook(request: Request, background_tasks: BackgroundTasks):
    payload = await request.json()
    
    # Ritorna subito 200 a Telegram per evitare timeout
    if "message" in payload and "text" in payload["message"]:
        text = payload["message"]["text"]
        background_tasks.add_task(process_message, text)
        
    return {"status": "ok"}

def process_message(text: str):
    # Processa con Gemini API (o Ollama)
    intent = extract_intent(text)
    
    if intent.intent == "CREATE_TASK":
        add_task_to_project(intent.target_project_slug, intent.extracted_text)
    else:
        append_to_inbox(intent.extracted_text)
`;

const pythonCodeAI = `import os
from pydantic import BaseModel
from typing import Literal, Optional

# SE USI GEMINI API (Consigliato per JSON strutturati perfetti)
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

class ActionIntent(BaseModel):
    intent: Literal["CREATE_TASK", "COMPLETE_TASK", "ADD_NOTE", "READOUT_REQUEST", "UNKNOWN"]
    target_project_slug: Optional[str]
    extracted_text: str
    confidence_score: float

def extract_intent(text: str) -> ActionIntent:
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=f"Estrai l'intento dal seguente testo secondo lo schema JSON. Testo: {text}",
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ActionIntent,
        ),
    )
    return ActionIntent.model_validate_json(response.text)

# ALTERNATIVA LOCALE (Ollama 4B)
# import requests
# def extract_intent_ollama(text: str) -> ActionIntent:
#     # Implementazione chiamata a localhost:11434/api/generate
#     pass
`;

const pythonCodeVault = `import os
from datetime import datetime

VAULT_PATH = os.getenv("VMS_VAULT_PATH", "./Vault")

def append_to_inbox(text: str):
    file_path = f"{VAULT_PATH}/Inbox/Uncategorized.md"
    with open(file_path, "a", encoding="utf-8") as f:
        f.write(f"\\n- {text}")

def add_task_to_project(project_slug: str, task_text: str):
    if not project_slug:
        return append_to_inbox(task_text)
        
    file_path = f"{VAULT_PATH}/Projects/{project_slug}.md"
    # Crea il file base se non esiste
    if not os.path.exists(file_path):
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"---\\r\\nvms_id: {project_slug}\\r\\nstatus: in_progress\\r\\n---\\r\\n# {project_slug.capitalize()}\\r\\n\\r\\n## Tasks\\r\\n")
            
    with open(file_path, "a", encoding="utf-8") as f:
        f.write(f"\\n- [ ] {task_text}")
`;


export const BackendView: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ title, code, id, desc }: { title: string, code: string, id: string, desc: string }) => (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
        <div>
          <h3 className="font-serif text-2xl text-[var(--text-primary)] leading-tight">{title}</h3>
          <p className="text-[var(--text-secondary)] font-serif italic max-w-xl mt-2 leading-relaxed">{desc}</p>
        </div>
        <button 
          onClick={() => copyCode(code, id)}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] hover:border-[var(--accent-color)] text-[10px] uppercase font-bold tracking-[0.2em] transition-colors group bg-white shrink-0"
        >
          {copied === id ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />}
          {copied === id ? 'Copied' : 'Copy Code'}
        </button>
      </div>
      <div className="bg-[#1C1C1C] rounded-lg p-6 overflow-x-auto border border-black/10 shadow-xl">
        <pre className="text-sm font-mono text-gray-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );

  return (
    <div className="p-10 lg:p-16 max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-16 border-b border-[var(--border-color)] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-color)]">Local Backend Server</div>
      </div>

      <header className="mb-20">
        <h1 className="font-serif text-5xl lg:text-7xl leading-none tracking-tight mb-6">
          Local Python <span className="italic font-light text-[var(--text-secondary)] block mt-2">Kernel</span>
        </h1>
        <div className="text-[var(--text-secondary)] font-serif italic text-lg opacity-90 max-w-3xl leading-[1.8] space-y-6">
          <p>
            Per operare rigorosamente in ambito "Local-First" e leggere/scrivere sul tuo <strong>Vault Obsidian</strong>, 
            il Cloud in cui gira questa UI ha bisogno di comunicare con un Kernel Python locale sul tuo PC, 
            oppure questo Kernel Python gestirà direttamente le logiche come backend autonomo.
          </p>
          <p>
            Di seguito i file sorgenti da eseguire sul tuo PC. Inizia con un ambiente Python 3.11+, 
            installa <code className="bg-black/5 px-2 py-1 rounded text-sm text-[var(--text-primary)]">fastapi uvicorn google-genai</code>.
          </p>
        </div>
      </header>

      <section>
        <CodeBlock 
          id="main"
          title="1. main.py (FastAPI Ingestion Layer)" 
          desc="Gestisce i Webhook in ingresso (es. Telegram) e inoltra il lavoro testuale in background per non causare timeout ai bot."
          code={pythonCodeMain} 
        />
        
        <CodeBlock 
          id="ai"
          title="2. ai_service.py (Middleware & Intent)" 
          desc="Utilizza le Gemini API con l'SDK ufficiale e Pydantic per forzare uno schema JSON. 
          Se preferisci Ollama, puoi sostituire la chiamata con lib/requests e puntare a localhost, ma l'API Gemini garantisce una validazione 'Structured Outputs' superiore."
          code={pythonCodeAI} 
        />

        <CodeBlock 
          id="vault"
          title="3. vault_manager.py (Storage Layer)" 
          desc="Interagisce con il file system, gestisce dinamicamente i file markdown inserendo list-items o tasks secondo sintassi Obsidian."
          code={pythonCodeVault} 
        />

        <div className="bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 p-8 mt-12 mb-20 flex gap-6 items-start">
          <Terminal className="w-8 h-8 text-[var(--accent-color)] shrink-0 mt-1" strokeWidth={1} />
          <div>
            <h4 className="font-serif text-2xl text-[var(--text-primary)] mb-4">Start the Server</h4>
            <p className="font-serif italic text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Avvia il server locale sulla porta 8000. Dopodiché usa un tool come <strong>ngrok</strong> 
              o Cloudflare Tunnels per esporre la porta su un indirizzo HTTPS pubblico da agganciare al bot Telegram.
            </p>
            <div className="bg-[#1C1C1C] px-6 py-4 rounded font-mono text-gray-300 text-sm flex justify-between items-center">
              <code>uvicorn main:app --reload</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
