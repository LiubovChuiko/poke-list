import {createBrowserRouter} from 'react-router-dom';
import { Pokemon, Pokemons } from 'ui';

const router = createBrowserRouter([
    {
      path: '/',
      element:  <Pokemons listType={'main'} />,
    },
    {
      path: '/pokemon/:id',
      element: <Pokemon />,
    },
    {
      path: '/pokemons/:id',
      element: <Pokemons listType={'main'} />,
    },
    {
      path: '/pokemons/type/:id',
      element: <Pokemons listType={'type'} />,
    },
  ]);

  export default router;