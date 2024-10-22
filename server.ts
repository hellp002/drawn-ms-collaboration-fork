import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './proto/generatedTypes/collaboration';
import { GetRoom, JoinRoom } from './services/collaborationService';

const PORT = 8083
const SERVER_URI = `0.0.0.0:${PORT}`;

const PROTO_FILE = './proto/collaboration.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
const chatPackage = grpcObj.collaboration

const server = new grpc.Server()

server.addService(chatPackage.Collaboration.service, {
    GetRoom,
    JoinRoom,
})


server.bindAsync(SERVER_URI, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`Your server as started on port ${port}`)
    // server.start()
});