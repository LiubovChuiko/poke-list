import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import * as Actions from 'lib/redux/reducers/mainSlice';
import {Config} from 'lib/redux/reducers/mainSlice';
import Services from 'lib/api/services';
import {
  Header,
  PokemonsList,
  PagesNav,
  TypesSelect,
  SearchForm,
} from 'ui/components';

type Props = {
  listType: ListType;
  typeUid?: string;
};

type Store = {main: Config};

export default function Pokemons(props: Props) {
  const {listType, typeUid} = props;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pokeTypes = useSelector<Store, ObjRecord[]>(
    state => state.main.pokeTypes,
  );
  const pokemonsList = useSelector<Store, ObjRecord[]>(
    state => state.main.pokemons,
  );
  const pokemonsCount = useSelector<Store, number>(
    state => state.main.pokemonsCount,
  );
  const currentPage = useSelector<Store, number>(
    state => state.main.currentPage,
  );
  const storedListType = useSelector<Store, ListType>(
    state => state.main.listType,
  );

  const totalPages = Math.ceil(pokemonsCount / 20);

  const init = React.useCallback(async () => {
    dispatch(Actions.setListType(listType));

    if (listType === 'main') {
      const offset = (currentPage - 1) * 20;
      const pList = await Services.getPokemonsList(offset);
      if (!pList || !!pList.error) return;
      dispatch(Actions.setPokemonsCount(pList.count));
      dispatch(Actions.setPokemons(pList.response));
    }

    if (listType === 'type') {
      const typeUid = location.state.typeUid;
      const pList = await Services.getPokemonsByTypeList(typeUid);
      if (!pList || !!pList.error) return;
      dispatch(Actions.setPokemons(pList.response));
      dispatch(Actions.setCurrentPage(1));
    }

    const pTypesList = await Services.getTypesList();
    if (!pTypesList || !!pTypesList.error) return;
    dispatch(Actions.setPokeTypes(pTypesList.response));
  }, [listType, currentPage, location]);

  React.useEffect(() => {
    init();
  }, [location]);

  const onPaginate = React.useCallback(async (page: number) => {
    dispatch(Actions.setCurrentPage(page));
    navigate(`/pokemons/${page}`, {state: {page: page}});
  }, []);

  const onSelectType = React.useCallback((typeUid: string) => {
    dispatch(Actions.setSelectedType(typeUid));
    if (typeUid === 'none') {
      navigate('/');
      return;
    }
    navigate(`/pokemons/type/${typeUid}`, {state: {typeUid: typeUid}});
  }, []);

  return (
    <>
      <main>
        <div className="wrapper">
          <Header />
          
          <TypesSelect typesList={pokeTypes} onSelect={onSelectType} />
          <SearchForm />
          <PokemonsList pokemonsList={pokemonsList} />
          {listType === 'main' && (
            <PagesNav
              defaultPage={currentPage}
              pagesCount={totalPages}
              onPaginate={onPaginate}
            />
          )}
        </div>
      </main>
    </>
  );
}
