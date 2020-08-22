import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import {ApolloProvider} from 'react-apollo';
import './App.css';
import PageMain from './pages/pageMain/pageMain';
import PageShop from './pages/pageShop/pageShop';
import PageOneGood from './pages/pageOneGood/pageOneGood';
import PageOneCategory from './pages/pageOneCategory/pageOneCategory';
import PageLogin from './pages/pageLogin/pageLogin';
import PageAccount from './pages/pageAccount/pageAccount';
import PageRegistration from './pages/pageRegistration/pageRegistration';
import PageBasket from './pages/pageBasket/pageBasket';
import {ProtectedRoute} from './components/protectedRouter/Router';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import PageAbout from './pages/pageAbout/pageAbout';
import Header from './components/header/header';

const PageNotFound = () => {
  return (
    <>
      <Header />
      <main id='wrapper-404'>
        <img src={require('./media/404.gif')} alt="Page Not Found" />  
      </main>
    </>
  )
};

const history = createHistory();

const httpLink = createHttpLink({
  uri: 'https://jewerly.herokuapp.com/graphql'
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache,
});
  
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter history={history}>
        <Switch>
          <Route path='/' component={PageMain} exact />
          <Route path='/shop' component={PageShop} exact />
          <Route path='/shop/:nameCategory' component={PageOneCategory} exact />
          <Route path='/shop/:nameCategory/:idGood' component={PageOneGood} />
          <Route path='/login' component={PageLogin} />
          <Route path='/about-us' component={PageAbout} />
          <Route path='/registration' component={PageRegistration} /> 
          <ProtectedRoute path='/account' component={PageAccount} exact />
          <ProtectedRoute path='/account/basket' component={PageBasket} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </BrowserRouter>  
    </ApolloProvider>
  );
};

export default App;