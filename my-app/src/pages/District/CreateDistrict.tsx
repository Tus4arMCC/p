// src/pages/District/CreateDistrict.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'; // Import useEffect
// import '../css/DistrictForm.css';
// import DataTable from '../../components/DataTable.tsx';
import { countries, states, districts as initialDistricts } from '../../utilits/City'; // Import necessary data
// import { showConfirmToast } from '../../components/ConfirmToast'; // Import the toast component
import { showSuccessToast, showErrorToast } from '../../components/Toast.tsx'; // Import toast components

interface DistrictEntry {
  country: string;
  state: string;
  district: string;
}

interface DistrictFormState {
  country: string;
  state: string;
  district: string;
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

export default function DistrictForm() {
  const [districts, setDistricts] = useState<DistrictEntry[]>(() => {
    const localData = localStorage.getItem('districts');
    return localData ? JSON.parse(localData) : initialDistricts;
  });

  const [form, setForm] = useState<DistrictFormState>({ country: '', state: '', district: '' });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // State for filtered options
  const [stateOpts, setStateOpts] = useState<string[]>([]);
  const [districtOpts, setDistrictOpts] = useState<string[]>([]); // State for district options

  // Effect to initialize filtered options based on initial form state
  useEffect(() => {
    setStateOpts(states.filter((s: StateData) => s.country === form.country).map((s: StateData) => s.statename));
    setDistrictOpts(initialDistricts.filter((d: DistrictData) => d.country === form.country && d.state === form.state).map((d: DistrictData) => d.district));
  }, [form.country, form.state, districts]); // Depend on form.country, form.state, and districts

  // Effect to save districts to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('districts', JSON.stringify(districts));
  }, [districts]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Filter states and districts based on selections
    if (name === 'country') {
      setStateOpts(states.filter((s: StateData) => s.country === value).map((s: StateData) => s.statename));
      setDistrictOpts([]); // Reset districts when country changes
      setForm(prev => ({ ...prev, state: '', district: '' })); // Reset state and district
    } else if (name === 'state') {
        setDistrictOpts(initialDistricts.filter((d: DistrictData) => d.country === form.country && d.state === value).map((d: DistrictData) => d.district)); // Filter initialDistricts
        setForm(prev => ({ ...prev, district: '' })); // Reset district
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedDistricts = [...districts];
    if (editingIndex !== null) {
      updatedDistricts[editingIndex] = form;
      showSuccessToast('District updated successfully!');

    } else {
      updatedDistricts.push(form);
    }
    setDistricts(updatedDistricts);
    console.log('District Saved:', form);
    setForm({ country: '', state: '', district: '' });
    showSuccessToast('District added successfully!');

    setEditingIndex(null);
  };

  // const handleEditDistrict = (district: DistrictEntry, index: number) => {
  //   setForm(district);
  //   setEditingIndex(index);
  // };

  // const handleDeleteDistrict = (district: DistrictEntry, index: number) => {
  //   showConfirmToast(
  //     `Are you sure you want to delete district: ${district.district}?`,
  //     () => {
  //       setDistricts(prevDistricts => {
  //         const updatedDistricts = prevDistricts.filter((_, i) => i !== index);
  //         localStorage.setItem('districts', JSON.stringify(updatedDistricts));
  //         return updatedDistricts;
  //       });
  //     },
  //     () => {
  //       // Do nothing if cancelled
  //     }
  //   );
  // };

  // const districtColumns = [
  //   { header: 'Country', accessor: 'country' },
  //   { header: 'State', accessor: 'state' },
  //   { header: 'District', accessor: 'district' },
  // ];

  return (
    <div className="district-form container my-4">
      <h3>District Form</h3>

      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Country with suggestions */}
        <div className="col-md-4">
        <label className="form-label">Country</label>
          <select className="form-control" name="country" value={form.country} onChange={handleChange} required >
            <option value="">Select Country</option>
            {countries.map((country: string) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* State with suggestions */}
        <div className="col-md-4">
        <label className="form-label">State</label>
          <select className="form-control" name="state" value={form.state} onChange={handleChange} required disabled={!form.country}>
            <option value="">Select State</option>
            {stateOpts.map((state: string) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* District with suggestions */}
        <div className="col-md-4">
          <label className="form-label">District*</label>
          <input
            type='text'
            name="district"
            list="district-list" // Corrected datalist ID
            className="form-control"
            value={form.district}
            placeholder="Enter District Name "
            onChange={handleChange}
            required
            autoComplete="off"
            disabled={!form.state}
          />
        </div>


        {/* Buttons */}
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
          {editingIndex !== null ? 'Update District Entry' : 'Add District'}
            </button>
          <button type="button" className="btn btn-secondary"
            onClick={() => {
              setForm({ country: '', state: '', district: '' });
              setStateOpts([]); // Clear state options on clear
              setDistrictOpts([]); // Clear district options on clear
              setEditingIndex(null);
            }}>
            Clear
          </button>
        </div>
      </form>
      
      <hr className="my-4" />

      {/* <DataTable
        data={districts}
        columns={districtColumns}
        onEdit={handleEditDistrict}
        onDelete={handleDeleteDistrict}
      /> */}
    </div>
  );
}
