import {
    Card,
    CardContent,
    Container,
    Grid,
    Fab,
    makeStyles,
    Typography,
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

            <Fab
                className={classes.fab}
                color="primary"
                aria-label="add"
                size="small"
                onClick={() => setDialogOpen(true)}
            >
                <AddIcon />
            </Fab>

            <AddEventDialog open={dialogOpen} setOpen={setDialogOpen} />
            {events && events.length ? (
                <section className={classes.section}>
                    <Typography variant="h4">Events</Typography>
                    <Grid container>
                        {
                            events.map((e) => (
                                e.name != null && e.name != "" ?
                                    <Grid item>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Fab
                                                    className={classes.fab}
                                                    color="primary"
                                                    aria-label="add"
                                                    size="small"
                                                    onClick={() => deleteEvent(e._id)}
                                                >
                                                    <DeleteIcon />
                                                </Fab>
                                                <Typography variant="h6">{e.name}</Typography>
                                                <Typography>{e.time}</Typography>
                                                <Typography>{e.city}</Typography>
                                                <Typography>Number of attendees: {e.attendees.length}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid> : <div></div>
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

export default connect(mapStateToProps, { getAllEvents,deleteEvent })(Events);
