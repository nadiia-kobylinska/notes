import { Box, Button, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import EditableDiv from "../EditableDiv";
import RoundCounter from "../CounterRound";
import useStyles from "./styles";
import { NoteFormState } from "../../types/NoteForm";
import { ChangeEvent } from "react";

type FormViewProps = {
  data: NoteFormState,
  PageTitle: string;
  onCancel: () => void;
  onSubmit: () => void;
  onChangeContent: (e:ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e:ChangeEvent<HTMLInputElement>) => void;
}

const FormView = ({data, PageTitle, onCancel, onChangeTitle, onChangeContent, onSubmit}:FormViewProps) => {
  const classes = useStyles();
  let {title, content, id, countCharTitle, percentCharTitle, countCharContent, percentCharContent, loading, isValid}=data;

  return (
    <Box noValidate component="form" autoComplete="off" className={classes.FormNote} onSubmit={onSubmit}>
      <Box className={classes.FormTitleWrp}>
        <Typography variant="h4" component="div" gutterBottom className={classes.FormTitle}>{PageTitle}</Typography>
      </Box>
      <EditableDiv type="text" label="Title" value={title} id={id} excess={countCharTitle} changeEv={onChangeTitle} counter={<RoundCounter count={countCharTitle} percent={percentCharTitle}/>} focus={true} highlighting={true} />
      <EditableDiv type="html" label="Content" value={content} id={id} changeEv={onChangeContent} counter={<RoundCounter count={countCharContent} percent={percentCharContent}/>} />
      <Stack direction="row" spacing={4} className={classes.FormButtons}>
        <Button onClick={onCancel} aria-label="cancel" variant="text" color="secondary" startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <LoadingButton onClick={onSubmit} loading={loading} loadingPosition="start" startIcon={<CheckIcon />} variant="contained" disabled={!isValid} color="secondary">
          Save
        </LoadingButton>
      </Stack>
    </Box>
  );
}
export default FormView;
