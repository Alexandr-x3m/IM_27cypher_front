import '../styles/globals.css'
import { Provider as ProviderReact, createClient } from 'urql';
import { Provider } from 'react-redux'
import Authenticate from './authenticate'

import store from '../redux/store'


const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchOptions: () => {
    return {
      headers: { 
        'x-hasura-admin-secret': 'kitesurfing' 
      },
    };
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ProviderReact value={client} >
      <Provider store={store} >
        <Authenticate>
        <Component {...pageProps} />
        </Authenticate>
      </Provider>
    </ProviderReact>
  )
}

export default MyApp
