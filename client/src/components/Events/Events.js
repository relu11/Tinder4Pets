import {
  Card,
  CardContent,
  Container,
  Grid,
  Fab,
  makeStyles,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllEvents, deleteEvent } from "../../redux/actions/eventsActions";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AddEventDialog from "./AddEventDialog";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  card: {
    minWidth: 275,
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    float: "left",
    marginRight: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(6),
  },
  fab: {
    marginLeft: theme.spacing(2),
  },
  gridItem: {
    marginBottom: theme.spacing(4),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
  },
}));

function Events(props) {
  const { events, getAllEvents, deleteEvent } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!events) {
      getAllEvents();
    }
  });
  return (
    <Container className={classes.root} maxWidth="lg">
      <AddEventDialog open={dialogOpen} setOpen={setDialogOpen} />
      {events && events.length ? (
        <section className={classes.section}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Events
            <Fab
              className={classes.fab}
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => setDialogOpen(true)}
            >
              <AddIcon />
            </Fab>
          </Typography>
          <Grid container spacing={4}>
            {events &&
              events.map((e) => (
                <Grid item>
                  <Card className={classes.card}>
                    <CardMedia
                      image="event-icon.png"
                      className={classes.media}
                    />
                    <CardContent>
                      <Typography variant="h6">{e.name}</Typography>
                      <Typography>{e.time}</Typography>
                      <Typography>{e.city}</Typography>
                      <Typography>
                        Number of attendees: {e.attendees && e.attendees.length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </section>
      ) : (
        ""
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { events } = state.events;

  return { events };
};

export default connect(mapStateToProps, { getAllEvents, deleteEvent })(Events);
