import React, { Component } from 'react'

class LyricCreate extends Component {
    constructor(props) {
        super(props)

        this.state = { content: '' }
    }

    onSubmit(event) {
        console.log('test')
        event.preventDefault()
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
                    value={this.state.value}
                    onChange={(event) => this.setState({ content: event.target.value })}
                />
            </form>
        )
    }
}

export default LyricCreate