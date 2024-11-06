import redisClient from "../utils/db_redis";

class CacheManager{
    private static instance: CacheManager;
    private cache = redisClient;

    private constructor(){}

    public static getInstance(): CacheManager{
        if(!CacheManager.instance){
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    private async has(key: string): Promise<boolean>{
        const result = await this.cache.exists(key);
        return result === 1;
    }

    public async hasDrawingState(workspaceId: number): Promise<boolean>{
        return await this.has(`drawingState:${workspaceId}`);
    }

    public async hasImageState(workspaceId: number): Promise<boolean>{
        return await this.has(`imageState:${workspaceId}`);
    }

    public async pushDrawingState(workspaceId: number, data: any){
        return await this.cache.rPush(`drawingState:${workspaceId}`, JSON.stringify(data));
    }

    public async pushImageState(workspaceId: number, data: any){
        return await this.cache.rPush(`imageState:${workspaceId}`, JSON.stringify(data));
    }

    public async getDrawingState(workspaceId: number): Promise<any[]>{
        const result = await this.cache.lRange(`drawingState:${workspaceId}`, 0, -1);
        return result.map((data: string) => JSON.parse(data));
    }

    public async getImageState(workspaceId: number): Promise<any[]>{
        const result = await this.cache.lRange(`imageState:${workspaceId}`, 0, -1);
        return result.map((data: string) => JSON.parse(data));
    }

    public async clearDrawingState(workspaceId: number){
        return await this.cache.del(`drawingState:${workspaceId}`);
    }

    public async clearImageState(workspaceId: number){
        return await this.cache.del(`imageState:${workspaceId}`);
    }

    public async replaceDrawingState(workspaceId: number, data: any[], index: number){
        return await redisClient.lSet(`drawingState:${workspaceId}`, index, JSON.stringify(data));
    }

    

}

const cacheManager = CacheManager.getInstance();
export default cacheManager;