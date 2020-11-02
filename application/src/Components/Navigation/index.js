import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Paper, Tabs, Tab, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { History as HistoryIcon, Home as HomeIcon, Bookmark as BookmarkIcon, AccountCircle, ExitToApp as ExitToAppIcon} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import * as VALUES from '../../Constants/values';
import * as ROUTES from '../../Constants/routes';
// import { AuthUserContext } from '../Session';
import SignOutButton from '../Authentication/SignOut';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGorw: 1,
        top: 'auto',
        bottom: 0,
        width: '100%',
        position: 'fixed',
        zIndex: '2',
        margin: 'auto',
    },
  }));

const mapStateToProps = (state) => {
    const appState = {
            loggedIn: state.FirebaseReducer.loggedIn,
        };
    return appState;
};
  /* *
    * 
    * Handle navigation bar events located at the bottom of the application
    * 
    * @Koh Tong Liang
    * @Version 1.0
    * @Since 19/10/2018
    * */
const NavigationView = (props) => { 
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
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
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs example"
                >
                    <Tab icon={<HomeIcon />} onClick={() => history.push('/')} aria-label="phone" />
                    <Tab icon={<HistoryIcon />} aria-label="favorite" />
                    <Tab icon={<BookmarkIcon />} aria-label="person" />
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
                                    <SignOutButton/>
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

const Navigation = connect(
    mapStateToProps,
    )(NavigationView);

export default Navigation;