
import { StyleSheet, Text, View } from 'react-native';
import { store } from './store/store'
import { Provider } from 'react-redux'
import MainNavigation from './screens/MainNavigation';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import TodoScreen from './todoQueries/TodoScreen';

// Create a client
const queryClient = new QueryClient()

export default function App() {
  return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MainNavigation />  
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
