import { Task } from "../../types/Entitys";
import { api } from "../../utils/api";

export const getTasks = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;
    return data.tasks;
};

export const addTask = async (task: Task) => {
    const response = await api.get('/');
    const data = response.data.record;
    
    data.tasks.push(task);

    await api.put('/', data);
    return task;
};

export const editTask = async (id: string, updatedTask: Partial<Task>) => {

    const response = await api.get('/');
    const data = response.data.record;

    const taskIndex = data.tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex !== -1) {
        data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updatedTask };
    }

    await api.put('/', data);
    return data.tasks[taskIndex];
};

export const deleteTask = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    data.tasks = data.tasks.filter((task: Task) => task.id !== id);

    await api.put('/', data);
};

export const getTask = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    return data.tasks.find((task: Task) => task.id === id);
}