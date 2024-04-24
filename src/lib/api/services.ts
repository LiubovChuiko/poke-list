import {getApi} from './baseAPI';
import * as URI from './constants';
import {getUID} from 'lib/utils';

export default class APIServices {
  static updateObjects = async (typesList: ObjResponse[] | undefined) => {
    if (!typesList) return;
    let prepared: ObjRecord[] = [];

    typesList.forEach(doc => {
      const newRecord: ObjRecord = {
        uid: getUID(doc.url),
        name: doc.name,
        url: doc.url,
      };

      prepared.push(newRecord);
    });

    return prepared;
  };

  static updateObjectsbyType = async (
    typesList: PokeByTypeResponse[] | undefined,
  ) => {
    if (!typesList) return;
    let prepared: ObjRecord[] = [];

    typesList.forEach(doc => {
      const newRecord: ObjRecord = {
        uid: getUID(doc.pokemon.url),
        name: doc.pokemon.name,
        url: doc.pokemon.url,
      };

      prepared.push(newRecord);
    });

    return prepared;
  };

  static getPokemonsList = async (offset: number) => {
    let count;
    let response;
    let error;

    try {
      const endpoint =
        URI.API_POKEMONS_LIST + '?limit=20&offset=' + String(offset);
      const res = await getApi(endpoint);
      if (!res.response) return;
      count = res.response.count;
      response = await this.updateObjects(res.response.results);
    } catch (err) {
      error = err;
    }

    return {count, response, error};
  };

  static getPokemonsByTypeList = async (typeUid: string) => {
    let response;
    let error;

    try {
      const endpoint = URI.API_POKEMONS_TYPES + typeUid + '/';
      const res = await getApi(endpoint);
      if (!res.response) return;
      response = await this.updateObjectsbyType(res.response.pokemon);
    } catch (err) {
      error = err;
    }

    return {response, error};
  };

  static getTypesList = async () => {
    let response;
    let error;

    try {
      const res = await getApi(URI.API_POKEMONS_TYPES);
      if (!res.response) return;
      response = await this.updateObjects(res.response.results);
    } catch (err) {
      error = err;
    }

    return {response, error};
  };

  static updatePokemon = async (typesList: ObjResponse[] | undefined) => {
    if (!typesList) return;
    let prepared: ObjRecord[] = [];

    typesList.forEach(doc => {
      const newRecord: ObjRecord = {
        uid: getUID(doc.url),
        name: doc.name,
        url: doc.url,
      };

      prepared.push(newRecord);
    });

    return prepared;
  };

  static getPokemon = async (name: string) => {
    let response;
    let error;

    try {
      const endpoint = URI.API_POKEMON + name;
      const res = await getApi(endpoint);
      if (!res.response) return;
      const pokemon: StoredPokemon = {
        uid: res.response.id,
        name: res.response.name,
        types: res.response.types,
        moves: res.response.moves,
      };
      response = pokemon;
    } catch (err) {
      error = err;
    }

    return {response, error};
  };
}
