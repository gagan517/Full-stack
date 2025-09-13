// App.jsx
import React, { useState } from "react";

/*
  Base class Person
  - has name and age
  - displayInfo() returns a basic string
*/
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

/*
  Student extends Person
  - adds 'course' property
  - overrides displayInfo() to include course
*/
class Student extends Person {
  constructor(name, age, course) {
    super(name, age); // call Person constructor
    this.course = course;
  }

  // method overriding: extend the parent's displayInfo
  displayInfo() {
    return `${super.displayInfo()}, Course: ${this.course}`;
  }
}

/*
  Teacher extends Person
  - adds 'subject' property
  - overrides displayInfo() to include subject
*/
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

/*
  App component:
  - creates default Student and Teacher
  - has a simple form so you (beginner!) can create a custom Student or Teacher
  - shows how calling the same method on different objects uses the overridden version
*/
export default function App() {
  // default examples
  const [student] = useState(() => new Student("Rahul", 20, "Computer Science"));
  const [teacher] = useState(() => new Teacher("Mr. Sharma", 40, "Mathematics"));

  // for the small interactive form
  const [form, setForm] = useState({
    role: "Student", // or "Teacher"
    name: "",
    age: "",
    extra: "" // course for Student, subject for Teacher
  });

  // When user creates a custom instance, we store it here
  const [customInstance, setCustomInstance] = useState(null);

  // which card to show: "student", "teacher", or "custom"
  const [selected, setSelected] = useState("student");

  // handle simple form inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // create Student or Teacher instance from form and store it
  function handleCreate(e) {
    e.preventDefault();
    const name = form.name.trim() || (form.role === "Student" ? "New Student" : "New Teacher");
    const age = parseInt(form.age, 10) || 0;
    const extra = form.extra.trim() || (form.role === "Student" ? "Unknown Course" : "Unknown Subject");

    let instance;
    if (form.role === "Student") {
      instance = new Student(name, age, extra);
    } else {
      instance = new Teacher(name, age, extra);
    }

    setCustomInstance(instance);
    setSelected("custom");
    // clear inputs (optional)
    setForm(prev => ({ ...prev, name: "", age: "", extra: "" }));
  }

  // helper to get display text depending on selection
  function getDisplayText() {
    if (selected === "student") return student.displayInfo();
    if (selected === "teacher") return teacher.displayInfo();
    if (selected === "custom") return customInstance ? customInstance.displayInfo() : "No custom instance created yet.";
    return "";
  }

  // Optional: show which class the current displayed object belongs to
  function getInstanceType() {
    if (selected === "student") return student instanceof Student ? "Student (instance of Student)" : "";
    if (selected === "teacher") return teacher instanceof Teacher ? "Teacher (instance of Teacher)" : "";
    if (selected === "custom" && customInstance) {
      if (customInstance instanceof Student) return "Custom Student (instance of Student)";
      if (customInstance instanceof Teacher) return "Custom Teacher (instance of Teacher)";
      if (customInstance instanceof Person) return "Custom Person";
    }
    return "";
  }

  // Simple styles (inline for beginners)
  const btnStyle = {
    marginRight: 8,
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #333",
    background: "#f0f0f0",
    cursor: "pointer"
  };

  const activeBtnStyle = {
    ...btnStyle,
    background: "#dbeafe",
    border: "2px solid #3b82f6"
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Segoe UI, Roboto, sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Person → Student & Teacher (Inheritance Demo)</h1>

      <p>
        This demo uses ES6 classes. `Student` and `Teacher` <strong>extend</strong> the base `Person` class and
        <strong> override</strong> the <code>displayInfo()</code> method to include extra properties.
      </p>

      <div style={{ marginBottom: 16 }}>
        <button
          style={selected === "student" ? activeBtnStyle : btnStyle}
          onClick={() => setSelected("student")}
        >
          Show Student
        </button>
        <button
          style={selected === "teacher" ? activeBtnStyle : btnStyle}
          onClick={() => setSelected("teacher")}
        >
          Show Teacher
        </button>
        <button
          style={selected === "custom" ? activeBtnStyle : btnStyle}
          onClick={() => setSelected("custom")}
          disabled={!customInstance}
        >
          Show Custom
        </button>
      </div>

      <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, background: "#fff" }}>
        <h2>Details</h2>
        <p style={{ margin: "8px 0", fontSize: 16 }}>{getDisplayText()}</p>
        <small style={{ color: "#555" }}>{getInstanceType()}</small>
      </div>

      <hr style={{ margin: "24px 0" }} />

      <div style={{ padding: 12, border: "1px dashed #ccc", borderRadius: 8 }}>
        <h3>Create your own Student / Teacher</h3>
        <form onSubmit={handleCreate}>
          <div style={{ marginBottom: 8 }}>
            <label>
              Role:
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{ marginLeft: 8, padding: 6 }}
              >
                <option>Student</option>
                <option>Teacher</option>
              </select>
            </label>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>
              Name:
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Priya"
                style={{ marginLeft: 8, padding: 6, width: 240 }}
              />
            </label>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>
              Age:
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 21"
                style={{ marginLeft: 8, padding: 6, width: 100 }}
              />
            </label>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>
              {form.role === "Student" ? "Course:" : "Subject:"}
              <input
                name="extra"
                value={form.extra}
                onChange={handleChange}
                placeholder={form.role === "Student" ? "e.g. AI/ML" : "e.g. Physics"}
                style={{ marginLeft: 8, padding: 6, width: 240 }}
              />
            </label>
          </div>

          <button type="submit" style={{ ...btnStyle, padding: "8px 14px" }}>
            Create {form.role}
          </button>
        </form>

        <p style={{ marginTop: 12, color: "#444" }}>
          After creating, click <strong>Show Custom</strong> to view your created instance.
        </p>
      </div>

      <footer style={{ marginTop: 24, color: "#666", fontSize: 13 }}>
        Tip for beginners: Check the browser console and try calling <code>student.displayInfo()</code> or{" "}
        <code>teacher.displayInfo()</code> to see the same strings in the console as well.
      </footer>
    </div>
  );
}
