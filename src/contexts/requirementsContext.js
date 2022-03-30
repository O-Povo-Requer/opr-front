import React, { createContext, useState, useContext, useCallback } from 'react';

const RequirementsContext = createContext();

export function RequirementsProvider({ children }) {
    const [requirements, setRequirements] = useState([]);

    const saveRequirement = useCallback((newReq) => {
        setRequirements([...requirements, newReq]);
    }, [requirements]);

    const updateRequirement = useCallback((updatedReq) => {
        const reqIndex = requirements.findIndex(req => req.id === updatedReq.id);
        const updatedRequirements = [...requirements];
        updatedRequirements[reqIndex] = updatedReq;
        setRequirements(updatedRequirements);
    }, [requirements]);

    return (
        <RequirementsContext.Provider value={{ requirements, setRequirements, saveRequirement, updateRequirement }}>
            {children}
        </RequirementsContext.Provider>
    )
}

export function useRequirements() {
    const context = useContext(RequirementsContext);
    if (!context) throw new Error("error: no requirements context")
    const { requirements, setRequirements, saveRequirement, updateRequirement } = context;
    return { requirements, setRequirements, saveRequirement, updateRequirement };
}