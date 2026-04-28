import React from 'react';
import { useVMS } from '../lib/store';
import { Terminal } from 'lucide-react';
import { format } from 'date-fns';

export const DailyLogsView: React.FC = () => {
  const { events } = useVMS();

  return (
    <div className="p-10 lg:p-16 max-w-6xl mx-auto h-full flex flex-col">
      <header className="mb-12">
        <h1 className="font-serif text-4xl lg:text-5xl tracking-tight mb-4 text-[var(--text-primary)]">System Logs</h1>
        <p className="text-[var(--text-secondary)] font-serif italic text-lg opacity-80">
          Raw event stream and telemetry from VMS nodes.
        </p>
      </header>

      <div className="flex-1 bg-[var(--card-bg)] border border-black/5 shadow-sm p-4 md:p-8 overflow-y-auto font-mono text-xs relative">
        <div className="sticky top-0 left-0 bg-[var(--card-bg)]/90 backdrop-blur pb-6 border-b border-[var(--border-color)] mb-8 flex items-center justify-between z-10 pt-2">
          <div className="flex items-center gap-3 text-[var(--text-primary)]">
            <Terminal className="w-4 h-4 text-[var(--accent-color)]" />
            <span className="font-semibold uppercase tracking-widest text-[10px]">/var/log/vms/system.log</span>
          </div>
        </div>
        
        <div className="space-y-[1px]">
          {events.length === 0 ? (
            <p className="text-[var(--text-secondary)] italic font-serif">No events captured today.</p>
          ) : (
            events.map((ev, i) => (
              <div key={i} className="group hover:bg-black/5 px-4 py-2 -mx-4 transition-colors flex flex-col md:flex-row md:items-start gap-2 md:gap-6 border-b border-black/[0.02]">
                <span className="text-[var(--text-secondary)] shrink-0 w-[140px]">
                  {format(new Date(ev.timestamp), 'yyyy/MM/dd HH:mm')}
                </span>
                <span className="text-[var(--accent-color)] shrink-0 w-24">({ev.source})</span>
                <span className="text-black/40 shrink-0 w-32 uppercase tracking-wide">[{ev.payload_type}]</span>
                <span className="text-[var(--text-primary)] break-words flex-1 leading-relaxed">
                  {ev.raw_content}
                </span>
                <span className="text-[var(--text-secondary)] shrink-0 opacity-50 block md:hidden lg:block w-24 text-right overflow-hidden text-ellipsis whitespace-nowrap">
                  {ev.author}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
