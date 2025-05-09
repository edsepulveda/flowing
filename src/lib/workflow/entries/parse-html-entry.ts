import { TaskType, type EntryNodeData } from "@/types/node";
import { Globe2 } from "lucide-react";

export const ParseHTMLEntry: EntryNodeData = {
  type: TaskType.PARSE_HTML,
  label: "Parse HTML",
  icon: Globe2,
  category: "Data Extraction",
  description: "Parse the HTML of the url provided",
  isEntryPoint: false,
  inputs: [
    {
      name: "url",
      type: "boolean",
      label: "URL",
      required: true,
      hideHandle: false,
    },
  ],
};
