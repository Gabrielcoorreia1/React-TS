export interface User {
    id: string;
    name: string;
    email: string;
    gender: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    userId: string;

}

export interface Task {
    id: string;
    title: string;
    description: string;
    projectId: string;
    status: 'pending' | 'in-progress' | 'completed';
}

export interface Mensage {
    id: string;
    content: string;
    userId: string;
    projectId: string;
}
