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
    name: 'Adamant',
    buff: 'ATK',
    debuff: 'SPATK',  
  },
  {
    name: 'Bashful',
    buff: null,
    debuff: null
  },
  {
    name: 'Bold',
    buff: 'DEF',
    debuff: 'ATK',  
  },
  {
    name: 'Brave',
    buff: 'ATK',
    debuff: 'SPD',  
  },
  {
    name: 'Calm',
    buff: 'SPDEF',
    debuff: 'ATK',  
  },
  {
    name: 'Careful',
    buff: 'SPDEF',
    debuff: 'SPATK',  
  },
  {
    name: 'Docile',
    buff: null,
    debuff: null
  },
  {
    name: 'Gentle',
    buff: 'SPDEF',
    debuff: 'DEF',  
  },
  {
    name: 'Hardy',
    buff: null,
    debuff: null
  },
  {
    name: 'Hasty',
    buff: 'SPD',
    debuff: 'DEF',  
  },
  {
    name: 'Impish',
    buff: 'DEF',
    debuff: 'SPATK',  
  },
  {
    name: 'Jolly',
    buff: 'SPD',
    debuff: 'SPATK',  
  },
  {
    name: 'Lax',
    buff: 'DEF',
    debuff: 'SPDEF',  
  },
  {
    name: 'Lonely',
    buff: 'ATK',
    debuff: 'DEF',  
  },
  {
    name: 'Mild',
    buff: 'SPATK',
    debuff: 'DEF',  
  },
  {
    name: 'Modest',
    buff: 'SPATK',
    debuff: 'ATK',  
  },
  {
    name: 'Naive',
    buff: 'SPD',
    debuff: 'SPDEF',  
  },
  {
    name: 'Naughty',
    buff: 'ATK',
    debuff: 'SPDEF',  
  },
  {
    name: 'Quiet',
    buff: 'SPATK',
    debuff: 'SPD',  
  },
  {
    name: 'Quirky',
    buff: null,
    debuff: null
  },
  {
    name: 'Rash',
    buff: 'SPATK',
    debuff: 'SPDEF',  
  },
  {
    name: 'Relaxed',
    buff: 'DEF',
    debuff: 'SPD',  
  },
  {
    name: 'Sassy',
    buff: 'SPDEF',
    debuff: 'SPD',  
  },
  {
    name: 'Serious',
    buff: null,
    debuff: null
  },
  {
    name: 'Timid',
    buff: 'SPD',
    debuff: 'ATK',  
  },
]

// determines how nature affects stats
export const getNatureModifier = (pokemonNature, affectedStatName) => {
  // nature will be undefined if pokemon has a neutral nature (nature that does not buff/debuff any stat)
  let nature = natureModifiers.find(nature => nature.name === pokemonNature);
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

export const calculateStatTotal = (stat, level, nature) => {
  
  if(stat.name === 'HP'){
    return Math.floor(((2 * stat.base_stat + stat.iv + Math.floor(stat.ev / 4)) * level) / 100) + level + 10;
  } else {
    const natureModifier = getNatureModifier(nature, stat.name);
    
    return Math.floor(((Math.floor(((2 * stat.base_stat + stat.iv + Math.floor(stat.ev / 4)) * level) / 100)) + 5) * natureModifier);
  }
}

export const limitNumber = (e, key) => {
  if (key.toUpperCase() === 'EV') {
    e.target.value.length > 3 ?
      e.target.value = e.target.value.substring(0, 3)
      :
      e.target.value == 0 ? e.target.value = '' :
        e.target.value > 255 ? e.target.value = 255 : null
  } else if (key.toUpperCase() === 'IV') {
    e.target.value.length > 2 ?
      e.target.value = e.target.value.substring(0, 2)
      :
      e.target.value == 0 ? e.target.value = '' : e.target.value > 31 ? e.target.value = 31 : null
  } else if (key.toUpperCase() === 'LVL') {
    e.target.value.substring(0, 1) === '0' ? e.target.value = 1 :
      e.target.value.substring(0, 3) >= 100 ? e.target.value = 100 :
        e.target.value > 100 ? e.target.value = e.target.value.substring(0, 2) :
          e.target.value == '' ? e.target.value = '' : null
  }
  return e.target.value;
}