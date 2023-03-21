function highlight(table) {
  for(let row of table.children[1].rows){

    if(row.cells[3].hasAttribute("data-available")){
      if(row.cells[3].getAttribute("data-available") === "true"){
        row.classList.add("available");
      }else{
        row.classList.add("unavailable");
      }
    }else{
      row.setAttribute("hidden", "true");
    }
    
    if(row.cells[2].textContent === 'm'){
      row.classList.add("male");
    }else{
      row.classList.add("female");
    }

    if(row.cells[1].textContent < 18){
      row.style.textDecoration = "line-through";
    }

  }
}






















// for(let row of table.children[1].rows){
//   if(row.cells[3].hasAttribute("data-available")){
//     if(row.cells[3].getAttribute("data-available") === "true"){
//       row.classList.add("available");
//     }else{
//       row.classList.add("unavailable");
//     }
//   }else{
//     row.setAttribute("hidden", "true");
//   }

//   if(row.cells[2].textContent === "m"){
//     row.classList.add("male");

//   }else{
//     row.classList.add("female");
//   }

//   if(row.cells[1].textContent < 18){
//     row.style.textDecoration = "line-through";
//   }
// }