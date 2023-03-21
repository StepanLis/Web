function getMinMax(str) {
    let tempArray = str.split(` `);
    let rez = tempArray.filter(item => isFinite(item));
    return {
      min: Math.min(...rez),
      max: Math.max(...rez)
    }
  }
  