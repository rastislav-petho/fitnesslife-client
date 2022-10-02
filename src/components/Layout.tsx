import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { useApi } from '../api/useApi';
import { DialogMode } from '../helpers/types';

type LayoutProps = {
  title: string;
  handleDialogOpen: (value: boolean, mode: DialogMode) => void;
  hadleFilterOpen: (value: boolean) => void;
};

export const Layout: FC<LayoutProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { auth } = useApi();
  const [open, setOpen] = useState<boolean>(false);

  const { title, handleDialogOpen, hadleFilterOpen } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="secondary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography>{title}</Typography>

          <div>
            <IconButton onClick={() => hadleFilterOpen(true)} className={classes.filter}>
              <SearchIcon />
            </IconButton>

            <IconButton onClick={() => handleDialogOpen(true, 'ADD')} className={classes.add}>
              <AddIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}>
        <div className={classes.drawerHeader}>
          <Typography color="secondary" variant="h5">
            Fitness{' '}
          </Typography>
          <Typography color="primary" variant="h5">
            Life{' '}
          </Typography>
          <Typography variant="caption" style={{ marginLeft: 8 }}>
            v0.0.6
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <WhatshotIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Kalórie" />
            </ListItem>
          </Link>
          {/* <Link to="/trening" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <FitnessCenterIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Tréning" />
            </ListItem>
          </Link> */}
          <Link to="/body" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AccessibilityNewIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Veľkosti tela" />
            </ListItem>
          </Link>
          <ListItem button onClick={() => auth.logout()}>
            <ListItemIcon>
              <ExitToAppIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Odhlasiť sa" className={classes.link} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}>
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    width: '100%'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  toolbar: {
    displey: 'flex',
    justifyContent: 'space-between'
  },
  add: {
    color: '#ffffff'
  },
  filter: {
    color: '#ffffff'
  },
  icon: {
    color: theme.palette.secondary.main
  }
}));
