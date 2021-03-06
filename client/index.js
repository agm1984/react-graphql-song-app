import './style/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router' // could use browserHistory
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'

const client  = new ApolloClient({
    // This runs this code by everything that passes through Apollo
    // We might use o.serialNumber (it must be unique, and must ask for it EVERY query)
    dataIdFromObject: (o) => o.id
})

// Routes are usually defined inside ApolloProvider
const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={SongList} />
                    <Route path="songs/new" component={SongCreate} />
                    <Route path="songs/:id" component={SongDetail} />
                </Route>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
)
