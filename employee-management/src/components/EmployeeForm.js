import React, { useState } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    email: '',
    phone: '',
    department: '',
    date_of_joining: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || 'Form submitted successfully!');
        setFormData({
          name: '',
          employee_id: '',
          email: '',
          phone: '',
          department: '',
          date_of_joining: '',
          role: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Submission failed.');
      }
    } catch (err) {
      setError('Error connecting to the server. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
          required
          maxLength={10}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="\d{10}"
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
        <input
          type="date"
          name="date_of_joining"
          max={new Date().toISOString().split('T')[0]}
          value={formData.date_of_joining}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        <button
          type="reset"
          onClick={() =>
            setFormData({
              name: '',
              employee_id: '',
              email: '',
              phone: '',
              department: '',
              date_of_joining: '',
              role: '',
            })
          }
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
