// Original file: proto/collaboration.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ConnectionResponse as _collaboration_ConnectionResponse, ConnectionResponse__Output as _collaboration_ConnectionResponse__Output } from '../collaboration/ConnectionResponse';
import type { GetRoomRequest as _collaboration_GetRoomRequest, GetRoomRequest__Output as _collaboration_GetRoomRequest__Output } from '../collaboration/GetRoomRequest';
import type { GetRoomResponse as _collaboration_GetRoomResponse, GetRoomResponse__Output as _collaboration_GetRoomResponse__Output } from '../collaboration/GetRoomResponse';
import type { JoinRoomRequest as _collaboration_JoinRoomRequest, JoinRoomRequest__Output as _collaboration_JoinRoomRequest__Output } from '../collaboration/JoinRoomRequest';

export interface CollaborationClient extends grpc.Client {
  GetRoom(argument: _collaboration_GetRoomRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _collaboration_GetRoomRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _collaboration_GetRoomRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _collaboration_GetRoomRequest, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _collaboration_GetRoomRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _collaboration_GetRoomRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _collaboration_GetRoomRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _collaboration_GetRoomRequest, callback: grpc.requestCallback<_collaboration_GetRoomResponse__Output>): grpc.ClientUnaryCall;
  
  JoinRoom(argument: _collaboration_JoinRoomRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_collaboration_ConnectionResponse__Output>;
  JoinRoom(argument: _collaboration_JoinRoomRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_collaboration_ConnectionResponse__Output>;
  joinRoom(argument: _collaboration_JoinRoomRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_collaboration_ConnectionResponse__Output>;
  joinRoom(argument: _collaboration_JoinRoomRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_collaboration_ConnectionResponse__Output>;
  
}

export interface CollaborationHandlers extends grpc.UntypedServiceImplementation {
  GetRoom: grpc.handleUnaryCall<_collaboration_GetRoomRequest__Output, _collaboration_GetRoomResponse>;
  
  JoinRoom: grpc.handleServerStreamingCall<_collaboration_JoinRoomRequest__Output, _collaboration_ConnectionResponse>;
  
}

export interface CollaborationDefinition extends grpc.ServiceDefinition {
  GetRoom: MethodDefinition<_collaboration_GetRoomRequest, _collaboration_GetRoomResponse, _collaboration_GetRoomRequest__Output, _collaboration_GetRoomResponse__Output>
  JoinRoom: MethodDefinition<_collaboration_JoinRoomRequest, _collaboration_ConnectionResponse, _collaboration_JoinRoomRequest__Output, _collaboration_ConnectionResponse__Output>
}
