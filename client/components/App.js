import React from 'react'

// If ReactRouter passes 'SongList' component,
// it will be the value of children
export default ({ children }) => {
    return <div className="container">{children}</div>
}