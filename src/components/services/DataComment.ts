import { Mensage } from "../../types/Entitys";
import { api } from "../../utils/api";

export const getComments = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;
    return data.messages.filter((message : Mensage) => message.projectId === id);
};

export const addComment = async (comment: Mensage) => {
    const response = await api.get('/');
    const data = response.data.record;
    
    data.messages.push(comment);

    await api.put('/', data);
    return comment;
};

export const editComment = async (id: string, updatedComment: Partial<Mensage>) => {

    const response = await api.get('/');
    const data = response.data.record;

    const messageIndex = data.messages.findIndex((message: Mensage) => message.id === id);
    if (messageIndex !== -1) {
        data.messages[messageIndex] = { ...data.messages[messageIndex], ...updatedComment };
    }

    await api.put('/', data);
    return data.messages[messageIndex];
};

export const deleteComment = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    data.messages = data.messages.filter((message: Mensage) => message.id !== id);

    await api.put('/', data);
};

export const getComment = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    return data.messages.find((message: Mensage) => message.id === id);
}