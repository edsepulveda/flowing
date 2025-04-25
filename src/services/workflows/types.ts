export interface WorkflowsDTO {
  name: string
  description?: string
}

export interface UpdateWorkflowDTO extends WorkflowsDTO {
  id: string
}

export interface WorkflowsResponse {
  id: string
  name: string
  description: string | null;
  isDraft: boolean
  createdAt: string
  updatedAt: string
}