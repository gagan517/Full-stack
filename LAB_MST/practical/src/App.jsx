import React, { useState } from "react";

function App() {
  // Employee data stored in state
  const [employees, setEmployees] = useState([
    { id: 1, name: "Rahul", designation: "Manager" },
    { id: 2, name: "Priya", designation: "Developer" },
    { id: 3, name: "Amit", designation: "Designer" },
    { id: 4, name: "Sneha", designation: "Tester" }
  ]);

  // Function to remove employee by id
  const removeEmployee = (id) => {
    const updatedList = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedList);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees left.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {employees.map((emp) => (
            <li
              key={emp.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "300px"
              }}
            >
              <span>
                <b>{emp.name}</b> - {emp.designation}
              </span>
              <button
                onClick={() => removeEmployee(emp.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
