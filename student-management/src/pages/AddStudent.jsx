import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../api';

function AddStudent() {
  const navigate = useNavigate();

  const handleSubmit = async student => {
    await createStudent(student);
    navigate('/');
  };

  return (
    <div>
      <h2>Add Student</h2>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddStudent;
