export function capitalizeWord(words){
  words = words.split(' ')
  return words.map(word => `${word[0].toUpperCase() + word.slice(1)} `)
}

export function removeHyphen(word){
  return word.replace(`-`, ` `)
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