import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import FETCHSONGS_QUERY from '../queries/fetchSongs'
import ADDSONG_MUTATION from '../mutations/addSong'

class SongCreate extends Component {
    constructor(props) {
        super(props)

        // Default state (empty field)
        this.state = { title: '' }
    }

    onSubmit() {
        event.preventDefault()

        // This runs the mutation
        this.props.mutate({
                variables: {
                    title: this.state.title
                },
                // Queries to re-run after mutating
                // refetchQueries: [{ query: FETCHSONGS_QUERY, variables: obj }]
                refetchQueries: [{ query: FETCHSONGS_QUERY }]
            })
            .then(() => hashHistory.push('/')) // Don't forget to import hashHistory
    }

    // Don't forget to bind(this) when calling onSubmit()
    render() {
        return (
            <div>
                <Link to="/">
                    Back
                </Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input 
                        onChange={(event) => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}

export default graphql(ADDSONG_MUTATION)(SongCreate)
// This creates the mutate property on props