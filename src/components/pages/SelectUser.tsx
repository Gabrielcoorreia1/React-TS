import { useEffect, useState } from "react";
import { addUser, deleteUser, editUser, getUsers } from "../services/DataUser";
import { User } from "../../types/Entitys";
import { v4 as uuidv4 } from 'uuid';
import { useAlert } from "../context/AlertContext";
import EditUser from "../modals/EditUser";

interface SelectUserProps {
    onClose: () => void;
    handleSelectUser: (id: string) => void;
}

const SelectUser: React.FC<SelectUserProps> = ({ onClose, handleSelectUser }) => {
    const { showAlert } = useAlert();
    const [editId, setEditId] = useState<string | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [showCreateUser, setShowCreateUser] = useState(false);

    useEffect(() => {
        const dataUser = async () => {
            const data = await getUsers();
            setUsers(data)
        }
        dataUser();
    }, [])

    const toggleButton = () => {
        setShowCreateUser(!showCreateUser);
    }

    const handleAddUser = async () => {
        const newUser: User = {
            id: uuidv4(),
            name,
            email,
            gender,
        }

        addUser(newUser);
        setUsers(
            [...users, newUser]
        )
        showAlert('Usuario criado com sucesso!', 'green')
        setName('');
        setEmail('');
        setGender('');
        toggleButton();

    }

    const handleDeleteUser = (userId: string) => {
        deleteUser(userId)
        showAlert('Usuario Deletado Com Sucesso!', 'green');
        setUsers(
            users.filter((user) => user.id !== userId)
        )
    }
    const handleEditUser = async (name: string, email: string, gender: string) => {
        const updateUser = await editUser(editId!, {name, email, gender});
        setUsers(
            users.map((user) => user.id === editId ? updateUser : user)
        )
        setEditId(null);
    }


    const handleSelect = (id: string) => {
        handleSelectUser(id);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
            {editId && <EditUser onClose={onClose} handleEditUser={handleEditUser} />}
            <div className="w-2/4 h-auto  bg-gray-500 p-12 rounded-md space-y-4">
                <button
                    onClick={toggleButton}
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    {showCreateUser ? "Usuarios Disponiveis" : "Novo Usuario"}
                </button>
                {showCreateUser ? (
                    <div className="space-y-4">

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                type="text"
                                placeholder=" "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                type="text"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>

                        <div className=" flex">
                            <div className="mr-5">
                                <label className="items-center">
                                    <input
                                        type="radio"
                                        value="Masculino"
                                        checked={gender === "Masculino"}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="hidden"
                                    />
                                    <span className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer ${gender === "Masculino" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}>
                                        &#9794;
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label className=" items-center">
                                    <input
                                        type="radio"
                                        value="Feminino"
                                        checked={gender === "Feminino"}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="hidden"
                                    />
                                    <span className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer ${gender === "Feminino" ? "bg-pink-600 text-white" : "bg-white text-pink-600"}`}>
                                        &#9792;
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleAddUser}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Criar Novo Usuario
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {users.length != 0 ? (
                            <div>
                                {users.map((user) => {
                                    return (
                                        <div key={user.id} className=" w-full sm:w-1 md:w-1/2 lg:w-1/2 p-2">
                                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                <h2 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}</h2>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.email}</p>
                                                <div className="flex flex-wrap justify-center ">
                                                    <div className="flex mb-2 ">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditId(user.id)}
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                            Editar Usuario
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                            Deletar Usuario
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => (handleSelect(user.id))}
                                                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                                        Selecionar Usuario
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div>
                                <h1>Parece que não há usuarios cadastrados...</h1>
                            </div>
                        )}
                    </div>
                )}
                <button
                    type="button"
                    onClick={onClose}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default SelectUser;