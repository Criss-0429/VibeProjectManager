import React from 'react';
import { useVMS } from '../lib/store';
import { Activity, CheckCircle2, Circle, GitCommit } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export const DashboardView: React.FC = () => {
  const { tasks, events, toggleTask } = useVMS();
  
  const pendingTasks = tasks.filter(t => !t.completed);
  const recentEvents = events.slice(0, 5);

  return (
    <div className="h-full flex flex-col xl:flex-row">
      <div className="flex-1 p-10 xl:p-16 max-w-5xl mx-auto xl:mx-0 w-full relative">
        <div className="flex justify-between items-center mb-16 border-b border-[var(--border-color)] pb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-color)]">Strategic Overview</div>
          <div className="text-xs font-medium text-[var(--text-secondary)]">
            {format(new Date(), 'EEEE, do MMMM')}
          </div>
        </div>

        <h1 className="font-serif text-[clamp(4rem,8vw,6rem)] leading-[0.85] tracking-tight mb-20 text-[var(--text-primary)]">
          <span className="block">Morning</span>
          <span className="block italic font-light text-[var(--text-secondary)] transform translate-x-4 md:translate-x-12">Readout</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          <section className="border-t border-[var(--text-primary)] pt-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-color)]">Open Tasks</h2>
              <span className="font-serif text-3xl leading-none">
                {pendingTasks.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingTasks.map(task => (
                <div key={task.id} className="flex items-start gap-4 group cursor-pointer border-b border-black/5 pb-4 last:border-0" onClick={() => toggleTask(task.id)}>
                  <button className="mt-0.5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    <Circle className="w-[18px] h-[18px] stroke-[1.5]" />
                  </button>
                  <div>
                    <p className="text-sm font-medium leading-relaxed">{task.text}</p>
                    {task.project_id && (
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold mt-2">
                        {task.project_id}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {pendingTasks.length === 0 && (
                <p className="text-sm text-[var(--text-secondary)] italic font-serif">All caught up.</p>
              )}
            </div>
          </section>

          <section className="border-t border-[var(--text-primary)] pt-4">
             <div className="flex items-center justify-between mb-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-color)]">AI Summary</h2>
             </div>
             <p className="text-sm text-[var(--text-secondary)] leading-[1.8] font-serif italic text-lg">
               "Good morning. You have completed the FastAPI routing layer for Alpha Core. 
               Your main focus today should be implementing the AI Intent Extraction middleware. 
               No critical system alerts."
             </p>
          </section>
        </div>
      </div>

      <aside className="xl:w-[380px] shrink-0 bg-[var(--dark-panel-bg)] text-[var(--dark-panel-text)] p-10 xl:p-12 flex flex-col min-h-[500px] xl:min-h-screen">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-full text-[10px] uppercase font-bold tracking-widest text-white/80 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]"></span> Activity Stream
          </div>
          <h2 className="font-serif text-3xl leading-tight">Recent<br/>System Events</h2>
        </div>
        
        <div className="space-y-6 flex-1">
          {recentEvents.map((ev, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-5 font-sans relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-all duration-700 group-hover:scale-150 group-hover:opacity-10 group-hover:rotate-12">
                <Activity className="w-24 h-24 stroke-1 absolute -right-4 -top-4" />
              </div>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">{ev.source}</span>
                <span className="text-[10px] opacity-40 font-mono">{format(new Date(ev.timestamp), 'HH:mm')}</span>
              </div>
              <div className="w-full h-px bg-white/10 mb-4 relative z-10">
                 <div className="h-full bg-[var(--accent-color)] w-[15%]"></div>
              </div>
              <p className="text-xs leading-relaxed text-white/80 italic font-serif relative z-10">
                {ev.raw_content}
              </p>
            </div>
          ))}
        </div>
        
        <button className="mt-12 bg-white text-black py-4 px-6 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--accent-color)] hover:text-white transition-colors w-full">
          Export Full Log
        </button>
      </aside>
    </div>
  );
};
