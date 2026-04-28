export type ProjectStatus = 'in_progress' | 'paused' | 'completed';

export interface Project {
  vms_id: string;
  name: string;
  status: ProjectStatus;
  git_repos: string[];
  drive_folders: string[];
  aliases: string[];
}

export interface SVEvent {
  timestamp: string;
  source: 'git' | 'telegram_text' | 'telegram_audio' | 'drive' | 'system';
  payload_type: 'code_update' | 'doc_update' | 'user_intent';
  raw_content: string;
  project_id?: string;
  author: string;
}

export interface ActionIntent {
  intent: 'CREATE_TASK' | 'COMPLETE_TASK' | 'ADD_NOTE' | 'READOUT_REQUEST' | 'UNKNOWN';
  target_project_slug?: string;
  extracted_text: string;
  confidence_score: number;
}

export interface VaultTask {
  id: string;
  project_id?: string;
  text: string;
  completed: boolean;
  createdAt: string;
}
