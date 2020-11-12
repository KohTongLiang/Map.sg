// import node modules
import React from 'react';
import { connect } from 'react-redux';

// import redux components
import { toggleHistoryView } from '../../Action/HomeActions';
import { runHistory, toggleBookmark } from '../../Action/NavigationActions';
import { deleteHistory } from '../../Action/FirebaseAction';

// import material-ui modules
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Slide, Dialog, AppBar, Toolbar, Typography, Button, IconButton, Paper, List } from '@material-ui/core';
import {
    Close as CloseIcon, PlayArrow as PlayArrowIcon, Delete as DeleteIcon,
    BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon
} from '@material-ui/icons';

// import constants
import * as STYLES from '../../Constants/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));

// allows states stored in redux store to be mapped to components
const mapStateToProps = (state) => {
    const appState = {
        historyView: state.HomeReducer.historyView,
        history: state.FirebaseReducer.history,
        user: state.FirebaseReducer.user,
    };
    return appState;
};

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
    return {
        toggleHistoryView: () => dispatch(toggleHistoryView()),
        runHistory: routeInformation => dispatch(runHistory(routeInformation)),
        deleteHistory: historyId => dispatch(deleteHistory(historyId)),
        toggleBookmark: bookmark => dispatch(toggleBookmark(bookmark)),
    }
}

/**
 * History view loads past routes taken by the user and load them into the view.
 * User can start specific route from here as well.
 * @author Koh Tong Liang
 * @version 1
 * @since 01/11/2020
 */
function HistoryView(props) {
    const classes = useStyles();

    function startFromHistoryHandler(dataRow) {
        props.runHistory(
            {
                routeInformation: JSON.parse(dataRow.route_information)[0],
                startLocation: dataRow.start_location[0],
                endLocation: dataRow.end_location[0],
                routeName: dataRow.route_name,
            });
        props.toggleHistoryView()
    }

    function deleteHistoryHandler(historyId) {
        props.deleteHistory({ userId: props.user.uid, historyId: historyId });
    }

    function bookmarkHandler(routeId, bookmark) {
        props.toggleBookmark({ userId: props.user.uid, routeId: routeId, bookmark: bookmark });
    }

    return (
        <Dialog
            fullScreen
            open={props.historyView}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.toggleHistoryView()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => props.toggleHistoryView()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        History
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {(props.history && props.history.length > 0) && props.history.map(dataRow => (
                    <Paper key={dataRow[0]} style={{ maxHeight: 200, overflow: 'auto' }}>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="body1">
                                        From: {dataRow[1].route_name[0]}
                                    </Typography>
                                    <Typography component="p" variant="body1">
                                        To: {dataRow[1].route_name[1]}
                                    </Typography>
                                    <Typography component="p" variant="body1">
                                        Date: {dataRow[1].date_added}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div className={classes.controls}>
                                {dataRow[1].bookmark == false && (
                                    <IconButton onClick={() => bookmarkHandler(dataRow[0], true)} aria-label="play/pause">
                                        <BookmarkBorderIcon />
                                    </IconButton>
                                )}
                                {dataRow[1].bookmark == true && (
                                    <IconButton onClick={() => bookmarkHandler(dataRow[0], false)} aria-label="play/pause">
                                        <BookmarkIcon />
                                    </IconButton>
                                )}
                                <IconButton onClick={() => startFromHistoryHandler(dataRow[1])} aria-label="play/pause">
                                    <PlayArrowIcon className={classes.playIcon} />
                                </IconButton>
                                <IconButton onClick={() => deleteHistoryHandler(dataRow[0])}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Card>
                    </Paper>
                ))}
            </Container>
        </Dialog>
    )
}

// bridge the view to redux actions and store
const History = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HistoryView);

export default History;