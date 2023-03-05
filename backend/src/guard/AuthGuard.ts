import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "../service/jwt.service";
import {IJwtToken} from "../interfaces/IJwtToken";
import {ContextService} from "../service/context.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService, private contextService: ContextService) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const token: IJwtToken = this.jwtService.verfiyJwtToken(request.header("token"));
            console.log(token);
            this.contextService.save("token", token);
        } catch(e){
            console.log(e);
            return false;
        }
        return true;
    }
}
