import React from 'react';
import {PokemonCard} from 'ui/components';
import './plist.scss';

type Props = {
  pokemonsList: ObjRecord[];
};

export default function PokemonList(props: Props) {
  const {pokemonsList} = props;

  return (
    <section className="section">
      <div className="row">
        <div className="grid">
          {!!pokemonsList &&
            pokemonsList.map((item: ObjRecord) => (
              <PokemonCard
                key={item.uid}
                uid={item.uid}
                name={item.name}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
