'use strict';
const start = document.getElementById('start'); //Кнопку "Рассчитать" через id
//start.disabled = true;

const btnPlusIcome = document.getElementsByTagName('button')[0],
	btnPlusExpenses = document.getElementsByTagName('button')[1],

	buttonCancel = document.querySelector('#cancel'),
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	//periOd = document.querySelector('.period-select'),
	targetAmount = document.querySelector('.target-amount'),

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
	periodAmount = document.querySelector('.period-amount'),
	depositBanck = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPersent = document.querySelector('.deposit-percent');
let restarval = document.querySelectorAll('[type=text]'),
	incomeItems = document.querySelectorAll('.income-items'),
	expensesItem = document.querySelectorAll('.expenses-items');
	 depositCheck.setAttribute('disabled',true);
const IsNamber = n => {
	return !isNaN(parseFloat(n)) && isFinite(n) && n !== ''; //!isNaN(parseFloat(n)) && n !== '';
};

class AppData {
	constructor() {
		this.budget = 0;
		this.income = {}; // {} доходы
		this.addIncome = [];
		this.IncomeSumm = 0;
		this.incomeMonth = 0; // сумма доходов
		this.expenses = {}; // {} расходы
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
		this.salar = false;
		this.depPersent = false;
		this.amountPersent = false;


	}
	start() {
		this.getInfoDeposit();
		this.getIncExp();
		this.getBudget();
		this.getAddExpenses();
		this.getAddIncam();
		this.showResult();
		this.restart();

	}


	getBudget() {
		const monthDeposit = this.manyDeposit * (this.percentDeposit / 100);
		this.budget = +salaryAmount.value;
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		console.log('this.budget: ', this.budget);
		console.log('this.incomeMonth: ', this.incomeMonth);
		console.log('this.expensesMonth: ', this.expensesMonth);
		this.budgetDay = Math.ceil(this.budgetMonth / 30);
	}
	//.................................................................

	getIncExp() {

		const count = item => {
			const sratStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${sratStr}-title`).value;
			const itemImount = item.querySelector(`.${sratStr}-amount`).value;
			if (itemTitle !== '' && itemImount !== '') {
				this[sratStr][itemTitle] = itemImount;
			}
		};
		expensesItem.forEach(count);
		incomeItems.forEach(count);

		for (const key in this.income) {
			this.incomeMonth += +this.income[key];
		}
		for (const key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}

	}
	//''''''''''''''''''''''''''''''''''''''''''''''
	getAddExpenses() {
		const addExpenses = additionalExpensesItem.value.split(','); //возможные расходы,через запятую
		//const me = this;
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}
	getAddIncam() { //возможный доход {}

		additionalIncomeItem.forEach(item => {
			const itemValue = item.value.trim();
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
		additionalExpensesValue.value = this.addExpenses.join(', '); //расход возможный
		additionalIncomeValue.value = this.addIncome.join(', '); //доход возможный
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcSavedMoney();
		// periodSelect.addEventListener('input', () => {
		// 	incomePeriodValue.value = this.calcSavedMoney();
		// });
	}
	restart() {
		restarval = document.querySelectorAll('[type=text]');
		restarval.forEach(item => {
			item.setAttribute('readonly', 'readonly');
		});
		btnPlusIcome.disabled = true;
		btnPlusExpenses.disabled = true;
		periodSelect.disabled = true;
		depositCheck.setAttribute('disabled',true);
		start.style.display = 'none';
		buttonCancel.style.display = 'block';
	}
	addExpensesBlock() {
		const cloneExpensesItem = expensesItem[0].cloneNode(true);
		expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
		expensesItem = document.querySelectorAll('.expenses-items');
		if (expensesItem.length === 3) {
			btnPlusExpenses.style.display = 'none';
		}
	}
	addIncomeBlock() {
		const cloneincomeItems = incomeItems[0].cloneNode(true);
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
		depositCheck.checked = false;
		this.salar = false;
		this.depPersent = false;
		this.amountPersent = false;

		depositBanck.style.display = 'none';
		depositAmount.style.display = 'none';
		depositPersent.style.display = 'none';
		depositPersent.value = '';
		depositBanck.value = 0;
		depositAmount.value = '';
		btnPlusIcome.style.display = 'inline';
		btnPlusExpenses.style.display = 'inline';
		depositCheck.setAttribute('disabled',true);
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
	getStatusIncome() { // функция урвень дохода
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
	getInfoDeposit() {
		this.manyDeposit = depositAmount.value;
		this.percentDeposit = depositPersent.value;
	}
	changePersent() {
		const selectIndex = this.value;
		console.log('selectIndex: ', selectIndex);
		if (selectIndex === 'other') {
			depositPersent.value = '';
			depositPersent.style.display = 'inline-block';
			depositPersent.removeAttribute('disabled');
			

		} else {
			depositPersent.style.display = 'none';
			depositPersent.value = selectIndex;
			this.depPersent = true;
			console.log('this.depPersent: ', this.depPersent);
		}

	}
	depositHandler() {
		if (depositCheck.checked && this.salar) {
			console.log('check');
			
			depositBanck.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBanck.addEventListener('change', this.changePersent);

			
		} else {
			console.log('uncheck');
			depositBanck.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPersent.style.display = 'none';
			depositBanck.value = '';
			depositAmount.value = '';
			depositPersent.value = '';
			this.deposit = false;
			
			depositBanck.removeEventListener('change', this.changePersent);

		}
	}



	//............слушатели..............................
	eventsListeners() {
		depositAmount.addEventListener('input', () => {
			if (!IsNamber(depositAmount.value)) {
				this.amountPersent = false;
				depositAmount.value = '';
				
			} else {
				this.amountPersent = true;
				console.log('this.amountPersent: ', this.amountPersent);
				
			}
		});
		depositPersent.addEventListener('input', () => {
			if (!IsNamber(depositPersent.value) || Number.parseFloat(depositPersent.value) < 0 ||  Number.parseFloat(depositPersent.value) > 100) {
				depositPersent.value = '';
			} else {
				this.depPersent = true;
				
			}
		});
		salaryAmount.addEventListener('input', () => {
			if (!IsNamber(salaryAmount.value)||salaryAmount.value==='') {
				salaryAmount.value = '';
				this.salar = false;
				depositCheck.setAttribute('disabled',true);
				start.setAttribute('disabled',true);
				console.log('this.salar: ', this.salar);
			} else {
				this.salar = true;
				depositCheck.removeAttribute('disabled');
				start.removeAttribute('disabled');
			}
		});
		
		start.addEventListener('click',()=>{
			if (!depositCheck.checked && this.salar) {
				this.start();
		   } else if(depositCheck.checked && this.amountPersent && this.depPersent){
			   console.log('флаг');
					this.start();	
		   }
					  // this.start();  
			});
	

		
		//start.addEventListener('click', this.start.bind(this));// this.start.bind(this)


		buttonCancel.addEventListener('click', this.reset);
		btnPlusExpenses.addEventListener('click', this.addExpensesBlock);
		btnPlusIcome.addEventListener('click', this.addIncomeBlock);
		periodSelect.addEventListener('input', () => {
			periodAmount.innerHTML = periodSelect.value;
		});
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
	}


} //........class....................................


const appDataX = new AppData();
console.log('appDatax: ', appDataX);
appDataX.eventsListeners();


