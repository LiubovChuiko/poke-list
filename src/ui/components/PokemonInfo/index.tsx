import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as Actions from 'lib/redux/reducers/mainSlice';
import {getUID} from 'lib/utils';
import {Spinner} from 'ui/components';

type Props = {
  pokemon?: StoredPokemon;
  pageState: PageState;
};

export default function PokemonInfo(props: Props) {
  const {pageState, pokemon} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgSrc = pokemon
    ? `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`
    : '/assets/38.png';

  const onTypeClick = React.useCallback((typeUri: string) => {
    const typeUid = getUID(typeUri);
    dispatch(Actions.setSelectedType(typeUid));
    navigate(`/pokemons/type/${typeUid}`, {state: {typeUid: typeUid}});
  }, []);

  return (
    <div className="info-section">
      {pageState === 'loading' && <Spinner />}
      {pageState === 'error' && (
        <div>
          <div>
            <span className="title">Seems like I don't exist 👀</span>
          </div>
          <img src="/assets/38.png" />
          <h4 className="title">OOOPS!</h4>
        </div>
      )}
      {pageState === 'success' && (
        <>
          <div className="types-grid">
            {!!pokemon &&
              pokemon.types?.map((item: any) => (
                <div
                  key={getUID(item.type.url)}
                  className="type"
                  onClick={() => onTypeClick(item.type.url)}>
                  <span>{item.type.name}</span>
                </div>
              ))}
          </div>
          <div>
            <img src={imgSrc} />
          </div>
          <div>
            <span className="title">Moves:</span>
            <div className="moves">
              {!!pokemon &&
                pokemon.moves?.map((item: any) => <div>{item.move.name}</div>)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
