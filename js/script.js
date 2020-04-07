'use ctrict';
let buttonStart = document.getElementById('start'); //Кнопку "Рассчитать" через id
let btnPlusIcome = document.getElementsByTagName('button')[0];
let btnPlusExpenses = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let getValue = document.querySelectorAll('.result-total');///"input[type=checkbox][value=Y]"
let periOd = document.querySelector('.period-select');
let targetAmount = document.querySelector('target-amount');
let expensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelector('.income-items');
let salaryAmount = document.querySelector('.salary-amount');
console.log('salaryAmount: ', salaryAmount);
console.log('incomeItems: ', incomeItems);
console.log(' expensesItem: ',  expensesItem);
console.log('targetAmount : ', targetAmount );
console.log('periOd: ', periOd);
console.log('getValue: ', getValue);
console.log('additionalIncomeItem: ', additionalIncomeItem);
console.log('depositCheck: ', depositCheck);
console.log('btnPlusExpenses: ', btnPlusExpenses);
console.log('btnPlusIcome: ', btnPlusIcome);
console.log('buttonStart: ', buttonStart);