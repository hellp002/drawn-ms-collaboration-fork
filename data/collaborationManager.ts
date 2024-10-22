import { ServerWritableStream } from "@grpc/grpc-js";
import { JoinRoomRequest__Output } from "../proto/generatedTypes/collaboration/JoinRoomRequest";
import { ConnectionResponse } from "../proto/generatedTypes/collaboration/ConnectionResponse";

class CollaborationManager {
    private connections: Map<number, Map<string, ServerWritableStream<JoinRoomRequest__Output, ConnectionResponse>>> = new Map<number, Map<string, ServerWritableStream<JoinRoomRequest__Output, ConnectionResponse>>>
    private static _instance: CollaborationManager

    private constructor() {}

    public static get instance(): CollaborationManager {
        if (!CollaborationManager._instance) {
            CollaborationManager._instance = new CollaborationManager()
        }
        return CollaborationManager._instance
    }

    public addConnection(workspaceId: number, userId: string, stream: ServerWritableStream<JoinRoomRequest__Output, ConnectionResponse>) {
        if (!this.connections.has(workspaceId)) {
            this.connections.set(workspaceId, new Map<string, ServerWritableStream<JoinRoomRequest__Output, ConnectionResponse>>())
        }
        this.connections.get(workspaceId)?.set(userId, stream)
        // this.broadcastMessage(workspaceId, userId, {
        //     action: "UPDATE_CONNECTION",

        // })
    }

    public removeConnection(workspaceId: number, userId: string) {
        if (!this.connections.has(workspaceId)) return
        this.connections.get(workspaceId)?.delete(userId)
        if (this.connections.get(workspaceId)?.size === 0) {
            this.connections.delete(workspaceId)
        }
    }

    public getUserList(workspaceId: number): string[] {
        return Array.from(this.connections.get(workspaceId)?.keys() || [])
    }

    public broadcastMessage(workspaceId: number, senderId: string, message: any, includeSender: boolean = false) {
        if (!this.connections.has(workspaceId)) return
        this.connections.get(workspaceId)?.forEach((stream, userId) => {
            if (!includeSender && userId === senderId) return
            stream.write(message)
        })
    }

}

const collaborationManager = CollaborationManager.instance
export default collaborationManager