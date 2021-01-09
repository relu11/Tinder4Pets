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
import { addEvent, resetAddEventState } from "../../redux/actions/eventsActions";

function AddEventDialog({ open, setOpen, addEvent, eventAdded, resetAddEventState }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [creator, setCreator] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const formClasses = useFormStyles();

  useEffect(() => {
    return () => {
      resetAddEventState();
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({
      name,
      time,
      location,
      creator,
      city,
      attendees: []
    });
    setName("");
    setTime("");
    setCreator("");
    setLocation("");
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
        aria-labelledby="add-event-dialog"
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
              label="Creator"
              type="text"
              value={creator}
              fullWidth
              required
              onChange={(e) => setCreator(e.target.value)}
            />
            <TextField
              className={formClasses.formField}
              label="Time"
              type="text"
              value={time}
              fullWidth
              required
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              className={formClasses.formField}
              label="Location"
              type="text"
              value={location}
              fullWidth
              required
              onChange={(e) => setLocation(e.target.value)}
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
  eventAdded: state.eventAdded,
});

export default connect(mapStateToProps, { addEvent, resetAddEventState })(
  AddEventDialog
);
