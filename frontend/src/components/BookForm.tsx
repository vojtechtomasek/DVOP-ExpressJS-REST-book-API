import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "../../../src/models/book";

interface BookFormProps {
  onFormSubmit: () => void;
  bookToEdit?: Book | null;
}

const BookForm = ({ onFormSubmit, bookToEdit }: BookFormProps) => {
  const [form, setForm] = useState<{
    id: number | null;
    title: string;
    author: string;
    year: string;
    available: boolean;
  }>({
    id: null,
    title: "",
    author: "",
    year: "",
    available: false,
  });

  useEffect(() => {
    if (bookToEdit) {
      setForm({
        id: bookToEdit.id,
        title: bookToEdit.title,
        author: bookToEdit.author,
        year: bookToEdit.year.toString(),
        available: bookToEdit.available,
      });
    }
  }, [bookToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      title: form.title,
      author: form.author,
      year: parseInt(form.year, 10),
      available: form.available,
    };

    if (form.id) {
      axios
        .put(`http://localhost:3000/api/books/${form.id}`, dataToSend)
        .then(() => {
          alert("Book updated successfully!");
          setForm({ id: null, title: "", author: "", year: "", available: false });
          onFormSubmit();
        })
        .catch((err) => {
          console.error(err.response?.data || "Error updating book");
          alert(err.response?.data?.message || "Failed to update book");
        });
    } else {
      axios
        .post("http://localhost:3000/api/books", dataToSend)
        .then(() => {
          alert("Book added successfully!");
          setForm({ id: null, title: "", author: "", year: "", available: false });
          onFormSubmit();
        })
        .catch((err) => {
          console.error(err.response?.data || "Error adding book");
          alert(err.response?.data?.message || "Failed to add book");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">{form.id ? "Edit Book" : "Add Book"}</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Year</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
            className="mr-2"
          />
          Available
        </label>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {form.id ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;