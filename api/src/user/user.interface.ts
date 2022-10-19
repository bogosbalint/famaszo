import { Role } from "src/roles/roles.enum";

export interface IUser {
    id: string;
    username: string;
    email: string;
    roles: Role[];
}