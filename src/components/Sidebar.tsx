import React from 'react';
import { LayoutDashboard, Inbox, FolderKanban, TerminalSquare, Settings, Workflow, BookOpen, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const items = [
    { id: 'guide', label: 'Overview & Setup', icon: BookOpen },
    { id: 'dashboard', label: 'Vibe Check', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'daily', label: 'Daily Logs', icon: TerminalSquare },
    { id: 'webhooks', label: 'Ingestion Simulator', icon: Workflow },
    { id: 'backend', label: 'Local Backend', icon: Code2 },
    { id: 'settings', label: 'System', icon: Settings },
  ];

  return (
    <aside className="w-[320px] bg-[var(--card-bg)] border-r border-[var(--border-color)] h-screen flex flex-col shrink-0 relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-10 pb-6">
        <div className="flex flex-col mb-16 gap-2">
           <div className="font-serif text-3xl font-bold tracking-tight text-[var(--accent-color)] leading-none">
             A.
           </div>
           <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--text-secondary)] mt-1 ml-0.5">
             Volume 04
           </p>
        </div>
        
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded text-sm font-medium transition-all duration-300",
                  active 
                    ? "bg-black/5 text-[var(--text-primary)]" 
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/[0.02]"
                )}
              >
                <Icon className={cn("w-[18px] h-[18px] stroke-[1.5]", active ? "text-[var(--accent-color)]" : "")} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-10 pt-6">
        <div className="border-t border-[var(--border-color)] pt-8 space-y-4">
          <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)]">
            <span className="w-1.5 h-1.5 bg-[var(--accent-color)] rounded-full animate-pulse shadow-[0_0_8px_var(--accent-glow)]"></span>
            System Live
          </div>
          <div className="text-xs text-[var(--text-secondary)] font-serif italic">
            Obsidian Vault Mounted
          </div>
        </div>
      </div>
    </aside>
  );
};
