import { useEffect, useState } from 'react';
import { fetchStudents, deleteStudent } from '../api';
import StudentTable from '../components/StudentTable';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    fetchStudents().then(setStudents);
  }, []);

  const handleDelete = async id => {
    await deleteStudent(id);
    setStudents(students.filter(s => s.id !== id));
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.course.toLowerCase().includes(query.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div>
      <h2>Student List</h2>
      <input
        className="form-control mb-3"
        placeholder="Search by name or course"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <StudentTable students={paginated} onDelete={handleDelete} />
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default StudentList;
