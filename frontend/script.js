const serverUrl = 'http://localhost:3000'; 
const expenseForm = document.getElementById('expenseForm');
const expenseContainer = document.getElementById('expenseContainer');

expenseForm.addEventListener('submit', handleExpenseAdd);
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categorySelect = document.getElementById('category');

function handleExpenseAdd(event) {
    event.preventDefault();

    const expenseData = {
        amount: amountInput.value,
        description: descriptionInput.value,
        category: categorySelect.value,
    };

    axios.post(`${serverUrl}/expenses`, expenseData) 
        .then(response => {
            const uniqueId = response.data.id; 
            const expenseElement = createExpenseElement(expenseData, uniqueId);
            expenseContainer.appendChild(expenseElement);
            expenseForm.reset();
        })
        .catch(error => {
            console.error('Error creating expense:', error);
        });
}


function createExpenseElement(expenseData, uniqueId) {
    const expenseElement = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');

    buttonDelete.textContent = 'Delete';
    buttonEdit.textContent = 'Edit';
    buttonDelete.className = 'btn btn-danger mr-2';
    buttonEdit.className = 'btn btn-primary';

    buttonDelete.addEventListener('click', function () {
        expenseElement.remove();
        handleExpenseDelete(uniqueId);
    });

    buttonEdit.addEventListener('click', function () {
        axios.get(`${serverUrl}/expenses/${uniqueId}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
            const storedData = response.data;
            amountInput.value = storedData.amount;
            descriptionInput.value = storedData.description;
            categorySelect.value = storedData.category;
            expenseElement.remove();
            handleExpenseDelete(uniqueId);
        });
    });

    expenseElement.className = 'list-group-item';
    expenseElement.innerHTML = `
        <div class="font-weight-normal mb-3">Amount: ${expenseData.amount} &nbsp; Description: ${expenseData.description} &nbsp; Category: ${expenseData.category}</div>
    `;
    expenseElement.appendChild(buttonDelete);
    expenseElement.appendChild(buttonEdit);

    return expenseElement;
}

function showAllExpenses() {
    axios.get(`${serverUrl}/expenses`, { withCredentials: true }) 
        .then(response => {
            const expenses = response.data;
            console.log(expenses);
            expenses.forEach(expense => {
                const expenseElement = createExpenseElement(expense, expense.id); 
                expenseContainer.appendChild(expenseElement);
            });
        })
        .catch(error => {
            console.error('Error fetching expenses:', error);
        });
}


function handleExpenseDelete(uniqueId) {
    axios.delete(`${serverUrl}/expenses/${uniqueId}`, { withCredentials: true }) 
        .then(() => {
            console.log('Expense deleted:', uniqueId);
        })
        .catch(error => {
            console.error('Error deleting expense:', error);
        });
}

showAllExpenses();
