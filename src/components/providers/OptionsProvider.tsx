'use client';

import React, {createContext, useContext, useEffect, useState} from "react";
import {SessionRow, Sessions} from "../../types.tsx";

interface OptionsContextType {
    sessionList: Sessions;
    sessionNames: string[];
    selectedSession: string;
    setSelectedSession: (session: string) => void;
    selectedSessionData: SessionRow[];
    setSelectedSessionData: (data: SessionRow[]) => void;
}

const OptionsContext = createContext<OptionsContextType | null>(null);

interface OptionsProviderProps {
    children: React.ReactNode;
}

export function OptionsProvider({ children }: OptionsProviderProps) {
    const [sessionList, setSessionList] = useState<Sessions>({});
    const [sessionNames, setSessionNames] = useState<string[]>([]);
    const [selectedSession, setSelectedSession] = useState<string>("");
    const [selectedSessionData, setSelectedSessionData] = useState<SessionRow[]>([]);

    const loadOptions = async () => {
        fetch("https://gist.githubusercontent.com/2er0/ed5aef4491fa2a5390f8e88b1b4c49f7/raw")
            .then((res) => res.json())
            .then((data: Sessions) => {
                // convert data to Sessions type
                setSessionList(data);
                setSessionNames(Object.keys(data));
            });
    }
    useEffect(() => {
        loadOptions().then(() => console.log("Options loaded"));
    }, []);

    return (
        <OptionsContext.Provider value={{
            sessionList,
            sessionNames,
            selectedSession,
            setSelectedSession,
            selectedSessionData,
            setSelectedSessionData
        }}>
            {children}
        </OptionsContext.Provider>
    );
}

export function useOption() {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOption must be used within a OptionProvider');
    }
    return context;
}