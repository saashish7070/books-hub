import AddBookForm from './AddBookForm';
import '../../App.css';
import BookList from './Booklist';

function AdminPage() {
  return (
    <div>
        <div className="flex-container">
            <BookList />
            <AddBookForm />
        </div>
    </div>
  );
}

export default AdminPage;
