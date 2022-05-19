// import node modules
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import redux components
import { toggleHistoryView, toggleBookmarkView } from '../../Action/HomeActions';

// import material-ui modules
import { Paper, Tabs, Tab, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { History as HistoryIcon, Home as HomeIcon, Bookmark as BookmarkIcon, AccountCircle, ExitToApp as ExitToAppIcon } from '@material-ui/icons';

// import view components
import SignOutButton from '../Authentication/SignOut';

// import constants
import * as STYLES from '../../Constants/styles';

// instantiate predefined styles into a constant variable
const useStyles = makeStyles((theme) => (STYLES.style));

/* *
  * Handle navigation bar events located at the bottom of the application. Allows user to switch between homepage, sign/out and show/hide bookmark and history view.
  *
  * @author Koh Tong Liang
  * @version 1.0
  * @since 19/10/2018
  * */
const NavBar = (props) => {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Paper square className={classes.navBarRoot}>
                <Tabs
                    value={value}
                    variant="fullWidth"
                    indicatorColor="primary"
                >
                    <Tab icon={<HomeIcon />} onClick={() => navigate('/')} aria-label="phone" />
                    <Tab icon={<HistoryIcon />} onClick={() => props.toggleHistoryView()} color="inherit" />
                    <Tab icon={<BookmarkIcon />} onClick={() => props.toggleBookmarkView()} aria-label="person" />
                    {props.loggedIn && (
                        <div>
                            <Tab
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                icon={<AccountCircle />}
                            />
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem>
                                    <SignOutButton />
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!props.loggedIn && <Tab icon={<ExitToAppIcon />} onClick={() => navigate('/SignIn')} aria-label="person" />}
                </Tabs>
            </Paper>
        </div>
    );
}



/**
 * Pass in the app state found in the store and create an object as a means for components to access the app state.
 */
const mapStateToProps = (state) => {
    const appState = {
        loggedIn: state.FirebaseReducer.loggedIn,
    };
    return appState;
};

/**
 * Pass in the dispatch function from Redux store and create an object that allows components to call dispatch function to dispatch specific redux actions
 */
function mapDispatchToProps(dispatch) {
    return {
        toggleHistoryView: () => dispatch(toggleHistoryView()),
        toggleBookmarkView: () => dispatch(toggleBookmarkView()),
    }
}


/**
 * Pass in mapStateToProps and mapDispatchToProps function into Home component as props. Components within Home component will be able to access the
 * functions to either dispatch a function or access an app state.
 */
export default  connect(mapStateToProps, mapDispatchToProps)(NavBar);