export function capitalizeWord(words){
  if(words){
    words = words.split(' ')
    return words.map(word => `${word[0].toUpperCase() + word.slice(1)} `)
  } else return ''
}

export function removeHyphen(word){
  return word.replace(`-`, ` `)
}

export function editPokemonName(word){
  return `(${word})`
}

export function determineTypeEffectiveness(typeInfo){
  
  let types = ['normal', 'fire', 'water', 'grass', 'electric', 'flying', 'bug', 'rock', 'ground', 'fighting', 'steel', 'poison', 'ice', 'dragon', 'ghost', 'psychic', 'dark', 'fairy'];

  let typeEffectiveness = types.map(type => {
    return {
      type: type,
      effectiveness: 1
    }
  });

  typeInfo.forEach(element => {
    element.doubleDamageFrom.forEach(item => {
      typeEffectiveness.forEach(element => {
        if (element.type.toLowerCase() === item.toLowerCase()) {
          element.effectiveness *= 2;
        }
      })
    })
  })

  typeInfo.forEach(element => {
    element.halfDamageFrom.forEach(item => {
      typeEffectiveness.forEach(element => {
        if(element.type.toLowerCase() === item.toLowerCase()) {
          element.effectiveness /= 2;
        }
      })
    })
  })

  typeInfo.forEach(element => {
    element.noDamageFrom.forEach(item => {
      typeEffectiveness.forEach(element => {
        if(element.type.toLowerCase() === item.toLowerCase()) {
          element.effectiveness = 0;
        }
      })
    })
  })

  console.log(typeEffectiveness)

  return typeEffectiveness;
}

// all natures & their affected stats
export const natureModifiers = [
  {
    name: 'Lonely',
    buff: 'ATK',
    debuff: 'DEF',  
  },
  {
    name: 'Adamant',
    buff: 'ATK',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Naughty',
    buff: 'ATK',
    debuff: 'SP.DEF',  
  },
  {
    name: 'Brave',
    buff: 'ATK',
    debuff: 'SPD',  
  },
  {
    name: 'Bold',
    buff: 'DEF',
    debuff: 'ATK',  
  },
  {
    name: 'Impish',
    buff: 'DEF',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Lax',
    buff: 'DEF',
    debuff: 'SP.DEF',  
  },
  {
    name: 'Relaxed',
    buff: 'DEF',
    debuff: 'SPD',  
  },
  {
    name: 'Modest',
    buff: 'SP.ATK',
    debuff: 'ATK',  
  },
  {
    name: 'Mild',
    buff: 'SP.ATK',
    debuff: 'DEF',  
  },
  {
    name: 'Rash',
    buff: 'SP.ATK',
    debuff: 'SP.DEF',  
  },
  {
    name: 'Quiet',
    buff: 'SP.ATK',
    debuff: 'SPD',  
  },
  {
    name: 'Calm',
    buff: 'SP.DEF',
    debuff: 'ATK',  
  },
  {
    name: 'Gentle',
    buff: 'SP.DEF',
    debuff: 'DEF',  
  },
  {
    name: 'Careful',
    buff: 'SP.DEF',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Sassy',
    buff: 'SP.DEF',
    debuff: 'SPD',  
  },
  {
    name: 'Timid',
    buff: 'SPD',
    debuff: 'ATK',  
  },
  {
    name: 'Hasty',
    buff: 'SPD',
    debuff: 'DEF',  
  },
  {
    name: 'Jolly',
    buff: 'SPD',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Naive',
    buff: 'SPD',
    debuff: 'SP.DEF',  
  }
]

// determines how nature affects stats
export const getNatureModifier = (natureModifiersArr, pokemonNature, affectedStatName) => {
  // nature will be undefined if pokemon has a neutral nature (nature that does not buff/debuff any stat)
  let nature = natureModifiersArr.find(nature => nature.name.toLowerCase() === pokemonNature);
  let modifier = 1;

  // if nature is undefined, modifier stays at 1
  if (nature) {
    if (nature.buff === affectedStatName) {
      modifier = 1.1;
    } else if (nature.debuff === affectedStatName) {
      modifier = 0.9;
    }      
  }

  return modifier;
}