import { useState, useEffect } from "react";

function LibraryManagement() {
  // Initial books
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved
      ? JSON.parse(saved)
      : [
          { title: "1984", author: "George Orwell" },
          { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
          { title: "To Kill a Mockingbird", author: "Harper Lee" },
        ];
  });

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Add new book
  const addBook = () => {
    if (!newTitle.trim() || !newAuthor.trim()) return;
    const exists = books.some(
      (b) =>
        b.title.toLowerCase() === newTitle.toLowerCase() &&
        b.author.toLowerCase() === newAuthor.toLowerCase()
    );
    if (exists) {
      alert("This book already exists!");
      return;
    }
    setBooks([...books, { title: newTitle, author: newAuthor }]);
    setNewTitle("");
    setNewAuthor("");
  };

  // Remove book
  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  // Filter books by search
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ border: "1px solid black", padding: "15px", margin: "15px" }}>
      <h2>Library Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      {/* Add book */}
      <input
        type="text"
        placeholder="New book title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ marginRight: "5px" }}
      />
      <input
        type="text"
        placeholder="New book author"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        style={{ marginRight: "5px" }}
      />
      <button onClick={addBook}>Add Book</button>

      {/* Book list */}
      <div style={{ marginTop: "15px" }}>
        {filteredBooks.map((book, index) => (
          <div
            key={index}
            style={{
              border: "1px solid lightgray",
              padding: "8px",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <b>{book.title}</b> by {book.author}
            </span>
            <button onClick={() => removeBook(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LibraryManagement;
