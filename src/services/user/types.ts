

//You'll to parse the date usign new Date().toISOString() or with date-fns
export interface UsersResponse {
  id: string
  name: string
  lastName: string
  fullName: string
  email: string
  accountType: string
  isActive: boolean
  isEmailVerified: boolean;
  lastLoginAt: string // Not an actual Date, is send as '2023-01-01T00:00:00Z'
  createdAt: string 
  updatedAt: string
}