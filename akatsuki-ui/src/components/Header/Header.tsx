import './Header.scss';
import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import {
	AppBar,
	Toolbar,
	IconButton,
	makeStyles,
	SwipeableDrawer,
	List,
	Button,
  alpha
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import brandLogo from '../../assets/images/logo-full.svg';

const useStyles = makeStyles((theme) => ({
	list: {
		width: 250,
    paddingLeft: '24px'
	},
  fullList: {
    width: 'auto',
  },
	mobile: {
		[theme.breakpoints.down(900)]: {
			display: 'none',
		},
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
	},
  desktop: {
		[theme.breakpoints.up(900)]: {
			display: 'none',
		},
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
	},
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0,0,0,0.8)'
  },
  inputRoot: {
    color: 'rgba(0,0,0,0.8)',
    border: '1px solid rgba(0,0,0,0.3)',
    borderRadius: '4px',
    height: '32px',
    marginRight: '60px'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  }
}));

// const StyledBadge = withStyles((theme) => ({
// 	badge: {
// 		right: -3,
// 		top: 13,
// 		border: `2px solid ${theme.palette.background.paper}`,
// 		padding: '0 2px',
// 	},
// }))(Badge);

const Header = (props: any) => {

  const { location }  = props
	const isActive = (path) => {//console.log(path, match)
		if (location.pathname === path) {
			return { color: '#FF9834' };
		}
	};

	const nav = () => (
		<>
			<li className="my-3 mx-2 cursor-hand">
				<Link to="/" style={isActive('/')}>
					Feature Requests
				</Link>
			</li>
      <li className="my-3 mx-2 cursor-hand">
				<a href="https://hevodata.com/platform/" target="_blank">
					Dashboard
				</a>
			</li>
		</>
	);

	const [drawerState, setDrawerState] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(true);

	const toggleDrawer = (isOpen) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setDrawerState(isOpen);
	};

	const list = () => (
		<div
			className={classes.list}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
			<List>
				{nav()}
				{!isAuth && ( //auth false
					<>
						<li style={{ listStyle: 'none' }} className="my-3 mx-2 cursor-hand">
							<span>
								<Link to="/login" style={isActive('/login')}>
									Sign in
								</Link>
							</span>
						</li>
						<li style={{ listStyle: 'none' }} className="mx-2 my-3 cursor-hand">
							<span>
								<Link to="/signup" style={isActive('/signup')}>
									Sign up
								</Link>
							</span>
						</li>
					</>
				)}
				{isAuth && (
					<li style={{ alignSelf: 'center' }} className="my-3 mx-2 cursor-hand">
						<span
							onClick={() => {
								console.log('sign out')
							}}
						>
							Signout
						</span>
					</li>
				)}
			</List>
		</div>
	);

	const classes = useStyles();
	return (
		<Fragment>
			<AppBar className="appbar text-subheading-2" position="fixed">
				<Toolbar style={{ listStyle: 'none' }}>

          {/* for mobile screen */}
					<SwipeableDrawer
						className={clsx(classes.list, classes.fullList)}
						anchor="top"
						open={drawerState}
						onClose={toggleDrawer(false)}
						onOpen={toggleDrawer(true)}
					>
            <div className="center-flex-row w-100 px-6 pt-3 justify-between ">
              <img
                className="appbar-brand-image m-1"
                alt="Hevo"
                src={brandLogo}
              />

              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(false)}>
                <MenuIcon className="toggle-button" />
              </IconButton>
            </div>

						{list()}
					</SwipeableDrawer>

          <div className={classes.desktop}>
            <div>
              <img
                className="appbar-brand-image my-1 mr-9"
                alt="Hevo"
                src={brandLogo}
              />
            </div>

            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}>
              <MenuIcon className="toggle-button" />
            </IconButton>
          </div>

          {/* for desktop screen */}
          <div className={classes.mobile}>
            <img
              className="appbar-brand-image p-1 mr-9"
              alt="Hevo"
              src={brandLogo}
            />

            <div style={{ width: '100%' }}>
              <div className="d-flex justify-between align-items-center">
                <div className="d-flex align-items-center">{nav()}</div>

                <div className="d-flex justify-between align-items-center">
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon className="cursor-hand" />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>


                  <div className="d-flex">
                    {isAuth  && ( //&& isAuth().role === 'user'
                      <>
                        <li className="nav-item mr-2">
                          <Link
                            to="/userdashboard"
                            className="py-2 px-2 center-flex-col"
                            style={isActive('/userdashboard')}
                          >
                            <Avatar />
                            Jerome
                          </Link>
                        </li>
                      </>
                    )}
                    
                    {!isAuth && (
                      <>
                        <li style={{ alignSelf: 'center' }} className="my-3 mx-2 cursor-hand">
                          <Link to="/login" style={isActive('/login')}>
                          Sign in
                          </Link>
                        </li>
                        <li style={{ alignSelf: 'center' }} className="my-3 mx-2 cursor-hand">
                          <Link to="/signup" style={isActive('/signup')}>
                            Signup
                          </Link>
                        </li>
                      </>
                    )}
                    {isAuth && (
                      <li style={{ alignSelf: 'center' }} className="my-3 mx-2 cursor-hand">
                        <Link>
                          Signout
                        </Link>
                      </li>
                    )}
                  </div>
                </div>
              </div>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

export default withRouter(Header);