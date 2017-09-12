import React, { Component } from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'

import LyricCreate from './LyricCreate'

import SINGLESONG_QUERY from '../queries/singleSong'

class SongDetail extends Component {
    render() {
        // console.log(this.props) // this.props.params
        // We have to remember to always handle the case where data doesn't exist yet
        const { song } = this.props.data
        if (!song) return <div>Loading...</div>

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricCreate />
            </div>
        )
    }
}

// This is boilerplate for how to retrieve a single record
export default graphql(SINGLESONG_QUERY, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)
