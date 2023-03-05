import {Injectable} from "@nestjs/common";
var httpContext = require('express-http-context');

@Injectable()
export class ContextService {

    getKey(key: string){
        return httpContext.get(key);
    }

    save(key:string, value: any){
        httpContext.set(key, value);
    }
}
