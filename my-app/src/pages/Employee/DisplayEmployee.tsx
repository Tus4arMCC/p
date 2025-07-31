// src/pages/Employee/DisplayEmployee.tsx
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.tsx'; // Import DataTable
import { employees as initialEmployeeData } from '../../utilits/employee_data'; // Assuming you have employee data here
import { showConfirmToast } from '../../components/ConfirmToast.tsx'; // Import the toast component

interface EmployeeData {
  id: number | null;
  branch_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  mobile1: string;
  mobile2: string;
  email: string;
  // Add other employee data properties as per your data structure
}

export default function EmployeeView() {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>(() => {
    const localData = localStorage.getItem('employeeData');
    return localData ? JSON.parse(localData) : initialEmployeeData;
  });

  useEffect(() => {
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
  }, [employeeData]);

  // Implement edit and delete handlers for employee data as needed
  const handleEditEmployee = (employee: EmployeeData, index: number) => {
    console.log('Edit Employee:', employee, 'at index', index);
    // Implement your edit logic here
  };

  const handleDeleteEmployee = (employee: EmployeeData, index: number) => {
    showConfirmToast(
      `Are you sure you want to delete employee: ${employee.first_name} ${employee.last_name}?`,
      () => {
        setEmployeeData(prevEmployeeData => {
          const updatedEmployeeData = prevEmployeeData.filter((_, i) => i !== index);
          localStorage.setItem('employeeData', JSON.stringify(updatedEmployeeData));
          return updatedEmployeeData;
        });
      },
      () => {
        // Do nothing if cancelled
      }
    );
  };

  const employeeColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Branch ID', accessor: 'branch_id' },
    { header: 'First Name', accessor: 'first_name' },
    { header: 'Middle Name', accessor: 'middle_name' },
    { header: 'Last Name', accessor: 'last_name' },
    { header: 'Date of Birtg', accessor: 'dob' },
    { header: 'Mobile1', accessor: 'mobile1' },
    { header: 'Mobile2', accessor: 'mobile2' },
    { header: 'Email', accessor: 'email' },
    // Add other employee data columns as per your data structure
  ];

  return (
    <div className="container my-4">
      <h3>Employee List</h3>
      <DataTable
        data={employeeData}
        columns={employeeColumns}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />
    </div>
  );
}
