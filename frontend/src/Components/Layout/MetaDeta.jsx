import React from 'react'
import { Helmet } from 'react-helmet'
function MetaDeta({title}) {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaDeta