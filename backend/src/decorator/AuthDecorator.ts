import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../guard/AuthGuard";

export function Auth(...roles) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard),
    );
}
