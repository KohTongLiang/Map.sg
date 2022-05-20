// import node modules
import React from 'react';

// import material-ui modules
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Card, CardContent, Slide, Dialog, AppBar,
    Toolbar, Typography, IconButton, Paper, List
} from '@material-ui/core';
import {
    Close as CloseIcon, PlayArrow as PlayArrowIcon, Bookmark as BookmarkIcon
} from '@material-ui/icons';

// import constants
import * as STYLES from '../../../Constants/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));

/**
 * Bookmark view loads bookmarked routes taken by the user and load them into the view. User can start specific route from this component.
 * 
 * @author Zhen Wei
 * @version 1
 * @since 01/11/2020
 */
function Bookmark(props) {
    const classes = useStyles();
    return (
        <Dialog
            fullScreen
            open={props.bookmarkView}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.toggleBookmarkView()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => props.toggleBookmarkView()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Bookmarks
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {(props.history && props.history.length > 0) && props.history.map(dataRow => (
                    (dataRow[1].bookmark === true) && (
                        <Paper key={dataRow[0]} style={{ maxHeight: 200, overflow: 'auto' }}>
                            <List>
                                <Card className={classes.cardRoot}>
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
                                        <IconButton onClick={() => props.toggleBookmark({ userId: props.user.uid, routeId: dataRow[0], bookmark: false })} aria-label="play/pause">
                                            <BookmarkIcon />
                                        </IconButton>
                                        <IconButton onClick={() => props.runBookmark(dataRow[1])} aria-label="play/pause">
                                            <PlayArrowIcon className={classes.playIcon} />
                                        </IconButton>
                                    </div>
                                </Card>
                            </List>
                        </Paper>
                    )
                ))}
            </Container>
        </Dialog>
    )
}

export default Bookmark;