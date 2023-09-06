import * as React from "react"
import { useDebounce } from "use-debounce"
import SearchInput from "./components/SearchInput"

import Loader from "./components/Loader"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { searchCharacters } from "./app/characterSlice"
import CharacterDropdown from "./components/CharacterDropdown"
import { Character } from "./types"
import CharacterCard from "./components/CharacterCard"

const MIN_QUERY_LENGTH = 2

function App() {
  const [query, setQuery] = React.useState("")
  const [debouncedQuery] = useDebounce(query, 500)
  const [selectedCharacter, setSelectedCharacter] = React.useState(
    null as any as Character,
  )
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector((state) => state.characters)

  React.useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= MIN_QUERY_LENGTH) {
      dispatch(searchCharacters({ query: debouncedQuery }) as any)

      if (!isDropdownOpen) {
        setIsDropdownOpen(true)
      }
    }
  }, [debouncedQuery])

  const handleSelect = (character: Character) => {
    setIsDropdownOpen(false)
    setSelectedCharacter(character)
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-10">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Star Wars Character Searcher
        </h2>

        <div className="mb-2 w-full">
          <SearchInput onChange={setQuery} value={query} />
        </div>

        {isDropdownOpen && status !== "loading" && (
          <div className="relative">
            <CharacterDropdown
              characters={items}
              onSelect={handleSelect}
              query={query.toLowerCase()}
            />
          </div>
        )}

        {status === "loading" && (
          <div className="m-5">
            <Loader />
          </div>
        )}

        {selectedCharacter && <CharacterCard character={selectedCharacter} />}
      </div>
    </div>
  )
}

export default App
