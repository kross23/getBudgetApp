'use strict';
let start = document.getElementById('start'); //Кнопку "Рассчитать" через id

// alert(' ошибка,поле "месячный доход" должно быть заоплнено ! ');
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
    //accumulatedMonthValue = document.querySelector('.accumulated_month-value')[0];

    incomePeriodValue = result.getElementsByClassName('income_period-value')[0],
    targetMonthValue = result.getElementsByClassName('target_month-value')[0],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items'),

    periodAmount = document.querySelector('.period-amount');
    //restartvalue= document.querySelectorAll('input'),  //document.querySelectorAll('.data > input');
    //    restartvalue= document.querySelector('.data');
    //    console.log('data: ',restartvalue);
   let restarval=document.querySelectorAll('[type=text]');


console.log('value',restarval);
let money,
    IsNamber = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n); //!isNaN(parseFloat(n)) && n !== '';
    };

let appData = {
    budget: 0,
    income: {}, //
    addIncome: [],
    IncomeSumm: 0,
    incomeMonth: 0,
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
    start: function () {
        console.log('this', this);
        // return;///document.getElementById("MyButton").disabled = true;

        this.budget = +salaryAmount.value;
        console.log('appData.budget: ', this.budget);
        console.log('salaryAmount.value: ', salaryAmount.value);

        this.getExpenses();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncam();
        this.getIcome();
        this.showResult();
       

    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcSavedMoney();
            console.log('showResult', this);
        });


    },
    addExpensesBlock: function () {
        console.log('addExpensesBlock', this);
        //console.log('', expensesItem.parentNode);
        let cloneExpensesItem = expensesItem[0].cloneNode(true);
       
        

        expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItem = document.querySelectorAll('.expenses-items');
        if (expensesItem.length === 3) {
            btnPlusExpenses.style.display = 'none';
        }

    },
    getExpenses: function () {
        console.log('getExpensesk', this);
        let me = this;
        expensesItem.forEach(function (item) {
             console.log('item', item);
            let itemExpenses = item.querySelector('.expenses-title').value;
            let keshExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && keshExpenses !== '') {
                me.expenses[itemExpenses] = keshExpenses;
            }
        
        });
    },
    addIncomeBlock: function () {
        console.log('addIncomeBlock', this);
        
        let cloneincomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneincomeItems, btnPlusIcome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnPlusIcome.style.display = 'none';
        }
    },
    getIcome: function () {
        console.log('incomeItems', this);
        let me = this;
        incomeItems.forEach(function (item) {
             
            let itemIncome = item.querySelector('.income-title').value;
            let keshIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && keshIncome !== '') {
                me.income[itemIncome] = keshIncome;
            }
        });
        //...............................
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },
    getAddExpenses: function () {
        console.log('getAddExpenses', this);
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncam: function () {
        console.log('getAddIncam', this);
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },
    //---методы----
    getExpensesMonth: function () {
        console.log('getExpensesMonth', this);
        for (let i in this.expenses) {
            this.expensesMonth += +this.expenses[i];
        }
        console.log('сумма расходов-', this.expensesMonth);
    },
    getBudget: function () { // пере
        console.log(' getBudget', this);
        this.budgetMonth = (this.budget - this.expensesMonth);
        this.budgetDay = Math.ceil(this.budgetMonth / 30);

    },
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function () { // функция урвень дохода  
        if (this.budgetDay > 1200) {
            console.log('у вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            console.log('у вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 1) {
            console.log('у вас низкий уровень дохода');
        } else {
            console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
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
    },
    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    }
};
const binden = () => {
    for (let key in appData) {
        if (typeof appData[key] === 'function') {
            appData[key] = appData[key].bind(appData);
        }
    }
};
binden();
salaryAmount.addEventListener('input', function () {
    if (salaryAmount.value !== '' && IsNamber(salaryAmount.value)) {
        
        start.removeAttribute('disabled');
    } else {
        start.disabled = true;
    }
});
const restart= function(){
 restarval.forEach(function(item){
    item.setAttribute("readonly", "readonly");
 });
start.style.display= 'none';
//display
buttonCancel.style.display= 'block';
};
start.addEventListener('click', function(){
        appData.start();
        restart();
});
buttonCancel.addEventListener('click',function(){
    restarval.forEach(function(item){
        item.removeAttribute("readonly");
        item.value='';
     });
buttonCancel.style.display= 'none';
if (expensesItem.length !== 0) {
  for( let i=0;i<expensesItem.length;i++){
      if(i>0){
          expensesItem[i].remove();
      }
  }
}
if (incomeItems.length !== 0) {
    for( let i=0;i<incomeItems.length;i++){
        if(i>0){
            incomeItems[i].remove();
        }
    }
}
start.style.display= 'block';
});
//........................................................
btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIcome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
});