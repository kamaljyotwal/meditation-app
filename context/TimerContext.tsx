import { createContext, useState, Dispatch, SetStateAction } from "react";

interface TimerContextType {
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [duration, setDuration] = useState(10);

    return (
        <TimerContext.Provider value={{ duration, setDuration }}>
            {children}
        </TimerContext.Provider>
    );
};

export default TimerProvider;