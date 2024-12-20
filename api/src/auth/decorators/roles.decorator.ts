import { SetMetadata } from "@nestjs/common";
import { Role } from "../../roles/roles.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: String[]) => SetMetadata(ROLES_KEY, roles);