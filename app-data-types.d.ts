type ObjResponse = {
  name: string;
  url: string;
}

type PokeByTypeResponse = {
  pokemon: ObjResponse;
  slot: number;
}

type PokemonsByTypeResponse = {
  id: number;
  name: string;
  pokemon: PokeByTypeResponse[];
}

type MoveResponse = {
  move: ObjRecord;
}

type TypeResponse = {
  type: ObjRecord;
}

type ResponseResult = {
  id?: number;
  count?: null | number;
  next?: null | string;
  previous?: null | string;
  results?: ObjResponse[];
  pokemon?: PokeByTypeResponse[];
  name?: string;
  types?: TypeResponse[];
  moves: MoveResponse[];
}

type ObjRecord = {
  uid: string | undefined;
  name: string;
  url: string;
}

type Move = {
  uid: number;
  name: string;
  url: string;
}

type StoredPokemon = {
  uid: number | undefined;
  name: string | undefined;
  types: any[] | undefined;
  moves: any[] | undefined;
}

type ListType = 'main' | 'type';

type PageState = 'loading' | 'success' | 'error';
