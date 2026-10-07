export type PortAccess = "item" | "list" | "tree";

export interface Port {
  name: string;
  nickname: string;
  type: string;
  access: PortAccess;
  optional?: boolean;
  description: string;
}

export interface ComponentDescription {
  short: string;
  long: string;
}

export interface ComponentSetting {
  name: string;
  type: string;
  persistent?: boolean;
  options?: string[];
}

export interface ComponentExample {
  title: string;
  description: string;
  input?: unknown;
  output?: unknown;
}

export interface MeandersComponent {
  id: string;
  guid: string;
  name: string;
  nickname: string;
  category: string;
  subcategory: string;
  status: string;
  introducedIn: string;
  description: ComponentDescription;
  icon: string;
  inputs: Port[];
  outputs: Port[];
  settings: ComponentSetting[];
  errors: string[];
  examples: ComponentExample[];
  notes: string[];
  related: string[];
}

export interface MeandersParameter {
  id: string;
  guid: string;
  name: string;
  nickname: string;
  category: string;
  subcategory: string;
  status: string;
  introducedIn: string;
  description: ComponentDescription;
  icon: string;
  access: PortAccess;
  type: string;
  settings: ComponentSetting[];
  examples: ComponentExample[];
  notes: string[];
  related: string[];
}

export interface ComponentsData {
  $schema?: string;
  _generated?: boolean;
  _generatedAt?: string;

  components: MeandersComponent[];
  parameters: MeandersParameter[];
}
