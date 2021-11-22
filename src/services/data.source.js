import {getLocalStorage} from "./local.storage.services";

const getNotesDS = getLocalStorage("list", []);
const setNotesDS = (notes)=>localStorage.setItem('list', JSON.stringify(notes));

export {getNotesDS, setNotesDS};