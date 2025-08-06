// src/pages/Branch/CreateBranch.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import '../css/BranchForm.css';
// import DataTable from '../../components/DataTable.tsx'; // Import DataTable
import { BranchData as initialBranchData, countries, states, districts, cities } from '../../utilits/City'; // Import necessary data
import { showSuccessToast, showErrorToast } from '../../components/Toast.tsx'; // Import toast components
// import { showConfirmToast } from '../../components/ConfirmToast'; // Import the toast component

interface BranchData {
  id: number | null;
  code: string;
  branchname: string;
  country: string;
  district: string;
  city: string;
  state: string;
  pin: string;
  address: string;
  date: string;
}

interface StateData {
  country: string;
  statename: string;
  code: string;
}

interface DistrictData {
  country: string;
  state: string;
  district: string;
}

interface CityData {
  country: string;
  state: string;
  district: string;
  city: string[];
}

export default function CreateBranch() {
  const [branches, setBranches] = useState<BranchData[]>(() => {
    const localData = localStorage.getItem('branches');
    return localData ? JSON.parse(localData) : initialBranchData;
  }); // Use state for branches

  const [form, setForm] = useState<BranchData>({
    id: null, code: '', branchname: '',district:'',
    address: '', city: '', state: '',
    country: '', pin: '', date: ''
  });

  const [stateOpts, setStateOpts] = useState<string[]>([]);
  const [districtOpts, setDistrictOpts] = useState<string[]>([]);
  const [cityOpts, setCityOpts] = useState<string[]>([]); // State for city options
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    setStateOpts(states.filter((s: StateData) => s.country === form.country).map((s: StateData) => s.statename));
    setDistrictOpts(districts.filter((d: DistrictData) => d.country === form.country && d.state === form.state).map((d: DistrictData) => d.district));
    const selectedCityEntry = cities.find((c: CityData) => c.country === form.country && c.state === form.state && c.district === form.district);
    setCityOpts(selectedCityEntry ? selectedCityEntry.city : []);
  }, [form.country, form.state, form.district]);

  useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'country') {
      setForm(prev => ({ ...prev, state: '', district: '', city: '' }));
      setStateOpts(states.filter((s: StateData) => s.country === value).map((s: StateData) => s.statename));
      setDistrictOpts([]);
      setCityOpts([]);
    } else if (name === 'state') {
      setForm(prev => ({ ...prev, district: '', city: '' }));
      setDistrictOpts(districts.filter((d: DistrictData) => d.country === form.country && d.state === value).map((d: DistrictData) => d.district));
      setCityOpts([]);
    } else if (name === 'district') {
      setForm(prev => ({ ...prev, city: '', pin: '' }));
      const selectedCityEntry = cities.find((c: CityData) => c.country === form.country && c.state === form.state && c.district === value);
      setCityOpts(selectedCityEntry ? selectedCityEntry.city : []);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedBranches = [...branches];
    if (editingIndex !== null) {
      updatedBranches[editingIndex] = form;
      showSuccessToast('Branch updated successfully!');
    } else {
      form.id = branches.length + 1; // Assign a simple ID
      updatedBranches.push(form);
      showSuccessToast('Branch added successfully!');
    }
    setBranches(updatedBranches);
    console.log('Branch Saved:', form);
    setForm({
      id: null, code: '', branchname: '',district:'',
      address: '', city: '', state: '',
      country: '', pin: '', date: ''
    });
    setEditingIndex(null);
  };

  // const handleEditBranch = (branch: BranchData, index: number) => {
  //   setForm(branch);
  //   setEditingIndex(index);
  // };

  // const handleDeleteBranch = (branch: BranchData, index: number) => {
  //   showConfirmToast(
  //     `Are you sure you want to delete branch: ${branch.branchname}?`,
  //     () => {
  //       setBranches(prevBranches => {
  //         const updatedBranches = prevBranches.filter((_, i) => i !== index);
  //         localStorage.setItem('branches', JSON.stringify(updatedBranches));
  //         return updatedBranches;
  //       });
  //     },
  //     () => {
  //       // Do nothing if cancelled
  //     }
  //   );
  // };

  // const branchColumns = [
  //   { header: 'Code', accessor: 'code' },
  //   { header: 'Branch Name', accessor: 'branchname' },
  //   { header: 'Address', accessor: 'address' },
  //   { header: 'City', accessor: 'city' },
  //   { header: 'State', accessor: 'state' },
  //   { header: 'Country', accessor: 'country' },
  //   { header: 'Pin', accessor: 'pin' },
  //   { header: 'Date', accessor: 'date' },
  // ];

  return (
    <div className="branch-form container my-4">
      <h3>Branch Form</h3>
      <form  className="row g-3" onSubmit={handleSubmit}>
        {/* Your form fields */}
        <div className="col-md-4">
          <label className="form-label"> Branch Code</label>
          <input type="text" className="form-control" name="code" value={form.code} onChange={handleChange} required placeholder='Enter Branch Code' />
        </div>
        <div className="col-md-4">
          <label className="form-label">Branch Name</label>
          <input type="text" className="form-control" name="branchname" value={form.branchname} onChange={handleChange} required placeholder='Enter Branch Name' />
        </div>
        <div className="col-md-4">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} placeholder='Enter Address' />
        </div>
        <div className="col-md-4">
        <label className="form-label">Country</label>
          <select className="form-control" name="country" value={form.country} onChange={handleChange} required >
            <option value="">Select Country</option>
            {countries.map((country: string) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
        <label className="form-label">State</label>
          <select className="form-control" name="state" value={form.state} onChange={handleChange} required disabled={!form.country}>
            <option value="">Select State</option>
            {stateOpts.map((state: string) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
        <label className="form-label">District</label>
          <select className="form-control" name="district" value={form.district} onChange={handleChange} required disabled={!form.state}>
            <option value="">Select District</option>
            {districtOpts.map((district: string) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
        <label className="form-label">City</label>
          <select className="form-control" name="city" value={form.city} onChange={handleChange} required disabled={!form.district}>
            <option value="">Select City</option>
            {cityOpts.map((city: string) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Pin</label>
          <input type="text" className="form-control" maxLength={6} name="pin" value={form.pin}  onBlur={handleChange} onChange={handleChange} placeholder='Enter Pin' />
        </div>
        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} placeholder='Enter Date' />
        </div>
        <div className="col-12 d-flex gap-2 ">
        <button type="submit" className="btn btn-primary ">
          {editingIndex !== null ? 'Update Branch' : 'Add Branch'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={()=>{
          setForm({ id: null, code:'', date:'', branchname:'', country:'',district:'', state:'', city:'', pin:'', address:'' });
          setStateOpts([]);
          setDistrictOpts([]);
          setCityOpts([]);
          setEditingIndex(null);
          }}>
          Clear</button>
        </div>
      </form>

      <hr className="my-4" />

      {/* Use the DataTable component */}
      {/* <DataTable
        data={branches}
        columns={branchColumns}
        onEdit={handleEditBranch}
        onDelete={handleDeleteBranch}
      /> */}
    </div>
  );
}
