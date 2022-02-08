type isValidProps = {
  content: string,
  title: string,
  percentCharTitle:number,
  percentCharContent:number
}
export const isValid = (state:isValidProps) => {
  return state ? (state.content !== "" && state.title !== "" && state.percentCharTitle<=100 && state.percentCharContent<=100) : false;
}