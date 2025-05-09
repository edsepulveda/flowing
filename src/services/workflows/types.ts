export interface WorkflowsDTO {
  name: string
  description?: string
  metadata?: string
}

export interface UpdateWorkflowDTO extends WorkflowsDTO {
  id: string
}

export interface WorkflowItemData {
  id: string
  name: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  metadata?: string
}


export interface WorkflowsResponse {
  totalItems: number
  items: WorkflowItemData[]
  page: number
  size: number
}