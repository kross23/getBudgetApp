'use strict';
let start = document.getElementById('start'); //Кнопку "Рассчитать" через id
start.disabled = true;

let btnPlusIcome = document.getElementsByTagName('button')[0],
    btnPlusExpenses = document.getElementsByTagName('button')[1],

    buttonCancel = document.querySelector('#cancel'),
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    periOd = document.querySelector('.period-select'),
    targetAmount = document.querySelector('.target-amount'),

    expensesItem = document.querySelectorAll('.expenses-items'),

    incomeItems = document.querySelectorAll('.income-items'),
    salaryAmount = document.querySelector('.salary-amount'),
    result = document.getElementsByClassName('result')[0],
    budgetMonthValue = result.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = result.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = result.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = result.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = result.getElementsByClassName('additional_expenses-value')[0],

    incomePeriodValue = result.getElementsByClassName('income_period-value')[0],
    targetMonthValue = result.getElementsByClassName('target_month-value')[0],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),

    periodAmount = document.querySelector('.period-amount');
let restarval = document.querySelectorAll('[type=text]');


class AppData {
    constructor(budget = 0, income = {}, addIncome = [], IncomeSumm = 0, incomeMonth = 0, expenses = {}, addExpenses = [],
        cashIncome = 0, deposit = false, percentDeposit = 0, manyDeposit = 0, mission = 0, period = 0, budgetDay = 0,
        budgetMonth = 0, expensesMonth = 0) {
        this.budget = budget;
        this.income = income; // {} доходы 
        this.addIncome = addIncome;
        this.IncomeSumm = IncomeSumm;
        this.incomeMonth = incomeMonth; // сумма доходов
        this.expenses = expenses; // {} расходы
        this.addExpenses = addExpenses;
        this.cashIncome = cashIncome;
        this.deposit = deposit;
        this.percentDeposit = percentDeposit;
        this.manyDeposit = manyDeposit;
        this.mission = mission;
        this.period = period;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
    }
    start() {
      
        this.getIncExp();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncam();
        this.showResult();
        this.restart();


    }
    getBudget() {
        this.budget = +salaryAmount.value;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        console.log('this.budget: ', this.budget);
        console.log('this.incomeMonth: ', this.incomeMonth);
        console.log('this.expensesMonth: ', this.expensesMonth);
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }
    //.................................................................

    getIncExp() {
        
        const count = item => {
            const sratStr=item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${sratStr}-title`).value;
            const itemImount = item.querySelector(`.${sratStr}-amount`).value;
            if ( itemTitle !== '' && itemImount !== '') {
                this[sratStr][ itemTitle] = itemImount;
            }
        }
        expensesItem.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }

    }
    //''''''''''''''''''''''''''''''''''''''''''''''
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(','); //возможные расходы,через запятую
        //const me = this;
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncam() {     //возможный доход {}
    
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
//.................................................
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');//расход возможный
        additionalIncomeValue.value = this.addIncome.join(', ');  //доход возможный 
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }
    restart() {
        restarval = document.querySelectorAll('[type=text]');
        restarval.forEach(item => {
            item.setAttribute('readonly', 'readonly');
        });
        btnPlusIcome.disabled = true;
        btnPlusExpenses.disabled = true;
        periodSelect.disabled = true;

        start.style.display = 'none';
        buttonCancel.style.display = 'block';
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItem[0].cloneNode(true);
        expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItem = document.querySelectorAll('.expenses-items');
        if (expensesItem.length === 3) {
            btnPlusExpenses.style.display = 'none';
        }
    }
    addIncomeBlock() {
        let cloneincomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneincomeItems, btnPlusIcome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnPlusIcome.style.display = 'none';
        }
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }


    reset() {
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.IncomeSumm = 0;
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.cashIncome = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.manyDeposit = 0;
        this.mission = 0;
        this.period = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

        btnPlusIcome.style.display = 'inline';
        btnPlusExpenses.style.display = 'inline';

        restarval.forEach(item => {
            item.removeAttribute("readonly");
            item.value = '';
        });
        buttonCancel.style.display = 'none';
        expensesItem = document.querySelectorAll('.expenses-items');
        if (expensesItem.length !== 0) {
            for (let i = 0; i < expensesItem.length; i++) {
                if (i > 0) {
                    expensesItem[i].remove();
                }
            }
        }
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length !== 0) {
            for (let i = 0; i < incomeItems.length; i++) {
                if (i > 0) {
                    incomeItems[i].remove();
                }
            }
        }
        btnPlusIcome.removeAttribute('disabled');
        btnPlusExpenses.removeAttribute('disabled');
        periodSelect.removeAttribute('disabled');
        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;
        start.style.display = 'block';
    }
    getStatusIncome () { // функция урвень дохода  
        if (this.budgetDay > 1200) {
            console.log('у вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            console.log('у вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 1) {
            console.log('у вас низкий уровень дохода');
        } else {
            console.log('Что то пошло не так');
        }
    }
    getInfoDeposit  () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('годовой процент ?', 0.5);
            } while (!IsNamber(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
    
            do {
                this.manyDeposit = prompt('сумма депозита ', 10000);
            } while (!IsNamber(this.manyDeposit) || this.manyDeposit === '' || this.manyDeposit === null);
            this.percentDeposit = +this.percentDeposit;
            this.manyDeposit += this.manyDeposit;
        }
    }
    IsNamber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n); //!isNaN(parseFloat(n)) && n !== '';
    }

    //............слушатели..............................
    eventsListeners() {

        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value !== '' && this.IsNamber(salaryAmount.value)) {
                start.removeAttribute('disabled');
            } else {
                start.disabled = true;
            }
        });
        start.addEventListener('click', () => {
            console.log('this: ', this);
            this.start();
        });

        buttonCancel.addEventListener('click', () => {
            this.reset()
        }); // this.reset();
        btnPlusExpenses.addEventListener('click', () => {
            this.addExpensesBlock();
        });

        btnPlusIcome.addEventListener('click', () => {
            this.addIncomeBlock();
        });

        periodSelect.addEventListener('input', () => {
            periodAmount.innerHTML = periodSelect.value;
        });
    }
}; //........class....................................













AppData.prototype.getStatusIncome = function () { // функция урвень дохода  
    if (this.budgetDay > 1200) {
        console.log('у вас высокий уровень дохода');
    } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
        console.log('у вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 1) {
        console.log('у вас низкий уровень дохода');
    } else {
        console.log('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('годовой процент ?', 0.5);
        } while (!IsNamber(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);

        do {
            this.manyDeposit = prompt('сумма депозита ', 10000);
        } while (!IsNamber(this.manyDeposit) || this.manyDeposit === '' || this.manyDeposit === null);
        this.percentDeposit = +this.percentDeposit;
        this.manyDeposit += this.manyDeposit;
    }
};




const appDataX = new AppData();
console.log('appDatax: ', appDataX);
appDataX.eventsListeners();