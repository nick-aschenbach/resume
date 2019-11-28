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

export default function LinksScreen () {
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <div className={classes.container}>
        <ul>
          <li><a href='https://www.linkedin.com/in/nick-aschenbach-87905b5/'>LinkedIn Profile</a></li>
          <li><a href='https://github.com/nick-aschenbach'>GitHub</a></li>
          <li><a href='http://nick-aschenbach.github.io'>Blog</a></li>
          <li><a href='https://www.instagram.com/nick.aschenbach/'>Instagram</a> (see products/prototypes)</li>
        </ul>
      </div>
    </Container>
  )
}
