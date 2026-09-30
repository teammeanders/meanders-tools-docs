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
  settings: unknown[];
  errors: string[];
  examples: unknown[];
  notes: string[];
  related: string[];
}

export interface ComponentsData {
  components: MeandersComponent[];
}
