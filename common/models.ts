export type IbaseObject = {
    id: string;
}

export interface Iuser extends IbaseObject {
    username: string;
    email: string;
    groupID?: string;
    password?: string;
}