import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]); // State to store employee data
    const [error, setError] = useState(''); // State to handle errors
    const [isDatabaseVisible, setIsDatabaseVisible] = useState(false); // State to control visibility of database

    // Function to fetch employee data from the backend
    const viewDatabase = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/employees');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            setEmployees(data); // Set the fetched data to the state
            setIsDatabaseVisible(true); // Show the database after successful fetch
        } catch (err) {
            setError('Error connecting to the server. Please try again.');
        }
    };
//deleting employee
const deleteEmployee = async (id) => {
    try {
        console.log('Deleting Employee ID:', id); // Debugging log

        const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Employee not found.');
            }
            throw new Error('Failed to delete employee.');
        }

        console.log('Delete response:', response); // Debugging log

        // Update state after successful deletion
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id)
        );
    } catch (err) {
        setError(err.message || 'Error deleting employee. Please try again.');
    }
};




    return (
        <div>
            <h1>Employee Management Dashboard</h1>

            {/* Employee Form */}
            <EmployeeForm />

            {/* View Database Button */}
            <button onClick={viewDatabase}>View Database</button>

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Displaying Employees Data */}
            {isDatabaseVisible && employees.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee ID</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Date of Joining</th>
                            <th>Role</th>
                            <th>Action</th> {/* Added Action Column */}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.employee_id}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td>{employee.date_of_joining}</td>
                                <td>{employee.role}</td>
                                <td>
                                    {/* Delete Button */}
                                    <button onClick={() => deleteEmployee(employee.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                isDatabaseVisible && <p>No employees found.</p> // Show this message when no employees are found
            )}
        </div>
    );
};

export default Dashboard;
