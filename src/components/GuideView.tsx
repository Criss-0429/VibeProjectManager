import React from 'react';
import { BookOpen, Key, Link2, Download, TerminalSquare } from 'lucide-react';

export const GuideView: React.FC = () => {
  return (
    <div className="p-10 lg:p-16 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-16 border-b border-[var(--border-color)] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-color)]">System Documentation</div>
      </div>

      <header className="mb-20">
        <h1 className="font-serif text-5xl lg:text-7xl leading-none tracking-tight mb-4">
          VMS <span className="italic font-light text-[var(--text-secondary)] ml-2">Overview</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-serif italic text-lg opacity-80 max-w-2xl leading-relaxed">
          Vibe Management Software is a local-first, event-driven personal AI project manager. 
          It leverages an Obsidian Vault as the Single Source of Truth, augmented by AI intention routing.
        </p>
      </header>

      <div className="space-y-20">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl">Quick Setup</h2>
            <div className="h-[2px] bg-[var(--text-primary)] w-12 mt-4 mb-6"></div>
            <p className="text-sm text-[var(--text-secondary)] italic font-serif leading-relaxed">
              Follow these steps to initialize the kernel and mount your local vault for local-first operations.
            </p>
          </div>
          <div className="md:col-span-2 space-y-8">
            <div className="flex gap-6 border-b border-[var(--border-color)] pb-8 relative group">
              <span className="font-serif text-4xl text-[var(--text-secondary)] opacity-10 group-hover:text-[var(--accent-color)] group-hover:opacity-40 transition-colors">01</span>
              <div>
                <h3 className="font-bold uppercase tracking-[0.15em] text-xs mb-3 text-[var(--text-primary)]">Configure Vault Path</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-serif">
                  Set the environment variable <code className="font-mono bg-black/5 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap text-[var(--text-primary)]">VMS_VAULT_PATH</code> to point to your local Obsidian directory.
                  The system requires <code className="font-mono bg-black/5 px-1.5 py-0.5 rounded text-[10px] text-[var(--text-primary)]">/Inbox/</code>, <code className="font-mono bg-black/5 px-1.5 py-0.5 rounded text-[10px] text-[var(--text-primary)]">/Projects/</code>, and <code className="font-mono bg-black/5 px-1.5 py-0.5 rounded text-[10px] text-[var(--text-primary)]">/Daily/</code> to exist.
                </p>
              </div>
            </div>
            <div className="flex gap-6 border-b border-[var(--border-color)] pb-8 relative group">
              <span className="font-serif text-4xl text-[var(--text-secondary)] opacity-10 group-hover:text-[var(--accent-color)] group-hover:opacity-40 transition-colors">02</span>
              <div>
                <h3 className="font-bold uppercase tracking-[0.15em] text-xs mb-3 text-[var(--text-primary)]">Connect Telegram</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-serif">
                  Expose your local port via Cloudflare Tunnels or ngrok. Update your Telegram Bot Webhook to point to the ingestion route at <code className="font-mono bg-black/5 px-1.5 py-0.5 rounded text-[10px] text-[var(--text-primary)]">/webhook/telegram</code>.
                </p>
              </div>
            </div>
            <div className="flex gap-6 border-b border-[var(--border-color)] pb-8 relative group">
              <span className="font-serif text-4xl text-[var(--text-secondary)] opacity-10 group-hover:text-[var(--accent-color)] group-hover:opacity-40 transition-colors">03</span>
              <div>
                <h3 className="font-bold uppercase tracking-[0.15em] text-xs mb-3 text-[var(--text-primary)]">LLM Provisioning</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-serif">
                  Ensure the AI model keys are defined in your secure configuration. It powers the semantic intent routing middleware for inbound events.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl">System Utils</h2>
            <div className="h-[2px] bg-[var(--text-primary)] w-12 mt-4 mb-6"></div>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors group cursor-pointer bg-white">
              <Key className="w-5 h-5 mb-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] stroke-[1.5] transition-colors" />
              <h4 className="font-bold uppercase tracking-wider text-xs mb-2">Generate API Key</h4>
              <p className="text-xs text-[var(--text-secondary)] font-serif italic leading-relaxed">Create a local access token for external script integrations.</p>
            </div>
            <div className="p-8 border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors group cursor-pointer bg-white">
              <Download className="w-5 h-5 mb-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] stroke-[1.5] transition-colors" />
              <h4 className="font-bold uppercase tracking-wider text-xs mb-2">Export State</h4>
              <p className="text-xs text-[var(--text-secondary)] font-serif italic leading-relaxed">Download a snapshot of the SQLite cache and dead letter queue.</p>
            </div>
            <div className="p-8 border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors group cursor-pointer bg-white">
              <Link2 className="w-5 h-5 mb-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] stroke-[1.5] transition-colors" />
              <h4 className="font-bold uppercase tracking-wider text-xs mb-2">Ingestion Links</h4>
              <p className="text-xs text-[var(--text-secondary)] font-serif italic leading-relaxed">Manage active external webhooks directly routed to the kernel.</p>
            </div>
            <div className="p-8 border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors group cursor-pointer bg-white">
              <TerminalSquare className="w-5 h-5 mb-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] stroke-[1.5] transition-colors" />
              <h4 className="font-bold uppercase tracking-wider text-xs mb-2">Test Environment</h4>
              <p className="text-xs text-[var(--text-secondary)] font-serif italic leading-relaxed">Verify structural integrity of markdown parsing locally.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
