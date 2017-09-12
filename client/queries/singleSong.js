import gql from 'graphql-tag'

export default gql`
    query singleSong($id: ID!) {
        song(id: $id) {
            id
            title
        }
    }
`