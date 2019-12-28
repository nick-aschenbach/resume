import React from 'react'
import { useHistory } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import GridListTile from '@material-ui/core/GridListTile'
import GridList from '@material-ui/core/GridList'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { makeStyles } from '@material-ui/styles'

import firework from '../assets/experiments/firework.png'
import terrain from '../assets/experiments/terrain.png'
import terrain2 from '../assets/experiments/simplex-terrain.png'
import plasma from '../assets/experiments/plasma.png'
import arkanoid from '../assets/experiments/arkanoid.png'
import ballistic from '../assets/experiments/ballistic.png'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    padding: 10
  },
  gridItem: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const tileData = [
  {
    img: firework,
    title: 'Firework particle simulation',
    route: 'Firework Simulator'
  },
  {
    img: terrain,
    title: 'Wireframe Fractal Terrain Video',
    route: 'Wireframe Fractal Terrain Video'
  },
  {
    img: plasma,
    title: 'Plasma Simulator Video',
    route: 'Plasma Simulator Video'
  },
  {
    img: arkanoid,
    title: 'Arkanoid Game Levels',
    route: 'Arkanoid Game Levels'
  },
  {
    img: terrain2,
    title: 'WebGL Terrain Generator',
    route: 'WebGL Terrain Generator'
  },
  {
    img: ballistic,
    title: 'Ballistics Simulator',
    route: 'Ballistics Simulator'
  }
]

export default function HomeScreen () {
  const history = useHistory()

  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <div className={classes.root}>
        <GridList spacing={10} className={classes.gridList} cols={3}>
          {tileData.map((tile, index) => (
            <GridListTile
              key={index} onClick={() => {
                history.push(`?route=${tile.route}`)
              }}
            >
              <img src={tile.img} alt={tile.title} className={classes.gridItem} />
              <GridListTileBar subtitle={tile.title} className={classes.gridItem} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Container>
  )
}
