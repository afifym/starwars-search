export const getCharacters = async (val: string) => {
  const res = await fetch(`https://swapi.dev/api/people/?search=${val}`)
  const data = await res.json()
  return data
}
