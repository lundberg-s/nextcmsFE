import React, { createContext, useContext, useState } from 'react';
import { Block } from '@/lib/types/blocks';

interface FormContextType {
  currentFormValues: Block | null;
  setCurrentFormValues: (values: Block | null) => void;
}

const FormContext = createContext<FormContextType>({
  currentFormValues: null,
  setCurrentFormValues: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFormValues, setCurrentFormValues] = useState<Block | null>(null);

  return (
    <FormContext.Provider value={{ currentFormValues, setCurrentFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);