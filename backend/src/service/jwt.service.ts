import {Injectable} from "@nestjs/common";
import {IJwtToken} from "../interfaces/IJwtToken";
var jwt = require('jsonwebtoken');
const secret = "mysecret";

@Injectable()
export class JwtService {
    constructor() {
    }

    signJwtToken(userId, username): string{
        return jwt.sign({
            userId,
            username,
        }, secret);
    }

    verfiyJwtToken(token: string): IJwtToken {
        return jwt.verify(token, secret);
    }
}