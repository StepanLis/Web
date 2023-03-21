function showSalary(users, age) {
    let result = users.filter(item => item.age <= age);
    alert(result.map(item => item.name + `, ` + item.balance).join(`\n`));
}