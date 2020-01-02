import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 10,
    width: '100%',
    height: '500px'
  }
}))

export default function ArkanoidScreen () {
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <div className={classes.container}>
        <iframe
          frameBorder='0'
          width='100%'
          height='100%'
          title='ArkanoidScreen'
          src='http://nick-aschenbach.github.io/assets/2015-04-27-arkanoid-game-levels/demo/index.html'
        />
      </div>
      <a href='http://nick-aschenbach.github.io/blog/2015/04/27/arkanoid-game-levels'>See related blog post</a>
    </Container>
  )
}
