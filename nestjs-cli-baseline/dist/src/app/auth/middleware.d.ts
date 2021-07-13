import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { RequestModel } from './user';
export declare class AuthMiddleware implements NestMiddleware {
    constructor();
    use(req: RequestModel, res: Response, next: NextFunction): Promise<void>;
}
