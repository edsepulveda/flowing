import { TaskType, type EntryNodeData } from "@/types/node";
import { Code2 } from "lucide-react";

export const BrowserEntryTask: EntryNodeData = {
  type: TaskType.BROWSER,
  label: "Launch Browser",
  icon: Code2,
  description: "Launch a browser and navigate to a URL",
  isEntryPoint: true,
  inputs: [
    {
      name: "url",
      type: "string",
      label: "URL",
      helperText: "The URL to navigate to",
      required: true,
      hideHandle: true,
    },
  ],
};
