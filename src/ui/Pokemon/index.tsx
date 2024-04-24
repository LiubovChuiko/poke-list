import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import Services from 'lib/api/services';
import * as Actions from 'lib/redux/reducers/mainSlice';
import {Config} from 'lib/redux/reducers/mainSlice';
import {Header, PokemonInfo} from 'ui/components';
import './pokemon.scss';

type Store = {main: Config};

export default function PokemonPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pokeName = location.state.name;
  const [pageState, setPageState] = React.useState<PageState>('loading');

  const currentPokemon = useSelector<Store, StoredPokemon | undefined>(
    state => state.main.currentPokemon,
  );
  const storedListType = useSelector<Store, ListType>(
    state => state.main.listType,
  );
  const currentPage = useSelector<Store, number>(
    state => state.main.currentPage,
  );
  const selectedType = useSelector<Store, string>(
    state => state.main.selectedType,
  );

  const init = React.useCallback(async() => {
    if (!pokeName) return;
    const pokemon = await Services.getPokemon(pokeName);
    if (!pokemon?.response) {
      setPageState('error');
      return;
    }
    dispatch(Actions.setCurrentPokemon(pokemon.response));
    setPageState('success');
  }, [dispatch, setPageState, pokeName])

  React.useEffect(() => {
    init();
  }, [])

  const onReturn = React.useCallback(() => {
    dispatch(Actions.setCurrentPokemon(undefined));

    if (storedListType === 'type') {
      navigate(`/pokemons/type/${selectedType}`, {
        state: {typeUid: selectedType},
      });
      return;
    }

    navigate(`/pokemons/${currentPage}`, {state: {page: currentPage}});
  }, [selectedType, currentPage, storedListType, dispatch, navigate]);

  return (
    <>
      <main>
        <div className="wrapper">
          <Header />
          <section className="pokemon-section">
            <div className="breadcrumbs" onClick={() => onReturn()}>
              <span>&larr;&nbsp;&nbsp;Back</span>
            </div>
            <div className="poke-card">
              <h1>{pokeName}</h1>
              <PokemonInfo pageState={pageState} pokemon={currentPokemon} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
