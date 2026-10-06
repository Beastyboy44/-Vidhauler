export interface ExtensionFile {
  name: string;
  path: string;
  language: 'json' | 'javascript' | 'html' | 'css';
  content: string;
  description: string;
}

export interface ExtensionProject {
  id: string;
  name: string;
  shortName: string;
  version: string;
  description: string;
  category: string;
  permissions: string[];
  hostPermissions: string[];
  files: Record<string, ExtensionFile>;
  activeFile: string;
}

export interface MockWebpage {
  id: string;
  url: string;
  title: string;
  favicon: string;
  category: string;
  content: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    author?: string;
    date?: string;
    tags?: string[];
  };
}

export interface ExtensionLog {
  id: string;
  timestamp: string;
  source: 'background' | 'content' | 'popup' | 'storage';
  type: 'info' | 'message' | 'api' | 'warning' | 'storage';
  message: string;
  payload?: any;
}
