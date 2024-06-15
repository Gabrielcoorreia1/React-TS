import { User } from "../types/Entitys";

type problem = {
    [key: string] : string;
};

export const validateUser = (data : User) => {
    const errors : problem = {};

    if(!data.name) {
        errors["name"] = 'O nome é obrigatorio';
    };

    if(!data.email) {
        errors["email"] = 'O email é obrigatorio';
    };
}