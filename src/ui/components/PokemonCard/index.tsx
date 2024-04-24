import React from 'react';
import {useNavigate} from 'react-router-dom';
import './pcard.scss';

type Props = {
  uid: string | undefined;
  name: string;
};

export default function PokemonCard(props: Props) {
  const {name} = props;
  const navigate = useNavigate();
  const imgSrc = `https://img.pokemondb.net/artwork/${name}.jpg`;

  const onClick = React.useCallback(() => {
    navigate(`/pokemon/${name}`, {state: {name: name}});
  }, [navigate, name]);

  return (
    <div className="card" onClick={() => onClick()}>
      <img src={imgSrc}  alt={name} />
      <h1>{name}</h1>
    </div>
  );
}
