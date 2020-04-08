'use ctrict';
'use strict';
let money,
    IsNamber = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n); //!isNaN(parseFloat(n)) && n !== '';
    };
const statr = () => {
    do {
        money = prompt('Ваш месячный доход?', 30000);
    } while (!IsNamber(money) || money === null);
    money = +money;
};
//statr();


let appData = {
    budget: money,
    income: {}, //
    addIncome: [],
    IncomeSumm: 0,
    expenses: {},
    addExpenses: [],
    cashIncome: 0,
    deposit: false,
    percentDeposit: 0,
    manyDeposit: 0,
    mission: 150000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    //---методы----
    asking: () => {
        if (confirm('есть ли у вас дополнительный заработок?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('какой дополнительный заработок', 'такси');
            } while (IsNamber(itemIncome) || itemIncome === '' || itemIncome === null);
            do {
                cashIncome = prompt('выходит в месяц', 500);
            } while (!IsNamber(cashIncome) || cashIncome === '' || cashIncome === null);
            cashIncome = +cashIncome;
            appData.IncomeSumm += cashIncome; //сумма дополнительного заработка
            appData.income[itemIncome] = cashIncome;

        }

        let add;
        do {
            add = prompt('Возможные расходы за рассчитываемый период через запятую', 'бензин,молоко,батарейки,спички');
        } while (IsNamber(add) || add === '' || add === null);

        appData.addExpenses = add.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 1; i < 3; i++) {
            let sum, text;

            do {
                text = prompt('введите статью расходов:', 'текст - ' + i);
            } while (IsNamber(text) || text === '' || text === null);

            do {
                sum = prompt('во сколько это обойдется?', 1500 + i);
            } while (!IsNamber(sum) || sum === '' || sum === null);
            sum = +sum;
            appData.expenses[text] = sum;
        }
    },
    getExpensesMonth: () => {
        for (let i in appData.expenses) {
            appData.expensesMonth += appData.expenses[i];
        }
        console.log('сумма расходов-', appData.expensesMonth);
    },
    getBudget: () => { // пере
        appData.budget = money;
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);

    },
    getTargetMonth: (a) => {
        return appData.mission / appData.budgetMonth;
    },
    getStatusIncome: () => { // функция урвень дохода  
        if (appData.budgetDay > 1200) {
            console.log('у вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            console.log('у вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 1) {
            console.log('у вас низкий уровень дохода');
        } else {
            console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: () => {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('годовой процент ?', 0.5);
            } while (!IsNamber(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);

            do {
                appData.manyDeposit = prompt('сумма депозита ', 10000);
            } while (!IsNamber(appData.manyDeposit) || appData.manyDeposit === '' || appData.manyDeposit === null);
            appData.percentDeposit = +appData.percentDeposit;
            appData.manyDeposit += appData.manyDeposit;
        }
    },
    calcSavedMoney: () => {
        return appData.budgetMonth * appData.period;
    }
};
//..........................................................
// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();

// console.log('appData.calcSavedMoney(): ', appData.calcSavedMoney());
// console.log(typeof (money));
// console.log(appData.deposit);
// console.log('расходы за месяц' + appData.expensesMonth);
// console.log('Наша программа включает в себя данные:');
// console.log('money', appData.calcSavedMoney);
// console.log('процент', appData.percentDeposit);
// console.log('deposit', appData.manyDeposit);
//  appData.addExpenses.join(' , ');
// let addexp=[];
// for(let i=0 ;i < appData.addExpenses.length ;i++ ){
//   let ad = appData.addExpenses[i];
//   ad=ad[0].toUpperCase() + ad.slice(1);
//   addexp[i] = ad;
// }

// console.log(' appData. С заглавной буквы : ', addexp.join(' , ')); //расходы (addExpenses) вывести строкой 
// for (let i in appData) {
//   console.log('ключ : ' + i + ' значение ' + appData[i]);
// }




let buttonStart = document.getElementById('start'); //Кнопку "Рассчитать" через id
let btnPlusIcome = document.getElementsByTagName('button')[0];
let btnPlusExpenses = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let periOd = document.querySelector('.period-select');
let targetAmount = document.querySelector('target-amount');
let expensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelector('.income-items');
let salaryAmount = document.querySelector('.salary-amount');
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let  targetMonthValue = document.querySelector('.target_month-value');

console.log('targetMonthValue: ', targetMonthValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('budgetDayValue: ', budgetDayValue);
console.log('budgetMonthValue:!!!! ', budgetMonthValue);



console.log('additionalIncomeItem: ', additionalIncomeItem);
console.log('incomeItems: ', incomeItems);
console.log(' expensesItem: ', expensesItem);

console.log('depositCheck: ', depositCheck);
console.log('targetAmount : ', targetAmount);
console.log('periOd: ', periOd);


console.log('btnPlusExpenses: ', btnPlusExpenses);
console.log('btnPlusIcome: ', btnPlusIcome);
console.log('buttonStart: ', buttonStart);
console.log('salaryAmount: ', salaryAmount);