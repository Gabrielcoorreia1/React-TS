import { Project } from "../../types/Entitys";
import { api } from "../../utils/api";

export const getProjects = async () => {
    const response = await api.get('/');
    const data = response.data.record;
    return data.projects;
};

export const addProject = async (project: Project) => {
    const response = await api.get('/');
    const data = response.data.record;
    
    data.projects.push(project);

    await api.put('/', data);
    return project;
};

export const editProject = async (id: string, updatedProject: Partial<Project>) => {

    const response = await api.get('/');
    const data = response.data.record;

    const projectIndex = data.projects.findIndex((project: Project) => project.id === id);
    if (projectIndex !== -1) {
        data.projects[projectIndex] = { ...data.projects[projectIndex], ...updatedProject };
    }

    await api.put('/', data);
    return data.projects[projectIndex];
};

export const deleteProject = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    data.projects = data.projects.filter((project: Project) => project.id !== id);

    await api.put('/', data);
};

export const getProject = async (id: string) => {
    const response = await api.get('/');
    const data = response.data.record;

    return data.projects.find((project: Project) => project.id === id);
}