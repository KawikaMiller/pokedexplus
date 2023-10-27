import React from "react";

function MyMain (props) {

  return(
    <div id='my-main' style={{overflowY:'scroll'}}>

      <div id='left-side' style={{border: '1px solid red'}}>
        <div id='left-side-top' style={{height: '60%', display: 'flex', border: '1px solid red'}}>
          <div id='left-side-top-left'style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: '0.5rem', width: '66%', height: 'auto'}}>
            <div id='pokemon-image' style={{border: '1px solid red', height: '66%'}}>

            </div>
            <div id='pokemon-image-toggles' style={{border: '1px solid red', height: '10%'}}>

            </div>
            <div id='pokemon-basic-info' style={{border: '1px solid red', height: '24%'}}>
              <div id='basic-info-top' style={{display: 'flex', justifyContent: 'space-between', height: '50%'}}>
                <h1 id='pokemon-name'>Bulbasaur</h1> 
                <h1 id='pokemon-number'>#0001</h1>
              </div>
              <div id='basic-info-bot' style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 id='pokemon-category'>The Seed Pokemon</h1> 
                <div id='pokemon-types' style={{display: 'flex', justifyContent: 'space-between', width: '33%'}}>
                  <div id='type1' style={{border: '1px solid red', width: '50%'}}>Type 1</div>
                  <div id='type2' style={{border: '1px solid red', width: '50%'}}>Type 2</div>
                </div>
              </div>
            </div>
          </div>
          <div id='left-side-top-right' style={{backgroundColor: 'rgba(125, 55, 200, 0.25)', margin: '0.5rem', width: '33%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <section id='pokemon-bio-height'  style={{border: '1px solid green'}}>Height: </section>
            <section id='pokemon-bio-weight'>Weight: </section>
            <section id='pokemon-bio-gender'>Gender Ratio: </section>
            <section id='pokemon-bio-egg'>Egg Group: </section>
            <section id='pokemon-bio-hatch'>Hatch Time: </section>
            <section id='pokemon-bio-growth'>Growth Rate: </section>
            <section id='pokemon-bio-catch'>Catch Rate: </section>
            <section id='pokemon-bio-ev'>EV Yield: </section>
            <section id='pokemon-bio-exp'>EXP Yield: </section>
          </div>
        </div>
        <div id='left-side-mid' style={{height: '20%', display: 'flex', justifyContent: 'space-between'}}>
          <div id='pokemon-type-matchup' style={{border: '1px solid red', width: '66%', margin: '0.5rem'}}>
            type matchup
          </div>
          <div id='pokemon-base-stats'  style={{border: '1px solid red', width: '33%', margin: '0.5rem'}}>
            base stats
          </div>
        </div>
        <div id='left-side-bot' style={{height: '20%'}}>
          <div id='pokemon-pokedex-entries' style={{border: '1px solid red', height: 'calc(100% - 0.5rem)', margin: '0 0.5rem'}}>
            <div id='pokedex-entries-gen-selector' style={{border: '1px solid red'}}>
              pokedex gen selctor
            </div>
              pokedex entry
          </div>
        </div>
      </div>

      <div id='right-side' style={{border: '1px solid blue', flexGrow: '1'}}>
        <div id='moves-container' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between', border: '1px solid black', padding: '0.5rem', height: '100%'}}>
          <div id='moves-header' style={{flexGrow: '1', border: '1px solid red', height: '100px', width: '100%'}}>
            <div>Top</div>
            <div>Bot</div>
          </div>
          <div id='moves-list' style={{flexGrow: '4', border: '1px solid red', height: '500px', width: '100%', margin: '0.5rem 0'}}>
            <div className="move-row" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div>Level</div>
              <div>Name</div>
              <div>Power</div>
              <div>Accuracy</div>
              <div>PP</div>
              <div>Damage</div>
              <div>Type</div>
            </div>
          </div>
          <div id='moves-details' style={{flexGrow: '1', border: '1px solid red', height: '150px', width: '100%', display: 'flex'}}>
            <div id='move-type-effectiveness' style={{border: '1px solid red', flexGrow: '1'}}>
              <div id='selected-move-name'>
                Solar-Beam
              </div>
              <div id='selected-move-strong-against'>
                Strong Against: 
              </div>
              <div id='selected-move-weak-against'>
                Weak Against: 
              </div>
            </div>
            <div id='move-description' style={{border: '1px solid white', flexGrow: '2'}}>

            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default MyMain;