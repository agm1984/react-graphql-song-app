import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import FETCHSONGS_QUERY from '../queries/fetchSongs'
import DELETESONG_MUTATION from '../mutations/deleteSong'

// GraphQL Strategy
//  1. Identify exact data required
//  2. Write query in GraphiQL and in component file
//  3. Bond query + component
//  4. Access data!

class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({
                variables: { 
                    id
                },
                //refetchQueries: [{ queryName }]
            })
            // This will automatically refresh any queries
            // associated with this query
            .then(() => this.props.data.refetch())
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => { // song was refactored to { id, title }
            // console.log(song)
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>{title}</Link>
                    <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                </li>
            )
        })
    }

    render() {
        // console.log(this.props) // look at songs property this.props.data.songs
        // if query hasn't returned data yet, this.props.data.loading === true
        if (this.props.data.loading) return <div>Loading...</div>

        return ( 
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

// Step 2 (use graphql-tag)
// We need ID for the key of each

// const query = gql`
//     {
//         songs {
//             id
//             title
//         }
//     }
// `

// But, we are going to import it from ../queries/fetchSongs.js


// Step 3 (before & after)
// export default SongList
// export default graphql(FETCHSONGS_QUERY)(SongList) // Use this if only one query
// This creates the data property on props

export default graphql(DELETESONG_MUTATION)(
    graphql(FETCHSONGS_QUERY)(SongList)
)