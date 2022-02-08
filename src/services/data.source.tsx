import { getLocalStorage } from './local-storage';
import { Note } from '../types/Note';

const getNotesDS = getLocalStorage('list', []);
const setNotesDS = (notes:Note[]) => localStorage.setItem('list', JSON.stringify(notes));

export { getNotesDS, setNotesDS };
