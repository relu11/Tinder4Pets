import { makeStyles } from "@material-ui/core";

export const useFormStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));
