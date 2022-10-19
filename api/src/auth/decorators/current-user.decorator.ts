import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest().user;
        const user = request.user;

        console.log(data);

        console.log(user);

        if(!user) return null;

        console.log(user?.[data]);

        return data ? user?.[data] : user;
    }
)