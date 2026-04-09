import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isJobModalOpen, setJobModalOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isJobModalOpen, setJobModalOpen }}>
      {children}
    </UIContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => useContext(UIContext);
