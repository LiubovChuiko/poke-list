const TRIM_TYPE = /^https?:\/\/pokeapi.co\/api\/v2\/type\//g;
const TRIM_POKE = /^https?:\/\/pokeapi.co\/api\/v2\/pokemon\//g;

export const getUID = (str: string) => {
  if (str.includes('pokemon')) {
    const trim = str.replace(TRIM_POKE, '');
    return trim.replace(/\//g, '');
  }

  if (str.includes('type')) {
    const trim = str.replace(TRIM_TYPE, '');
    return trim.replace(/\//g, '');
  }
  return;
};
