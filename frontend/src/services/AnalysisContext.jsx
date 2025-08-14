import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analysis, setAnalysis] = useState(null);

  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
