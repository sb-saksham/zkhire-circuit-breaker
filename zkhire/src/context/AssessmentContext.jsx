import React, {useContext, createContext} from "react";

import useAssessmentDet from "../hooks/useAssessmentDet";

const AssessmentContext = createContext()

const useAssessmentContext = () => useContext(AssessmentContext)

const AssessmentProvider = ({children}) => {

    const assessment = useAssessmentDet();

    return (
        <AuthContext.Provider value={assessment}>
            {children}
        </AuthContext.Provider>
    );
}

export { useAssessmentContext, AssessmentProvider };
// useAssessmentContext for coponents inside the 
// AssessmentProvider to use the value for