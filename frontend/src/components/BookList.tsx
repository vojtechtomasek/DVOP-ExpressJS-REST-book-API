import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Book } from "../../../src/models/book"; // Adjust the relative path as needed

interface BookListProps {
  refresh: boolean;
  onEdit: (book: Book) => void;
}

const BookList = ({ refresh, onEdit }: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/books").then((res) => setBooks(res.data));
  }, [refresh]);

  const deleteBook = (id: number) => {
    axios.delete(`http://localhost:3000/api/books/${id}`).then(() => {
      alert("Book deleted");
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
      <thead>
        <tr>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Author</th>
          <th className="border px-4 py-2">Year</th>
          <th className="border px-4 py-2">Available</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td className="border px-4 py-2">{book.title}</td>
            <td className="border px-4 py-2">{book.author}</td>
            <td className="border px-4 py-2">{book.year}</td>
            <td className="border px-4 py-2">{book.available ? "Yes" : "No"}</td>
            <td className="border px-4 py-2">
              <button
                className="text-blue-500 mr-2"
                onClick={() => onEdit(book)}
              >
                <FiEdit />
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteBook(book.id)}
              >
                <FiTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;