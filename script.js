window.addEventListener('DOMContentLoaded', () => {
    const addExpenseForm = document.getElementById('addExpenseForm');
    const expenseNameInput = document.getElementById('expenseNameInput');
    const priceInput = document.getElementById('priceInput');
    const categorySelect = document.getElementById('categorySelect');
    const expenseList = document.getElementById('expenseList');
  
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    function saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    function displayExpenses() {
      expenseList.innerHTML = '';
  
      expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.innerHTML = `
          <p><strong>Name:</strong> ${expense.expenseName}</p>
          <p><strong>Price:</strong> $${expense.price}</p>
          <p><strong>Category:</strong> ${expense.category}</p>
          <button class="deleteButton" data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
      });
  
      // Add event listeners to the delete buttons
      const deleteButtons = document.querySelectorAll('.deleteButton');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDelete);
      });
    }
  
    function addExpenseToStorage(expense) {
      expenses.push(expense);
      saveExpenses();
    }
  
    function handleDelete(event) {
      const index = event.target.dataset.index;
      expenses.splice(index, 1);
      saveExpenses();
      displayExpenses();
    }
  
    addExpenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const expenseName = expenseNameInput.value;
      const price = priceInput.value;
      const category = categorySelect.value;
  
      const expense = {
        expenseName,
        price,
        category,
      };
  
      addExpenseToStorage(expense);
  
      console.log('Sending request to /expenses/add:', expense);

  fetch('/expenses/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from /expenses/add:', data);
      // Handle the response here
    })
    .catch((error) => {
      console.error('Error sending request:', error);
      // Handle the error here
    });

  expenseNameInput.value = '';
  priceInput.value = '';
  categorySelect.value = '';

  displayExpenses();
});

function addExpenseToStorage(expense) {
  expenses.push(expense);
  saveExpenses();
}

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}
  
    displayExpenses();
  });