import { Link } from 'react-router-dom';

function StudentTable({ students, onDelete }) {
  return (
    <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.age}</td>
            <td>
              <Link to={`/edit/${student.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
