import { useEffect, useState } from "react";
import { getProject } from "../services/DataProject";
import { Mensage, Project, Task, User } from "../../types/Entitys";
import { getUser } from "../services/DataUser";
import { v4 as uuidv4 } from 'uuid';
import TaskModal from "../modals/TaskModal";
import { deleteTask, editTask, getTasks } from "../services/DataTask";
import { useAlert } from "../context/AlertContext";
import { addComment, deleteComment, editComment, getComments } from "../services/DataComment";
import EditTask from "../modals/EditTask";
import EditMensage from "../modals/EditMensage";

interface SelectedProjectProps {
    onClose: () => void;
    projectId: string;
}

const SelectedProject: React.FC<SelectedProjectProps> = ({ onClose, projectId }) => {

    const { showAlert } = useAlert();

    const [project, setProject] = useState<Project>();
    const [user, setUser] = useState<User>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [mensages, setMensages] = useState<Mensage[]>([]);
    const [showTask, setShowTask] = useState(false);
    const [editId, setEditId] = useState('')
    const [editCommentId, setEditCommentId] = useState('');
    const [avaliation, setAvaliantion] = useState('');

    useEffect(() => {
        const dataProject = async () => {
            const data = await getProject(projectId);
            setProject(data);

            if (data) {
                const dataUser = await getUser(data.userId);
                setUser(dataUser)

                const dataTask = await getTasks(data.id);
                setTasks(dataTask);

                const dataComment = await getComments(data.id);
                setMensages(dataComment);
            }
        }
        dataProject();
    }, [projectId])


    if (!project || !user) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="w-10/12 h-auto bg-gray-500 p-12 rounded-md space-y-4">
                    <div>Erro ao carregar o projeto ou usuário.</div>
                </div>
            </div>
        );
    }

    const handleDeleteTask = async (id: string) => {
        deleteTask(id);
        showAlert('Task Deletada Com Sucesso!', 'green');
        setTasks(
            tasks!.filter((task) => task.id !== id)
        )
    }

    const handleEditTask = async (title: string, description: string) => {
        const updateTask = await editTask(editId, {title, description});
        showAlert('Task Editada Com Sucesso!', 'green');
        setTasks(
            tasks.map((task) => task.id === editId ? updateTask : task)
        )
        setEditId('');
    }

    const toggleTask = () => {
        setShowTask(!showTask);
    }

    const closeEdit = () => {
        setEditId('');
        setEditCommentId('');
    }

    const newTasks = (newTask: Task) => {
        setTasks(
            [...tasks, newTask]);
    }

    const newComments = async () => {

        const newComment: Mensage = {
            id: uuidv4(),
            projectId: project.id,
            userId: user.id,
            content: avaliation,
        }
        addComment(newComment)
        setMensages(
            [...mensages, newComment]
        )
        showAlert('Comentario Criado Com Sucesso!', 'green');
        setAvaliantion('');
    }

    const handleDeleteComment = async (id: string) => {
        deleteComment(id)
        setMensages (
            mensages!.filter((comment) => comment.id !== id)
        )
        showAlert('Comentario Deletado Com Sucesso!', 'green');
    }

    const editCommments = async (newContent: string) => {
        const updateComment = await editComment(editCommentId, {content: newContent});
        showAlert('Comentario Editado Com Sucesso!', 'green');
        setMensages(
            mensages!.map((comment) => comment.id === editId ? updateComment : comment)
            )

    }

    return (
        <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center overflow-auto">
            {showTask && <TaskModal project={projectId} onClose={toggleTask} newTasks={newTasks} />}
            {editId && <EditTask onClose={closeEdit} handleEditTask={handleEditTask}/>}
            {editCommentId && <EditMensage onClose={closeEdit} handleEditMensage={editCommments}/>}
            <div className="bg-gray-500 p-12 rounded-md space-y-4 max-w-4xl w-full mx-4 my-4 overflow-auto max-h-full">
                <div className="bg-zinc-50 px-6 py-10 text-center text-surface rounded-md dark:bg-neutral-700 dark:text-white">
                    <h2 className="mb-6 text-5xl font-bold">Projeto: {project.name}</h2>
                    <p className="mb-8 text-3xl font-bold">{project.description}</p>
                    <p>Criado por: {user.name}</p>
                    <p>Email para contato: {user.email}</p>
                    <button
                        onClick={() => toggleTask()}
                        className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        De ideia de missões para o projeto
                    </button>


                    <div className="dark:bg-neutral-500 rounded-md">

                        <h1 className="mb-6 text-3xl font-bold">Missões do Projeto</h1>
                        {tasks && tasks.length > 0 ? (
                            <div>
                                {tasks.map((task) => {
                                    return (
                                        <div key={task.id} className=" w-full sm:w-1 md:w-1/2 lg:w-1/2 p-2">
                                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                <h2 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h2>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
                                                <div className="flex flex-wrap justify-center ">
                                                    <div className="flex mb-2 ">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditId(task.id)}
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                            Editar Task
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteTask(task.id)}
                                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                            Deletar Task
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="pb-3">
                                <p className="text-red-300">Nenhuma missão criada para este projeto.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div className="m-2  bg-zinc-50 px-6 py-6 text-left rounded-md dark:bg-neutral-700 dark:text-white">
                        <h2 className="mb-4 text-lg font-semibold">Escrever um comentário: </h2>
                        <input
                            type="text"
                            name="comment"
                            id="comment"
                            className="text-black w-full p-2 mb-4 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Digite seu comentário..."
                            value={avaliation}
                            onChange={(e) => setAvaliantion(e.target.value)} />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => newComments()}
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                Enviar Comentário
                            </button>
                        </div>
                        <div>
                            <h1 className="mb-4 text-lg font-semibold">Comentarios: </h1>
                            {mensages && mensages.length > 0 ? (
                                <div>
                                    {mensages.map((mensage) => (
                                        <div className="mb-3 p-3 rounded-md border" key={mensage.id}>
                                            <p className="font-semibold">{mensage.content}</p>
                                            <div className="flex justify-end space-x-2">
                                                <button 
                                                onClick={() => setEditCommentId(mensage.id)}
                                                className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-400 dark:hover:bg-yellow-500 focus:outline-none dark:focus:ring-yellow-600">
                                                    Editar
                                                </button>
                                                <button 
                                                onClick={() => handleDeleteComment(mensage.id)}
                                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                    Deletar Comentário
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <p className="text-center">Sem comentarios no momento. Seja o primeiro a comentar!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            <button 
            onClick={onClose}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Fecha aba do projeto
            </button>
            </div>
        </div>
    );
};

export default SelectedProject;