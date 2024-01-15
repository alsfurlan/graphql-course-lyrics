import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import SongList from './components/SongList';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import './style/style.css';
import SongEdit from './components/SongEdit';
import LoginForm from './components/LoginForm';
import requireAuth from './components/requireAuth';

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={requireAuth(SongList)} />
          <Route path='songs/new' component={requireAuth(SongCreate)} />
          <Route path='songs/:id' component={requireAuth(SongDetail)} />
          <Route path='songs/edit/:id' component={requireAuth(SongEdit)} />
          <Route path='login' component={LoginForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
