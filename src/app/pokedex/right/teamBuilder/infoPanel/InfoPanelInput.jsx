import React from "react";
import { useSelector } from "react-redux";
import { limitNumber, natureModifiers, capitalizeWord, removeHyphen } from "@/app/lib/helpers";

function InfoPanelInput(props) {

  const teamState = useSelector(state => state.team);
  const Tag = props.htmlTag || 'input'

  return (
      <div className={`flex flex-col relative ${props.classes}`}>
        <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
          {props.label}
        </p>
        <Tag
          id={`${props.id.toLowerCase()}`}
          placeholder={`${props.label}`}
          type={`${props.type}` || null}
          value={props.value || null}
          onChange={props.onChange}
          className={`h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`} >
            {
              props.id === 'nature' ?
                natureModifiers.map(nature => <option className="rounded-md">{nature.name}</option>)
              :
              props.id == 'battle-ability' ?
                teamState.team[teamState.focus].name ? teamState.team[teamState.focus].abilities.map(ability => <option className="rounded-md">{capitalizeWord(removeHyphen(ability.name))}</option>) : null
              :
              props.label.split(' ')[0] == 'Move' ?
                teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md" value={move.name}>{capitalizeWord(removeHyphen(move.name))}</option>) : null
              :
              props.id === 'held-item' ?
                <option>TBA</option>
              :
              null
            }

          </Tag>
      </div>
  )
}

export default InfoPanelInput;