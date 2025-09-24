// employee-cli.js
// Simple CLI Employee Management System using readline and an in-memory array

const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

// Helper to use rl.question with async/await
const question = (prompt) =>
  new Promise((resolve) => rl.question(prompt, (ans) => resolve(ans.trim())));

// In-memory array that holds employees for this session
const employees = [
  { name: 'Alice', id: 'E101' },
  { name: 'Bob',   id: 'E102' },
  { name: 'Charlie', id: 'E103' }
];

function showMenu() {
  console.log('\nEmployee Management System');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit\n');
}

async function addEmployee() {
  const name = await question('Enter employee name: ');
  if (!name) { console.log('Name cannot be empty.'); return; }

  const id = await question('Enter employee ID: ');
  if (!id) { console.log('ID cannot be empty.'); return; }

  // Prevent duplicate IDs (case-insensitive)
  if (employees.some(e => e.id.toLowerCase() === id.toLowerCase())) {
    console.log(`Employee with ID ${id} already exists.`);
    return;
  }

  employees.push({ name, id });
  console.log(`Employee ${name} (ID: ${id}) added successfully.`);
}

function listEmployees() {
  console.log('\nEmployee List:');
  if (employees.length === 0) {
    console.log('No employees found.');
    return;
  }
  employees.forEach((e, i) => {
    console.log(`${i + 1}. Name: ${e.name}, ID: ${e.id}`);
  });
}

async function removeEmployee() {
  const id = await question('Enter employee ID to remove: ');
  const idx = employees.findIndex(e => e.id.toLowerCase() === id.toLowerCase());
  if (idx === -1) {
    console.log(`No employee found with ID: ${id}`);
    return;
  }
  const removed = employees.splice(idx, 1)[0];
  console.log(`Employee ${removed.name} (ID: ${removed.id}) removed successfully.`);
}

// Main loop
async function main() {
  while (true) {
    showMenu();
    const choice = await question('Enter your choice: ');
    switch (choice) {
      case '1':
        await addEmployee();
        break;
      case '2':
        listEmployees();
        break;
      case '3':
        await removeEmployee();
        break;
      case '4':
        console.log('Goodbye!');
        rl.close();
        process.exit(0);
      default:
        console.log('Invalid choice. Please enter 1-4.');
    }
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\nExiting...');
  rl.close();
  process.exit(0);
});

// Start app
main();
