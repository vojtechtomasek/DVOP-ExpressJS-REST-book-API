import { useState } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import { Book } from "../../../src/models/book"; // Adjust the relative path as needed

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const triggerRefresh = () => setRefresh(!refresh);

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
  };

  return (
    <div className="flex flex-col items-center">
      <BookForm onFormSubmit={triggerRefresh} bookToEdit={bookToEdit} />
      <div className="w-full max-w-4xl mt-6">
        <BookList refresh={refresh} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default HomePage;