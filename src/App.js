import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import { Provider } from 'react-redux'
import { store } from './store/index'

const router = createBrowserRouter(routes)

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} >
      </RouterProvider>
    </Provider>
  );
}

export default App;
