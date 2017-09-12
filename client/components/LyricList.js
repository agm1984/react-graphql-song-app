import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import LIKELYRIC_MUTATION from '../mutations/likeLyric'

class LyricList extends Component {
    onLike(id, likes) {
        // console.log(id)
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: (likes + 1)
                }
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        {likes}
                        <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

export default graphql(LIKELYRIC_MUTATION)(LyricList)