import React, { ReactNode, useEffect } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import NoteList from '../pages/NoteList';
import NoteForm from '../pages/NoteForm';
import Welcome from '../pages/Welcome';
import NoteDetail from '../pages/NoteDetail';
import { getNotesDS } from "../services/data.source";
import { useNoteListState } from "../store/contexts/NoteListContext";

function WelcomeRoute(props: { redirect: JSX.Element, children: ReactNode }) {
  return (<>{getNotesDS.length ? props.children : (props.redirect ? props.redirect : <Navigate to="/"/>)}</>);
}

function RouterConfig() {
  const [state] = useNoteListState();

  useEffect(()=>{
    console.log(state);

  },[state.mode]);

  return (
    <Routes>
      <Route path="/" element={
        <WelcomeRoute redirect={<Welcome />}>
          <Navigate to="/notes"/>
        </WelcomeRoute>
      } />
      <Route path="/notes" element={
        <WelcomeRoute redirect={<Welcome />}>
          <NoteList />
        </WelcomeRoute>
      } />
      <Route path="/notes/:id/edit" element={<NoteForm />} />
      <Route path="/notes/create" element={<NoteForm />} />
      <Route path="/notes/:id" element={<NoteDetail />} />
    </Routes>
  );
}
export default RouterConfig;
