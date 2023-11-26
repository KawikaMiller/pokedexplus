export function capitalizeWord(words){
  words = words.split(' ')
  return words.map(word => `${word[0].toUpperCase() + word.slice(1)} `)
}

export function removeHyphen(word){
  return word.replace(`-`, ` `)
}