// src/pages/State/CreateState.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import '../css/StateForm.css';
import DataTable from '../../components/DataTable.tsx'; // Import DataTable
import { countries, states as initialStates } from '../../utilits/City'; // Import necessary data
import { showSuccessToast, showErrorToast } from '../../components/Toast.tsx'; // Import toast components

interface StateEntry {
  country: string;
  statename: string;
  code: string;
}

interface StateFormState {
  country: string;
  statename: string;
  code: string;
}

interface CountryData {
  // Assuming countries is an array of strings
}

interface InitialStateData {
  country: string;
  statename: string;
  code: string;
}

export default function StateForm() {
  const [states, setStates] = useState<StateEntry[]>(() => {
    const localData = localStorage.getItem('states');
    return localData ? JSON.parse(localData) : initialStates;
  });

  const [form, setForm] = useState<StateFormState>({ country: '', statename: '', code: '' });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('states', JSON.stringify(states));
  }, [states]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedStates = [...states];
    if (editingIndex !== null) {
      updatedStates[editingIndex] = form;
      showSuccessToast('State updated successfully!');
    } else {
      updatedStates.push(form);
    }
    setStates(updatedStates);
    showSuccessToast('State added successfully!');
    console.log('State Saved:', form);
    setForm({ country: '', statename: '', code: '' });
    setEditingIndex(null);
  };

  // const handleEditState = (state: StateEntry, index: number) => {
  //   setForm(state);
  //   setEditingIndex(index);
  // };

  // const handleDeleteState = (state: StateEntry, index: number) => {
  //   showConfirmToast(
  //     `Are you sure you want to delete state: ${state.statename}?`,
  //     () => {
  //       setStates(prevStates => {
  //         const updatedStates = prevStates.filter((_, i) => i !== index);
  //         localStorage.setItem('states', JSON.stringify(updatedStates));
  //         return updatedStates;
  //       });
  //     },
  //     () => {
  //       // Do nothing if cancelled
  //     }
  //   );
  // };

  // const stateColumns = [
  //   { header: 'Country', accessor: 'country' },
  //   { header: 'State Name', accessor: 'statename' },
  //   { header: 'Code', accessor: 'code' },
  // ];

  return (
    <div className="container my-4">
      <h3>State Form</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Your form fields */}
        <div className="col-md-4">
          <label className="form-label">Country</label>
          <select className="form-select" name="country" value={form.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            {countries.map((country: string) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">State Name</label>
          <input type="text" className="form-control" name="statename" value={form.statename} placeholder='Enter State Name' onChange={handleChange} disabled={!form.country} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Code</label>
          <input type="text" className="form-control" name="code" value={form.code} onChange={handleChange} placeholder='Enter State code' disabled={!form.statename} required />
        </div>
        <div className="col-12">
        <button type="submit" className="btn btn-primary me-2">
          {editingIndex !== null ? 'Update State' : 'Add State'}
        </button>
        <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {setForm({ country: '', statename: '', code: '' });
            setEditingIndex(null);
          }}
          >
            Clear
          </button>
        </div>
      </form>

      <hr className="my-4" />

      {/* Use the DataTable component */}
      {/* <DataTable
        data={states}
        columns={stateColumns}
        onEdit={handleEditState}
        onDelete={handleDeleteState}
      /> */}
    </div>
  );
}
