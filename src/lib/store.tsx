import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, SVEvent, VaultTask } from './types';

interface VMSState {
  projects: Project[];
  events: SVEvent[];
  tasks: VaultTask[];
  inboxNotes: string[];
  addEvent: (event: SVEvent) => void;
  addTask: (task: VaultTask) => void;
  toggleTask: (id: string) => void;
  addNote: (note: string) => void;
}

const defaultState: VMSState = {
  projects: [
    {
      vms_id: 'alpha-core',
      name: 'Alpha Core',
      status: 'in_progress',
      git_repos: ['github.com/user/alpha-core'],
      drive_folders: ['folder-id-123'],
      aliases: ['alpha', 'core project']
    },
    {
      vms_id: 'beta-ui',
      name: 'Beta Frontend',
      status: 'in_progress',
      git_repos: ['github.com/user/beta-ui'],
      drive_folders: [],
      aliases: ['beta']
    }
  ],
  events: [
    {
      timestamp: new Date().toISOString(),
      source: 'system',
      payload_type: 'code_update',
      raw_content: 'System initialized and Obsidian Vault mounted.',
      author: 'VMS Kernel'
    }
  ],
  tasks: [
    {
      id: '1',
      project_id: 'alpha-core',
      text: 'Setup FastAPI routing layer',
      completed: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '2',
      project_id: 'alpha-core',
      text: 'Implement AI Intent Extraction middleware',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ],
  inboxNotes: [
    'Remember to check the webhook timeout settings on Cloudflare.'
  ],
  addEvent: () => {},
  addTask: () => {},
  toggleTask: () => {},
  addNote: () => {}
};

const VMSContext = createContext<VMSState>(defaultState);

export const VMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects] = useState<Project[]>(defaultState.projects);
  const [events, setEvents] = useState<SVEvent[]>(defaultState.events);
  const [tasks, setTasks] = useState<VaultTask[]>(defaultState.tasks);
  const [inboxNotes, setInboxNotes] = useState<string[]>(defaultState.inboxNotes);

  const addEvent = (event: SVEvent) => setEvents(prev => [event, ...prev]);
  const addTask = (task: VaultTask) => setTasks(prev => [task, ...prev]);
  const toggleTask = (id: string) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const addNote = (note: string) => setInboxNotes(prev => [note, ...prev]);

  return (
    <VMSContext.Provider value={{ projects, events, tasks, inboxNotes, addEvent, addTask, toggleTask, addNote }}>
      {children}
    </VMSContext.Provider>
  );
};

export const useVMS = () => useContext(VMSContext);
