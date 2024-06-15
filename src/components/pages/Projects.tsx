import { useState, useEffect } from "react";
import { Project } from "../../types/Entitys";
import { addProject, deleteProject, editProject, getProjects } from "../services/DataProject";
import { v4 as uuidv4 } from 'uuid';
import { useAlert } from "../context/AlertContext";
import EditProject from "../modals/EditProject";
import SelectUser from "./SelectUser";
import SelectedProject from "./SelectedProject";


const Projects = () => {

  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProject, setShowProject] = useState(true);
  const [showProjectPage, setShowProjectPage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    const DataProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    }
    DataProjects();
  }, [])

  const toggleShowProject = () => {
    setShowProject(!showProject);
  }

  const onClose = () => {
    setEditId(null);
    setShowProjectPage(null);
    setShowUsers(false)
  }

  const handleAddProject = async () => {
    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
      userId: selectedUser,
    }
    addProject(newProject);
    setName("");
    setDescription("");
    showAlert('Projeto adicionado com sucesso!', 'green')
    setProjects(
      [...projects, newProject]
    )
  }

  const handleEditProject = async (name: string, description: string) => {
    const updatedProject = await editProject(editId!, { name, description });
    setProjects(projects.map((project) => (project.id === editId ? updatedProject : project)));
    setEditId(null);
    setName('');
    setDescription('');
    showAlert("Projeto Editado Com Sucesso", "blue")
  }

  const handleDeleteProject = async (id: string) => {
    deleteProject(id);
    showAlert('Projeto Deletado Com Sucesso!', 'green');
    setProjects(
      projects.filter((project) => project.id !== id
      )
    );
  }

  const handleSelect = (id: string) => {
    setSelectedUser(id);
  }

  return (
    <div className="bg-gray-500 h-auto min-h-screen p-12">
      {showProjectPage && <SelectedProject projectId={showProjectPage} onClose={onClose}/>}
      {editId && <EditProject onClose={onClose} handleEditProject={handleEditProject} />}
      {showUsers && <SelectUser onClose={onClose} handleSelectUser={handleSelect} />}
      <button
        onClick={toggleShowProject}
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        {showProject ? "Projetos" : "Criar Projeto"}
      </button>
      <div className="min-w-md mx-auto border-4 border-zinc-700 rounded-md bg-slate-700 p-6">
        <h1 className="text-center mb-3 font-bold text-gray-100">{showProject ? "Projetos" : "Criar Projeto"}</h1>

        {showProject ? (
          <div className="flex flex-wrap justify-center">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className=" w-full sm:w-1 md:w-1/2 lg:w-1/3 p-2">
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h2>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
                    <div className="flex flex-wrap justify-center ">
                      <div className="flex mb-2 ">
                        <button
                          type="button"
                          onClick={() => setEditId(project.id)}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                          Editar Projeto
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                          Deletar Projeto
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowProjectPage(project.id)}
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        Ver Mais
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center text-gray-100">Não há projetos cadastrados.</h1>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative z-0 w-full mb-5 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                id="name"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descrição</label>
            </div>
            <div className="relative z-0 w-full mb-5 group ">
              <button
                type="button"
                onClick={() => { setShowUsers(true) }}
                className="text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-md w-full sm:w-auto px-5 py-2.5 text-center">
                Selecionar Usuario {selectedUser ? '✅' : ''}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleAddProject}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Criar Novo Projeto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default Projects;