import { Role } from "src/roles/roles.enum";

export class UpdateUserDTO {
    username: string | null;
    password: string;
    newPassword: string | null;
    newPasswordConfirm: string | null;
}