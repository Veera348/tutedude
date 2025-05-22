import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { fetchStudentById, updateStudent } from '../api';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

//   useEffect(() => {
//     fetchStudentById(id).then(setInitialData);
//   }, [id]);

  useEffect(() => {
  fetchStudentById(id).then(setInitialData);
}, [id]);


  const handleSubmit = async updated => {
    await updateStudent(id, updated);
    navigate('/');
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Student</h2>
      <StudentForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditStudent;
