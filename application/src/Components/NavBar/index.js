// import node modules
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

// allows states stored in redux store to be mapped to components
const mapStateToProps = (state) => {
    const appState = {
        loggedIn: state.FirebaseReducer.loggedIn,
    };
    return appState;
};

// allows view to call redux actions to perform a particular task
function mapDispatchToProps(dispatch) {
    return {
        toggleHistoryView: () => dispatch(toggleHistoryView()),
        toggleBookmarkView: () => dispatch(toggleBookmarkView()),
    }
}

/* *
  * Handle navigation bar events located at the bottom of the application
  * @author Koh Tong Liang
  * @version 1.0
  * @since 19/10/2018
  * */
const NavbarView = (props) => {
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

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
                    <Tab icon={<HomeIcon />} onClick={() => history.push('/')} aria-label="phone" />
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
                    {!props.loggedIn && <Tab icon={<ExitToAppIcon />} onClick={() => history.push('/SignIn')} aria-label="person" />}
                </Tabs>
            </Paper>
        </div>
    );
}

// bridge the view to redux actions and store
const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarView);

export default NavBar;