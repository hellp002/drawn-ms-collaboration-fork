import { Metadata, sendUnaryData, ServerUnaryCall, ServerWritableStream, status } from "@grpc/grpc-js";
import { GetRoomRequest__Output } from "../proto/generatedTypes/collaboration/GetRoomRequest";
import { GetRoomResponse } from "../proto/generatedTypes/collaboration/GetRoomResponse";
import collaborationManager from "../data/collaborationManager";
import { JoinRoomRequest, JoinRoomRequest__Output } from "../proto/generatedTypes/collaboration/JoinRoomRequest";
import { ConnectionResponse } from "../proto/generatedTypes/collaboration/ConnectionResponse";

export async function GetRoom(call: ServerUnaryCall<GetRoomRequest__Output, GetRoomResponse>, callback: sendUnaryData<GetRoomResponse>) {
    console.log('GetRoom called with', call.request)
    const userId = (call.metadata.get('x-id').length > 0) ? call.metadata.get('x-id')[0] : null
    const role = (call.metadata.get('x-role').length > 0) ? call.metadata.get('x-role')[0] : null
    

    const data = {
        users: collaborationManager.getUserList(call.request.workspaceId || 0)
    }


    const origin = (call.metadata.get('origin').length > 0) ? call.metadata.get('origin')[0] : null

    const outgoingHeaders = new Metadata();
    outgoingHeaders.set('origin', (origin) ? origin : '*');
    outgoingHeaders.set('Access-Control-Allow-Credentials', 'true');
    call.sendMetadata(outgoingHeaders)
    

    callback(null, data)
}

export async function JoinRoom(call: ServerWritableStream<JoinRoomRequest__Output, ConnectionResponse>) {
    console.log('JoinRoom called with', call.request)
    const userId = (call.metadata.get('x-id').length > 0) ? call.metadata.get('x-id')[0] : null
    const role = (call.metadata.get('x-role').length > 0) ? call.metadata.get('x-role')[0] : null

    // Validate request
    if (!userId || !role) {
        call.emit('error', {
            code: status.INVALID_ARGUMENT,
            message: 'userId is required'
        })
        return
    }

    if (!call.request.workspaceId) {
        call.emit('error', {
            code: status.INVALID_ARGUMENT,
            message: 'workspaceId is required'
        })
        return
    }

    call.on('cancelled', () => {
        console.log('Stream cancelled', call.request)
        collaborationManager.removeConnection(call.request.workspaceId || -1, userId.toString() || "")
    })

    call.on('error', function(e) {
        console.log('Stream error', call.request)
        collaborationManager.removeConnection(call.request.workspaceId || -1, userId.toString() || "")
    });

    const origin = (call.metadata.get('origin').length > 0) ? call.metadata.get('origin')[0] : null

    const outgoingHeaders = new Metadata();
    outgoingHeaders.set('origin', (origin) ? origin : '*');
    outgoingHeaders.set('Access-Control-Allow-Credentials', 'true');
    call.sendMetadata(outgoingHeaders)

    collaborationManager.addConnection(call.request.workspaceId, userId.toString(), call)
}