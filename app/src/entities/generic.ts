import { v4 } from "uuid";

export interface Generic {
    id: string;
    title: string;
    metadata: any;
    type: string;
}

export interface GenericToUpdate {
    id: string;
    title?: string;
    metadata?: any;
}

export const createGenericData = (title: string, metadata: any): Generic => {
    return {
        id: v4(),
        title,
        metadata,
        type: "generic",
    };
};

export const updateGenericData = (
    id: string,
    title?: string,
    metadata?: any
): GenericToUpdate => {
    return {
        id,
        title,
        metadata,
    };
};
