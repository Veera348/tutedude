const API_URL = '/students';

export const fetchStudents = () =>
  fetch(API_URL).then(res => res.json());

export const createStudent = student =>
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

export const updateStudent = (id, student) =>
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

export const deleteStudent = id =>
  fetch(`${API_URL}/${id}`, { method: 'DELETE' });

export const fetchStudentById = id =>
  fetch(`${API_URL}/${id}`).then(res => res.json());

