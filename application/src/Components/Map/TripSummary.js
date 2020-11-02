import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Slide, Dialog, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { tripSummary, cancelRoute } from '../../Action/NavigationActions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    navFab: {
        top: 'auto',
        right: 35,
        bottom: 150,
        position: 'fixed',
    },
    searchFab: {
        top: 'auto',
        right: 35,
        bottom: 80,
        position: 'fixed',
    },
    slidePanel: {
        width: '50%',
        left: 10,
        bottom: 45,
        position: 'fixed',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const mapStateToProps = (state) => {
    const appState = {
            tripSummaryView: state.NavigationReducer.tripSummaryView,
            navigationRoute: state.NavigationReducer.navigationRoute,
        };
    return appState;
};

function mapDispatchToProps (dispatch) {
    return {
        tripSummary: () => dispatch(tripSummary()),
        cancelRoute: () => dispatch(cancelRoute()),
    }
}

/* *
 * Trip summary page which will show user statistics of the overall jounery.
 * @Koh Tong Liang
 * @Version 1
 * @Since 31/10/2020
 * */
function TripSummaryView (props) {
    const classes = useStyles();

    function saveRouteHandler() {
        props.cancelRoute();
    }

    return(
        <Dialog
            open={props.tripSummaryView}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.tripSummary()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    {/* <IconButton edge="start" color="inherit" onClick={() => props.tripSummary()}  aria-label="close">
                        <CloseIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        End of Trip
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <form>
                    <Button onClick={() => props.tripSummary()}>Yay!</Button>
                </form>
            </Container>
        </Dialog>
    )
}

const TripSummary = connect(
    mapStateToProps,
    mapDispatchToProps,
    )(TripSummaryView);

export default TripSummary;
// const condition = authUser => !!authUser;
// export default withAuthorization(condition)(TripSummary);