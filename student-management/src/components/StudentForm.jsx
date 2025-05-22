import { useState, useEffect } from 'react';

function StudentForm({ initialData = {}, onSubmit }) {
  const [student, setStudent] = useState({ name: '', course: '', age: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // only update if initialData is non-empty
    if (Object.keys(initialData).length > 0) {
      setStudent(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!student.name.trim()) errs.name = 'Name is required';
    if (!student.course.trim()) errs.course = 'Course is required';
    if (!student.age || student.age <= 0) errs.age = 'Valid age is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) onSubmit(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input className="form-control" name="name" value={student.name} onChange={handleChange} />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label>Course</label>
        <input className="form-control" name="course" value={student.course} onChange={handleChange} />
        {errors.course && <div className="text-danger">{errors.course}</div>}
      </div>
      <div className="mb-3">
        <label>Age</label>
        <input className="form-control" name="age" type="number" value={student.age} onChange={handleChange} />
        {errors.age && <div className="text-danger">{errors.age}</div>}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default StudentForm;
