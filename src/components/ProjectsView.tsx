import React from 'react';
import { useVMS } from '../lib/store';
import { FolderGit2, Github, HardDrive } from 'lucide-react';
import { cn } from '../lib/utils';

export const ProjectsView: React.FC = () => {
  const { projects } = useVMS();

  return (
    <div className="p-10 lg:p-16 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-16 border-b border-[var(--border-color)] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-color)]">Vault Overview</div>
      </div>

      <header className="mb-20">
        <h1 className="font-serif text-5xl lg:text-7xl leading-none tracking-tight mb-4">
          Active <span className="italic font-light text-[var(--text-secondary)] ml-2">Projects</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-serif italic text-lg opacity-80 max-w-xl">
          Tracked directories representing current efforts and system state components.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map(p => (
          <div key={p.vms_id} className="group relative pt-4 border-t border-[var(--text-primary)] hover:pt-3 hover:-translate-y-1 transition-all duration-300">
            
            <div className={cn(
              "absolute top-0 left-0 w-full h-[2px] transition-all duration-300 origin-left", 
              p.status === 'in_progress' ? 'bg-[var(--accent-color)] scale-x-100' : 'bg-transparent scale-x-0'
            )} />

            <div className="flex flex-col mb-8">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--text-secondary)] mb-4">{p.vms_id}</span>
              <h2 className="font-serif text-3xl leading-snug tracking-tight group-hover:text-[var(--accent-color)] transition-colors">{p.name}</h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 rounded-full">
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  p.status === 'in_progress' ? "bg-[var(--accent-color)]" : "bg-black/20"
                )} />
                <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-[var(--text-primary)]">{p.status.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-color)] space-y-4">
              {p.git_repos.length > 0 && (
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Github className="w-4 h-4 stroke-[1.5]" />
                  <span className="truncate">{p.git_repos[0]}</span>
                </div>
              )}
              {p.drive_folders.length > 0 && (
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <HardDrive className="w-4 h-4 stroke-[1.5]" />
                  <span className="truncate">{p.drive_folders[0]}</span>
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};
