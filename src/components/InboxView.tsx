import React, { useState } from 'react';
import { useVMS } from '../lib/store';
import { Bot, Send, Sparkles } from 'lucide-react';
import { extractIntent } from '../services/aiService';

export const InboxView: React.FC = () => {
  const { inboxNotes, addNote, addTask, addEvent } = useVMS();
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    const text = input;
    setInput('');
    
    // Attempt AI routing
    try {
      const intent = await extractIntent(text);
      
      addEvent({
        timestamp: new Date().toISOString(),
        source: 'telegram_text',
        payload_type: 'user_intent',
        author: 'User',
        raw_content: `Processed intent: ${intent.intent} (${Math.round(intent.confidence_score * 100)}% conf)`
      });

      if (intent.intent === 'CREATE_TASK' && intent.extracted_text) {
        addTask({
          id: Math.random().toString(36).substring(7),
          text: intent.extracted_text,
          completed: false,
          project_id: intent.target_project_slug,
          createdAt: new Date().toISOString()
        });
      } else {
        addNote(text);
      }
    } catch (error) {
      console.error(error);
      addNote(text); // fallback
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-10 lg:p-16 max-w-4xl max-w-[800px] mx-auto min-h-screen flex flex-col relative z-10 bg-[var(--card-bg)] border-r border-[var(--border-color)]">
        <header className="mb-16">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-color)] mb-6">Brain Dump</div>
          <h1 className="font-serif text-5xl leading-tight mb-4">Inbox & Routing</h1>
          <p className="text-[var(--text-secondary)] font-serif italic text-lg opacity-80">
            Uncategorized thoughts routing directly to the LLM agent.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mb-16 group">
          <div className="flex items-center border-b-[2px] border-black/10 pb-4 relative transition-colors duration-500 focus-within:border-[var(--accent-color)]">
            <div className="mr-6 text-[var(--accent-color)]">
              {isProcessing ? <Sparkles className="w-6 h-6 animate-pulse" strokeWidth={1} /> : <Bot className="w-6 h-6" strokeWidth={1} />}
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isProcessing}
              placeholder="Capture a thought..."
              className="flex-1 bg-transparent border-none text-2xl font-serif text-[var(--text-primary)] focus:outline-none focus:ring-0 disabled:opacity-50 placeholder:italic"
            />
            <button 
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="ml-4 text-[var(--text-primary)] hover:text-[var(--accent-color)] disabled:opacity-30 transition-colors"
            >
              <Send className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </form>

        <div className="flex-1 overflow-y-auto pr-4 mb-10 pb-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-8">Unprocessed Notes</h3>
          <div className="space-y-6 container mx-auto">
            {inboxNotes.length === 0 ? (
              <div className="py-16 text-[var(--text-secondary)] italic font-serif">
                Nothing pending.
              </div>
            ) : (
              inboxNotes.map((note, i) => (
                <div key={i} className="pl-6 border-l-[2px] border-black/5 text-lg font-serif">
                  <p className="leading-[1.8] text-[var(--text-primary)]">{note}</p>
                </div>
              ))
            )}
           </div>
        </div>
      </div>
      <div className="hidden lg:block flex-1 bg-[var(--bg-color)]">
        {/* Empty background space to right to keep column narrow but centered correctly */}
      </div>
    </div>
  );
};
