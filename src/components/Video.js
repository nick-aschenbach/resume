import React from 'react'
import ReactPlayer from 'react-player'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 10,
    width: '100%',
    height: '500px'
  }
}))

export default function Video (props) {
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <div className={classes.container}>

        <ReactPlayer
          width='100%'
          height='100%' playing url={props.url}
        />
      </div>
    </Container>
  )
}
