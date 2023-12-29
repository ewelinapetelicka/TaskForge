import {User} from "../user/user";

export interface Project{
    "title": string;
    "description": string;
    "icon": string;
    "users": User[];
}