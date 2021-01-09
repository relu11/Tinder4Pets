import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
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
  const [gender, setGender] = useState("");
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
      gender,
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
            <FormControl className={formClasses.formField} fullWidth required>
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={formClasses.formField} fullWidth required>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="femal">Female</MenuItem>
              </Select>
            </FormControl>
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
