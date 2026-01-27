/**
 * Centralized type definitions for the AOSC CW Website
 * 
 * This file provides clean, developer-friendly type definitions based on
 * the Supabase database schema, along with additional utility types for
 * the application.
 */

import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

// ============================================================================
// Database Table Types
// ============================================================================

/**
 * Project entity representing an open-source GitHub repository
 */
export type Project = Tables<"projects">;

/**
 * Project data for creating a new project
 */
export type ProjectInsert = TablesInsert<"projects">;

/**
 * Project data for updating an existing project
 */
export type ProjectUpdate = TablesUpdate<"projects">;

/**
 * Contribution entity representing a merged pull request
 */
export type Contribution = Tables<"contributions">;

/**
 * Contribution data for creating a new contribution record
 */
export type ContributionInsert = TablesInsert<"contributions">;

/**
 * Contribution data for updating an existing contribution
 */
export type ContributionUpdate = TablesUpdate<"contributions">;

/**
 * User profile entity
 */
export type Profile = Tables<"profiles">;

/**
 * Profile data for creating a new user profile
 */
export type ProfileInsert = TablesInsert<"profiles">;

/**
 * Profile data for updating an existing profile
 */
export type ProfileUpdate = TablesUpdate<"profiles">;

/**
 * Leaderboard entity for time-based competitions
 */
export type Leaderboard = Tables<"leaderboards">;

/**
 * Leaderboard data for creating a new leaderboard
 */
export type LeaderboardInsert = TablesInsert<"leaderboards">;

/**
 * Leaderboard data for updating an existing leaderboard
 */
export type LeaderboardUpdate = TablesUpdate<"leaderboards">;

/**
 * User role assignment entity
 */
export type UserRole = Tables<"user_roles">;

/**
 * User role data for creating a new role assignment
 */
export type UserRoleInsert = TablesInsert<"user_roles">;

/**
 * User role data for updating an existing role assignment
 */
export type UserRoleUpdate = TablesUpdate<"user_roles">;

// ============================================================================
// Extended/Joined Types
// ============================================================================

/**
 * Contribution with related project information
 */
export interface ContributionWithProject extends Contribution {
  projects?: {
    github_repo: string;
    github_owner: string;
    github_repo_url?: string;
    description?: string | null;
  } | null;
}

/**
 * Project with contribution count
 */
export interface ProjectWithStats extends Project {
  contribution_count?: number;
}

/**
 * Profile with contribution statistics
 */
export interface ProfileWithStats extends Profile {
  contribution_count?: number;
  latest_contribution?: string;
}

// ============================================================================
// Leaderboard Types
// ============================================================================

/**
 * Leaderboard entry showing user ranking and contribution count
 */
export interface LeaderboardEntry {
  user_id: string;
  pr_count: number;
  display_name: string | null;
  github_username: string | null;
  github_avatar_url: string | null;
}

/**
 * Leaderboard with participant count
 */
export interface LeaderboardWithStats extends Leaderboard {
  participant_count?: number;
  total_contributions?: number;
}

// ============================================================================
// Form Types
// ============================================================================

/**
 * Form data for creating a new project
 */
export interface ProjectFormData {
  repoUrl: string;
  labels: string;
  description: string;
}

/**
 * Form data for creating a new leaderboard
 */
export interface LeaderboardFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

/**
 * Form data for updating user profile
 */
export interface ProfileFormData {
  displayName: string;
  githubUsername: string;
}

// ============================================================================
// Auth Types
// ============================================================================

/**
 * User role in the application
 */
export type AppRole = "admin" | "user";

/**
 * Authentication state
 * Note: User type is from @supabase/supabase-js
 */
export interface AuthState {
  user: unknown | null;
  loading: boolean;
  isAdmin: boolean;
}

// ============================================================================
// GitHub Types
// ============================================================================

/**
 * Parsed GitHub repository information from URL
 */
export interface GitHubRepoInfo {
  owner: string;
  repo: string;
  url: string;
}

/**
 * GitHub repository metadata from API
 */
export interface GitHubRepoMetadata {
  stars: number;
  forks: number;
  description: string | null;
  defaultBranch: string;
  language: string | null;
  topics: string[];
}

// ============================================================================
// UI/Component Types
// ============================================================================

/**
 * Stats card data for dashboard
 */
export interface StatsCard {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

/**
 * Filter options for projects
 */
export interface ProjectFilters {
  search: string;
  labels: string[];
  sortBy: "stars" | "forks" | "created_at" | "name";
  sortOrder: "asc" | "desc";
}

/**
 * Pagination state
 */
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * API response wrapper for error handling
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

/**
 * Date range filter
 */
export interface DateRange {
  from: Date | string;
  to: Date | string;
}
