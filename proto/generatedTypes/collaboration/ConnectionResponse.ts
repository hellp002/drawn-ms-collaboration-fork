// Original file: proto/collaboration.proto

import type { CollaborationAction as _collaboration_CollaborationAction, CollaborationAction__Output as _collaboration_CollaborationAction__Output } from '../collaboration/CollaborationAction';
import type { Any as _google_protobuf_Any, Any__Output as _google_protobuf_Any__Output } from '../google/protobuf/Any';

export interface ConnectionResponse {
  'action'?: (_collaboration_CollaborationAction);
  'data'?: (_google_protobuf_Any | null);
}

export interface ConnectionResponse__Output {
  'action'?: (_collaboration_CollaborationAction__Output);
  'data'?: (_google_protobuf_Any__Output);
}
