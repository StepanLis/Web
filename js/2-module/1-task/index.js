function sumSalary(salaries) {
    let summ = 0;
    for(let key in salaries){
        if (isFinite(salaries[key])){
            summ += salaries[key];
        }
    }
    return summ;
}

let salaries = {
    John: 1000,
    Ann: 1600,
    Pete: 1300,
    month: 'December',
    currency: 'USD',
    isPayed: false
}