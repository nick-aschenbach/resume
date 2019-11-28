import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Person from '@material-ui/icons/Person'
import Star from '@material-ui/icons/Star'

import { useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

import HomeScreen from './screens/HomeScreen'
import LinksScreen from './screens/LinksScreen'
import ExperimentsScreen from './screens/ExperimentsScreen'
import FireworkScreen from './screens/FireworkScreen'
import PlasmaScreen from './screens/PlasmaScreen'
import HeightFieldScreen from './screens/HeightFieldScreen'
import ArkanoidScreen from './screens/ArkanoidScreen'
import TerrainScreen from './screens/TerrainScreen'
import BallisticsScreen from './screens/BallisticsScreen'

import useGlobal from './lib/store'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export default function App () {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  const history = useHistory()

  const toggleDrawer = openOrClose => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    globalActions.setDrawer(openOrClose)
  }

  const sideList = () => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          button key='Profile'
          onClick={() => {
            history.push('?route=Nick Aschenbach')
          }}
        >
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
      </List>
      <List>
        <ListItem
          button key='Links'
          onClick={() => {
            history.push('?route=Links')
          }}
        >
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary='Links' />
        </ListItem>
      </List>
      <List>
        <ListItem
          button key='Experiments'
          onClick={() => {
            history.push('?route=Experiments')
          }}
        >
          <ListItemIcon><Star /></ListItemIcon>
          <ListItemText primary='Experiments' />
        </ListItem>
      </List>
    </div>
  )

  const renderScreen = () => {
    const route = getRoute()

    const map = {
      'Nick Aschenbach': <HomeScreen />,
      Experiments: <ExperimentsScreen />,
      'Firework Simulator': <FireworkScreen />,
      'Wireframe Fractal Terrain Video': <HeightFieldScreen />,
      'Plasma Simulator Video': <PlasmaScreen />,
      'Arkanoid Game Levels': <ArkanoidScreen />,
      'WebGL Terrain Generator': <TerrainScreen />,
      'Ballistics Simulator': <BallisticsScreen />,
      Links: <LinksScreen />
    }

    return map[route]
  }

  const getRoute = () => {
    if (history.location.search) {
      const route = history.location.search.split('=')[1]
      return decodeURI(route)
    }
    return 'Nick Aschenbach'
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>{getRoute()}</Typography>
        </Toolbar>
      </AppBar>

      {renderScreen()}

      <Drawer open={globalState.drawerOpen} onClose={toggleDrawer(false)}>
        {sideList('left')}
      </Drawer>
    </div>
  )
}
