function filterRange(arr, a, b) {
  let mass = [];
  for (let i = 0; i < arr.length; i++){
      alert(arr[i]);
      if (arr[i] >= a && arr[i] <= b){
          mass.push(arr[i]);
      }
  }
  return mass;
}