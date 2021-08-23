export type IbaseObject = {
    id: string;
}

export interface Iuser extends IbaseObject {
    username: string;
    email: string;
    teamID?: string;
    teams?: Iteam[];
    password?: string;
}

export interface Iteam extends IbaseObject {
    name: string;
    users: string[]; // array of user IDs...?
}