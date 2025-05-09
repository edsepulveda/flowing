export interface WorkflowsDTO {
  name: string;
  description?: string;
  metadata?: string;
}

export interface UpdateWorkflowDTO extends WorkflowsDTO {
  id: string;
}

export interface WorkflowItemData {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metadata?: string;
}

export interface WorkflowsResponse {
  totalItems: number;
  items: Workflow[];
  page: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface WorkflowFilter {
  search?: string;
  status?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface WorkflowListParams {
  page?: number;
  size?: number;
  filter?: WorkflowFilter;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedWorkflows {
  totalItems: number;
  items: Workflow[];
  page: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
