import { Routes, Route, Link } from 'react-router-dom';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';

function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
        <Link to="/" className="btn btn-outline-primary me-2">Student List</Link>
        <Link to="/add" className="btn btn-outline-success">Add Student</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
