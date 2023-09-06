import React from "react"
import { Character } from "../../types"

interface CharacterDropdownProps {
  query: string
  characters: Character[]
  onSelect: (val: Character) => void
}
const CharacterDropdown: React.FC<CharacterDropdownProps> = (props) => {
  const { query, characters, onSelect } = props

  const highlightedSuggestion = (name: string) => {
    const nameSplit = name.split(query)

    return (
      <span>
        {nameSplit[0]} <span className="font-extrabold">{query}</span>
        {nameSplit[1]}
      </span>
    )
  }

  return (
    <ul className="shadow border border-gray-400 rounded-md overflow-hidden absolute z-10 bg-white w-full">
      {characters.length < 1 ? <div className="p-4">No Results :(</div> : null}
      {characters.map((item, idx) => (
        <li
          key={idx}
          className="hover:bg-gray-100 p-4 rounded-md m-2 cursor-pointer"
          onClick={() => onSelect(item)}
        >
          {item.name.toLowerCase().indexOf(query) >= 0
            ? highlightedSuggestion(item.name.toLowerCase())
            : item.name}
        </li>
      ))}
    </ul>
  )
}

export default CharacterDropdown
