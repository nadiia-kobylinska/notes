export const isValid = (state) => {
  return state ? (state.content !== "" && state.title !== "" && state.percentCharTitle<=100 && state.percentCharContent<=100) : false;
}