import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useFormStyles } from "../../helpers/styles";
import { addPet, resetAddPetState } from "../../redux/actions/usersActions";

function AddPetDialog({ open, setOpen, addPet, petAdded, resetAddPetState }) {
  const [name, setName] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const [lookingForMatch, setLookingForMatch] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const formClasses = useFormStyles();

  useEffect(() => {
    return () => {
      resetAddPetState();
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPet({
      name,
      ageMonths,
      type,
      breed,
      city,
      lookingForMatch,
    });
    setName("");
    setAgeMonths("");
    setType("");
    setBreed("");
    setCity("");
    setLookingForMatch("");
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-pet-dialog"
      >
        <DialogTitle>Add a pet</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              className={formClasses.formField}
              label="Name"
              type="text"
              value={name}
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className={formClasses.formField}
              label="Type"
              type="text"
              value={type}
              fullWidth
              required
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              className={formClasses.formField}
              label="Age (In Months)"
              type="number"
              value={ageMonths}
              fullWidth
              required
              onChange={(e) => setAgeMonths(e.target.value)}
            />
            <TextField
              className={formClasses.formField}
              label="Breed"
              type="text"
              value={breed}
              fullWidth
              required
              onChange={(e) => setBreed(e.target.value)}
            />
            <TextField
              className={formClasses.formField}
              label="City"
              type="text"
              value={city}
              fullWidth
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={lookingForMatch}
                    onChange={(e) => setLookingForMatch(e.target.checked)}
                  />
                }
                label="Looking for a match?"
                className={formClasses.formField}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={formClasses.formField}
            >
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  petAdded: state.user.petAdded,
});

export default connect(mapStateToProps, { addPet, resetAddPetState })(
  AddPetDialog
);
