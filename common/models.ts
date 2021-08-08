export type IbaseObject = {
    id: string;
}

export interface Iuser extends IbaseObject {
    firstName: string;
    lastName: string;
    email: string;
    groupID?: string;
    password?: string;
}