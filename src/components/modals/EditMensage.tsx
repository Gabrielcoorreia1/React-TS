import { useState } from "react";

interface EditMensageProps {
    onClose: () => void;
    handleEditMensage: (content: string) => void
}

const EditMensage: React.FC<EditMensageProps> = ({ onClose, handleEditMensage }) => {

    const [content, setContent] = useState('');

    const sendNewMensage = async () => {
        handleEditMensage(content);
        onClose();
        
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-slate-500 p-12 rounded-md space-y-4">
                <h1 className="text-center mb-3 font-bold text-gray-700 dark:text-gray-700 ">Edição de Projeto</h1>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="name"
                        type="text"
                        placeholder=" "
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Novo nome</label>
                </div>
                <button
                    type="button"
                    onClick={sendNewMensage}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Enviar
                </button>
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

export default EditMensage;