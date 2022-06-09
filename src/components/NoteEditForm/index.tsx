import React, { useReducer } from 'react';
import NoteEditFormModel from "./viewModel";
import { NoteFormContext } from "../../store/contexts/NoteFormContext";
import { initialState, NoteFormReducer } from "../../store/reducers/NoteFormReducer";

export const NoteFormProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(NoteFormReducer, initialState);
    return <NoteFormContext.Provider value={[state, dispatch]}>{children}</NoteFormContext.Provider>;
};
const NoteEditForm = () => {
    return (
      <NoteFormProvider>
          <NoteEditFormModel/>
      </NoteFormProvider>
    );
}
export default NoteEditForm;
