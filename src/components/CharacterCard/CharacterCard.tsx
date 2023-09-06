import React from "react"
import { Character } from "../../types"
import Attribute from "../Attribute"

interface CharacterProps {
  character: Character
}

const CharacterCard: React.FC<CharacterProps> = (props) => {
  const { character } = props

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
      {Object.entries(character).map((item, idx) => (
        <div key={idx}>
          <Attribute
            label={item[0]}
            value={Array.isArray(item[1]) ? item[1].join(", ") : item[1]}
          />
        </div>
      ))}
    </div>
  )
}

export default CharacterCard
