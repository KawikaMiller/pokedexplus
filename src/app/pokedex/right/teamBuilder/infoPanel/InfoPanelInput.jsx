import React from "react";
import { useSelector } from "react-redux";
import { limitNumber, natureModifiers, capitalizeWord, removeHyphen } from "@/app/lib/helpers";
import { blueTagStyle } from "@/app/pokedex/styles/tailwindClasses";

function InfoPanelInput(props) {

  const teamState = useSelector(state => state.team);
  const Tag = props.htmlTag || 'input'

  return (
      <div className={`${blueTagStyle.container} ${props.classes}`}>
        <p className={blueTagStyle.label}>
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
                teamState.team[teamState.focus].name ? teamState.team[teamState.focus].abilities.map(ability => <option className="rounded-md">{removeHyphen(ability.name)}</option>) : null
              :
              props.label.split(' ')[0] == 'Move' ?
                teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => {
                  if(move.versionDetails.some(vDetail => vDetail.version === teamState.teamGeneration)){
                    return <option className="rounded-md capitalize" value={move.name}>{removeHyphen(move.name)}</option>
                  }
                }) : null
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