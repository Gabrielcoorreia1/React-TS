import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface AlertContextProps {
    showAlert: (message: string, color: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('Err');
    }
    return context;
};

interface AlertProviderProps {
    children: ReactNode;
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
    const [alert, setAlert] = useState<{ message: string; color: string } | null>(null);

    const showAlert = (message: string, color: string) => {
        setAlert({ message, color });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && <AlertMessage message={alert.message} color={alert.color}  />}
        </AlertContext.Provider>
    );
};

interface AlertMessageProps {
    message: string;
    color: string;
}

const AlertMessage: FC<AlertMessageProps> = ({ message, color }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: color,
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
        }}>
            {message}
        </div>
    );
};
