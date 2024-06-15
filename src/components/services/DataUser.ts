import { User } from "../../types/Entitys";
import { api } from "../../utils/api";

export const getUsers = async () => {
    const response = await api.get('/');
    const data = response.data.record;
    return data.users;
};

export const addUser = async (user: User) => {
    const response = await api.get('/');
    const data = response.data.record;
    
    data.users.push(user);

    await api.put('/', data);
    return user;
};

export const editUser = async (id: string, updatedUser: Partial<User>) => {

    const response = await api.get('/');
    const data = response.data.record;

    const userIndex = data.users.findIndex((user: User) => user.id === id);
    if (userIndex !== -1) {
        data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };
    }

    await api.put('/', data);
    return data.users[userIndex];
};

export const deleteUser = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    data.users = data.users.filter((user: User) => user.id !== id);

    await api.put('/', data);
};

export const getUser = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    return data.users.find((user: User) => user.id === id);
}