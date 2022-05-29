import React, { ReactNode, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import NoteList from '../pages/NoteList';
import NoteForm from '../pages/NoteForm';
import Welcome from '../pages/Welcome';
import NoteDetail from '../pages/NoteDetail';
import { useNoteListState } from "../store/contexts/NoteListContext";
import { ViewMode } from '../types/ViewMode';
import { NoteListState } from '../types/Note';

function WelcomeRoute(props: { redirect: JSX.Element, children: ReactNode }) {
  const [state] = useNoteListState();
  return (<>{state.notes.length ? props.children : (props.redirect ? props.redirect : <Navigate to="/"/>)}</>);
}
function returnURL(state: NoteListState){
  switch (state.mode) {
    case ViewMode.EDIT: return `notes/${state.editId}/edit`
    case ViewMode.CREATE: return `notes/create`
    case ViewMode.PREVIEW: return !!state.editId ? `notes/${state.editId}` : `notes`
    default: return 'notes'
  }
}

function RouterConfig() {
  const [state] = useNoteListState();
  let navigate = useNavigate();
  useEffect(() => {
    navigate(returnURL(state), { replace: true });
  },[state.mode, state.editId]);

  return (
    <Routes>
      <Route path="/" element={<WelcomeRoute redirect={<Welcome />}><Navigate to="/notes"/></WelcomeRoute>}/>
      <Route path="notes" element={<WelcomeRoute redirect={<Navigate to="/"/>}><NoteList /></WelcomeRoute>}/>
      <Route path="notes/:id" element={<NoteDetail />} />
      <Route path="notes/:id/edit" element={<NoteForm />} />
      <Route path="notes/create" element={<NoteForm />} />
    </Routes>
  );
}
export default RouterConfig;
