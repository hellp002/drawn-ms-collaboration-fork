// Original file: proto/collaboration.proto

export const CollaborationAction = {
  UPDATE_CONNECTION: 0,
} as const;

export type CollaborationAction =
  | 'UPDATE_CONNECTION'
  | 0

export type CollaborationAction__Output = typeof CollaborationAction[keyof typeof CollaborationAction]
