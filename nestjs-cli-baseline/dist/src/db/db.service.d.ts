import { Connection, Repository } from 'typeorm';
export declare class DatabaseService {
    connection: Connection;
    constructor(connection: Connection);
    getRepository<T>(entity: any): Promise<Repository<T>>;
}
