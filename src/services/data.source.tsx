import { getLocalStorage } from './local-storage';

export type Notes = {
  readonly id: number;
  readonly title: string;
  readonly content: string;
};
const getNotesDS = getLocalStorage('list', []);
const setNotesDS = (notes:Notes) => localStorage.setItem('list', JSON.stringify(notes));

export { getNotesDS, setNotesDS };
