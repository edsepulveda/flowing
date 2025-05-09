import type { Node } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, any>;
  [key: string]: any
}

export interface AppNode extends Node {
  data: AppNodeData
}

export enum TaskType {
  BROWSER = "BROWSER",
  PARSE_HTML = "PARSE HTML PAGE"
}


export interface EntryNodeData {
  type: string
  label: string
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>
  category: string
  isEntryPoint: boolean
  [key: string]: any
}

export interface InputsType {
  name: string
  type: string
  label: string
  helperText?: string
  required?: boolean
  hideHandle?: boolean
  value?: string
  [key: string]: any
}