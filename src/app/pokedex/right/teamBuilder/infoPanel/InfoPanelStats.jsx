import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { calculateStatTotal, limitNumber, natureModifiers } from "@/app/lib/helpers";

function InfoPanelStats() {

  const teamState = useSelector(state => state.team);
  

  useEffect(() => {
    
    // find matching nature modifiers so we know which elements to manipulate (i.e. which elements to change background colors of so that we can visually represent which stats get the 10% buff and 10% debuff)
    let found;
    for(let i = 0; i < natureModifiers.length; i++){
      if(natureModifiers[i].name === teamState.team[teamState.focus].nature){
        found = natureModifiers[i]
        break;
      }
    }

    // get a reference to all of the stat-label and stat-value elements (i.e. the <p> tag that show the stat name and the <p> tag that shows the stat value)
      let statLabels = document.getElementsByClassName('stat-label')
      let statValues = document.getElementsByClassName('stat-value')
    // get a reference to the elements that will have their background colors changed
      let buffLabel = document.getElementById(`${found.buff}-label`)
      let buffValue = document.getElementById(`${found.buff}-value`)
      let debuffLabel = document.getElementById(`${found.debuff}-label`)
      let debuffValue = document.getElementById(`${found.debuff}-value`)

      // reset each label/value combo back to blue
      for(let i = 0; i < statLabels.length; i++){
        // reset buffed
        if (statLabels[i].classList.contains('bg-green-500')){
          statLabels[i].classList.remove('bg-green-500')
          statLabels[i].classList.add('bg-blue-500')
        }
        if(statValues[i].classList.contains('bg-green-500')){
          statValues[i].classList.remove('bg-green-500')
          statValues[i].classList.add('bg-blue-500')
        }
        // reset debuffed
        if(statLabels[i].classList.contains('bg-red-500')){
          statLabels[i].classList.remove('bg-red-500')
          statLabels[i].classList.add('bg-blue-500')
        }
        if(statValues[i].classList.contains('bg-red-500')){
          statValues[i].classList.remove('bg-red-500')
          statValues[i].classList.add('bg-blue-500')
        }
      }
      // if the found nature modifier is a neutral nature (i.e. does not apply a buff/debuff), then we stop the useEffect hook from continuing 
      if(!found.buff && !found.debuff){
        return
      } 
      // otherwise we change the background colors of the referenced elements
      else {
        console.log(buffLabel, debuffLabel, 'should be changing')
        buffLabel.classList.remove('bg-blue-500')
        buffLabel.classList.add('bg-green-500')
        buffValue.classList.remove('bg-blue-500')
        buffValue.classList.add('bg-green-500')
        debuffLabel.classList.remove('bg-blue-500')
        debuffLabel.classList.add('bg-red-500')
        debuffValue.classList.remove('bg-blue-500')
        debuffValue.classList.add('bg-red-500')
      }

    

    
  }, [teamState.team[teamState.focus].nature])

  const testFunc = () => {
    let statLabels = document.getElementsByClassName('stat-label')
    let statValues = document.getElementsByClassName('stat-value')

    // statLabels.forEach(label => {
    //   label.classList.remove('bg-blue-500')
    //   label.classList.add('bg-red-500');
    // })

    console.log(statLabels)
  }

  return (
    <>
      {
        teamState.team[teamState.focus].stats?.map((stat, idx) => (
          <div className={`w-full mb-2`} onClick={testFunc}>
            <p key={`${stat.name}-label`} id={`${stat.name}-label`} className="stat-label text-white w-fit bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
              {stat.name}
            </p>
            <div className="flex justify-center items-center">
              <p key={`${stat.name}-value`} id={`${stat.name}-value`} className="stat-value bg-blue-500 w-2/5 text-white rounded-bl-md px-1 text-center relative">
                {teamState.team[teamState.focus].stats ? calculateStatTotal(teamState.team[teamState.focus].stats[idx], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature) : '---'}
              </p>

              <input
                id={`${stat.name.toLowerCase()}Iv`} placeholder="IV" type="number"
                className="w-[30%] text-center border-r border-black/50"
                onChange={(e) => limitNumber(e, 'IV')}
                value={teamState.team[teamState.focus].stats[idx].iv || null}
              />

              <input
                id={`${stat.name.toLowerCase()}Ev`} placeholder="EV" type="number"
                className="w-[30%] rounded-r-md text-center"
                onChange={(e) => limitNumber(e, 'EV')}
                value={teamState.team[teamState.focus].stats[idx].ev || null} />
            </div>
          </div>
        )) || null
      }
    </>
  )
}

export default InfoPanelStats;