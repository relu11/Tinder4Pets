import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    useMediaQuery,
    useTheme,
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";
  import { connect } from "react-redux";
  import { useFormStyles } from "../../helpers/styles";
  import { addAdoptionPet, resetAddAdoptionPetState } from "../../redux/actions/adoptionPetsActions";
  
  function AddAdoptionPetDialog({ open, setOpen, addAdoptionPet, adoptionPetAdded, resetAddAdoptionPetState }) {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [ageMonths, setAgeMonths] = useState("");
    const [city, setCity] = useState("");
  
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const formClasses = useFormStyles();
  
    useEffect(() => {
      return () => {
        resetAddAdoptionPetState();
      };
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addAdoptionPet({
        name,
        breed,
        ageMonths,
        city,
      });
      setName("");
      setBreed("");
      setAgeMonths("");
      setCity("");
      setOpen(false);
    };
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="add-adoption-pet-dialog"
        >
          <DialogTitle>Add a event</DialogTitle>
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
                label="Breed"
                type="text"
                value={breed}
                fullWidth
                required
                onChange={(e) => setBreed(e.target.value)}
              />
              <TextField
                className={formClasses.formField}
                label="ageMonths"
                type="number"
                value={ageMonths}
                fullWidth
                required
                onChange={(e) => setAgeMonths(e.target.value)}
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
    adoptionPetAdded: state.adoptionPetAdded,
  });
  
  export default connect(mapStateToProps, { addAdoptionPet, resetAddAdoptionPetState })(
    AddAdoptionPetDialog
  );
  