import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { showSuccessToast } from '../../components/Toast.tsx'; // Import toast components


interface EmployeeFormState {
  employee_code: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  email: string;
  mobile1: string;
  mobile2: string;
  branch_id: string;
  photo: File | null;
}

export default function EmployeeForm() {
  const [form, setForm] = useState<EmployeeFormState>({
    employee_code: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    email: "",
    mobile1: "",
    mobile2: "",
    branch_id: "",
    photo: null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const localData = localStorage.getItem('employeeData');
    if (localData) {
      // Assuming employeeData in local storage is an array of employee objects
      // If you are storing individual employees, you might need to adjust this
      // setEmployeeData(JSON.parse(localData)); 
      // For this specific form, we are not displaying a list, so we don't need to load all data here.
      // We only need to load existing data in handleSubmit to append to it.
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

   const resetForm = () => {
    setForm({
      employee_code: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      email: "",
      mobile1: "",
      mobile2: "",
      branch_id: "",
      photo: null
    });
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Retrieve existing data from local storage
    const existingData = localStorage.getItem('employeeData');
    let employeeDataArray: EmployeeFormState[] = existingData ? JSON.parse(existingData) : [];

    // Add the new employee data to the array
    employeeDataArray.push(form);

    // Save the updated array back to local storage
    localStorage.setItem('employeeData', JSON.stringify(employeeDataArray));

    console.log("Employee Form Data:", form);
    showSuccessToast('Employee added successfully!');
    
    // Clear form & preview
    resetForm();
  };

  return (
    <div className="container mt-4 mb-5">
      <h3>Employee</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Employee Code*</label>
              <input
                type="text"
                className="form-control"
                name="employee_code"
                value={form.employee_code}
                onChange={handleChange}
                placeholder="Enter Employee Code"
                required
              />
            </div>
             <div className="mb-3">
              <label className="form-label">Branch ID*</label>
              <input
                type="text"
                className="form-control"
                name="branch_id"
                value={form.branch_id}
                onChange={handleChange}
                placeholder="Enter Branch ID"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">First Name*</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Middle Name</label>
              <input
                type="text"
                className="form-control"
                name="middle_name"
                value={form.middle_name}
                onChange={handleChange}
                placeholder="Enter Middle Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth*</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
              />
            </div>           
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <img
                src={preview || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                alt="Employee Avatar"
                className="rounded-circle border"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Employee Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile 1*</label>
              <input
                type="tel"
                className="form-control"
                name="mobile1"
                value={form.mobile1}
                maxLength={10}
                onChange={handleChange}
                placeholder="Enter Mobile Number 1"
                required
                pattern="[0-9]{10}"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile 2</label>
              <input
                type="tel"
                className="form-control"
                name="mobile2"
                maxLength={10}
                value={form.mobile2}
                onChange={handleChange}
                placeholder="Enter Mobile Number 2"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}                  
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Save
        </button>
      </form>
    </div>
  );
}
