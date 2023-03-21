function camelize(str){
  str = str.split(`-`).map((word, index) => index ? word[0].toUpperCase() + word.slice(1) : word);
  return str.join(``);
}