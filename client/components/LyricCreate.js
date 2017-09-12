import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import ADDLYRIC_MUTATION from '../mutations/addLyricToSong'

class LyricCreate extends Component {
    constructor(props) {
        super(props)

        this.state = { content: '' }
    }

    onSubmit(event) {
        event.preventDefault()

        this.props.mutate({
                variables: {
                    // You cant use this.props.params.id because this is a child component
                    // This is passed from the parent as a prop (ie: <LyricCreate songId={this.props.params.id} /> )
                    songId: this.props.songId,
                    content: this.state.content
                }
            })
            .then(() => this.setState({ content: '' })) //Upon success, clear form input
            .catch((err) => console.log(err))

        // Clear input state here to have text removed instantly upon submit
        // this.setState({ content: '' })
    }
    render() {
        // Tips
        // 1. value is always this.state.value
        // 2. onChange should always look like this
        // 3. onSubmit goes on the form and make sure onSubmit doesn't have parentheses
        //    and make sure you bind it properly
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input 
                    value={this.state.content}
                    onChange={(event) => this.setState({ content: event.target.value })}
                />
            </form>
        )
    }
}

export default graphql(ADDLYRIC_MUTATION)(LyricCreate)