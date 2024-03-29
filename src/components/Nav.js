import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Home from '@material-ui/icons/HomeRounded'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  grow: {
    display: 'flex',
    flexGrow: 1,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.18),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.26),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  userName: {
    flex: '0.25',
    alignItems: 'center',
  },
  other: {
    display: 'flex',
    flex: '0.75',
    alignItems: 'center',
  },
}));

export default function PrimarySearchAppBar({ name }) {
  const classes = useStyles();

  return (
    <div className={classes.grow} id='navbar'>
      <AppBar position="static">
        <Toolbar id='navbar'>
          <div className={classes.other}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <Home />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Social Hub
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
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
          </div>
          <div className={classes.userName} >
            <Typography className={classes.title} variant="h6" noWrap>
              {name}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
