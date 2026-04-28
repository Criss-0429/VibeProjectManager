import React from 'react';
import { useVMS } from '../lib/store';
import { SVEvent } from '../lib/types';
import { Webhook, Github, Send } from 'lucide-react';

export const WebhooksView: React.FC = () => {
  const { addEvent } = useVMS();

  const simulateGitPush = () => {
    const ev: SVEvent = {
        timestamp: new Date().toISOString(),
        source: 'git',
        payload_type: 'code_update',
        author: 'developer@github',
        raw_content: 'feat(api): Add webhook handler for telegram bots'
    };
    addEvent(ev);
  };

  const simulateTelegramAudio = () => {
    const ev: SVEvent = {
        timestamp: new Date().toISOString(),
        source: 'telegram_audio',
        payload_type: 'user_intent',
        author: 'UserAudio',
        raw_content: 'Transcription via Whisper: "Hey add a note to start migrating the database to sqlite next week"'
    };
    addEvent(ev);
  };

  return (
    <div className="p-10 lg:p-16 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      <header className="mb-20 text-center flex flex-col items-center">
        <div className="mb-8 p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
            <Webhook className="w-8 h-8 text-[var(--accent-color)] stroke-[1] hidden md:block" />
            <Webhook className="w-8 h-8 text-[var(--accent-color)] stroke-[1] md:hidden" />
        </div>
        <h1 className="font-serif text-5xl leading-tight mb-6">Ingestion Simulator</h1>
        <p className="text-[var(--text-secondary)] font-serif italic text-lg max-w-md mx-auto">
          Fire test payloads to simulate pipeline logic and intention routing.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent pointer-events-none z-0 scale-y-150 transform translate-y-12"></div>
        <button 
          onClick={simulateGitPush}
          className="relative z-10 flex flex-col justify-between bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--accent-color)] p-10 transition-all duration-500 group shadow-sm hover:shadow-[0_16px_40px_rgba(142,121,62,0.1)] group"
        >
          <div className="flex justify-between w-full mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] transition-colors">Action</span>
            <Github className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] transition-colors stroke-[1.5]" />
          </div>
          <div className="text-left w-full">
            <h3 className="font-serif text-2xl mb-3 group-hover:text-[var(--accent-color)] transition-colors">Simulate Git Push</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary)] p-2 bg-black/5 inline-block rounded">POST /webhook/github</p>
          </div>
        </button>

        <button 
          onClick={simulateTelegramAudio}
          className="relative z-10 flex flex-col justify-between bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[#3B82F6] p-10 transition-all duration-500 group shadow-sm hover:shadow-[0_16px_40px_rgba(59,130,246,0.1)] group"
        >
          <div className="flex justify-between w-full mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] group-hover:text-[#3B82F6] transition-colors">Action</span>
            <Send className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[#3B82F6] transition-colors stroke-[1.5]" />
          </div>
          <div className="text-left w-full">
            <h3 className="font-serif text-2xl mb-3 group-hover:text-[#3B82F6] transition-colors">Simulate Voice</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary)] p-2 bg-black/5 inline-block rounded">POST /webhook/telegram</p>
          </div>
        </button>
      </div>

    </div>
  );
};
