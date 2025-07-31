// src/pages/City/CreateCity.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../../css/CityForm.css';
// import DataTable from '../../components/DataTable.tsx';
import { countries, states, districts, cities as initialCities } from '../../utilits/City';
import { showSuccessToast, showErrorToast } from '../../components/Toast.tsx'; // Import toast components
// import { showConfirmToast } from '../../components/ConfirmToast';

interface CityEntry {
  country: string;
  state: string;
  district: string;
  city: string[];
}

interface CityFormState {
  country: string;
  state: string;
  district: string;
  city: string; // Input for a single city name
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

export default function CityForm() {
  const [cities, setCities] = useState<CityEntry[]>(() => {
    const localData = localStorage.getItem('cities');
    return localData ? JSON.parse(localData) : initialCities;
  });

  const [form, setForm] = useState<CityFormState>({
    country: '',
    state: '',
    district: '',
    city: '' // Input for a single city name
  });

  const [stateOpts, setStateOpts] = useState<string[]>([]);
  const [districtOpts, setDistrictOpts] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Effect to update filtered options when country or state in form changes
  useEffect(() => {
    setStateOpts(states.filter((s: StateData) => s.country === form.country).map((s: StateData) => s.statename));
    setDistrictOpts(districts.filter((d: DistrictData) => d.country === form.country && d.state === form.state).map((d: DistrictData) => d.district));
  }, [form.country, form.state]);

  // Effect to save cities to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedCities = [...cities];

    if (editingIndex !== null) {
      // Update existing entry
      updatedCities[editingIndex] = {
        ...updatedCities[editingIndex],
        country: form.country,
        state: form.state,
        district: form.district,
        city: [form.city], // Assuming replacing the array with the single edited city
      };
      showSuccessToast('City updated successfully!');
    } else {
      // Add new entry
      const existingCityEntryIndex = cities.findIndex(
        (cityEntry: CityEntry) =>
          cityEntry.country === form.country &&
          cityEntry.state === form.state &&
          cityEntry.district === form.district
      );

      if (existingCityEntryIndex > -1) {
        const existingCityEntry = updatedCities[existingCityEntryIndex];
        if (!existingCityEntry.city.includes(form.city)) {
          existingCityEntry.city = [...existingCityEntry.city, form.city];
        }
      } else {
        updatedCities.push({
          country: form.country,
          state: form.state,
          district: form.district,
          city: [form.city],
        });
      }
      showSuccessToast('City added successfully!');
    }

    setCities(updatedCities);
    console.log('City Saved:', form);
    setForm({ country: '', state: '', district: '', city: '' });
    setEditingIndex(null);
  };

  // const handleEditCity = (cityEntry: CityEntry, index: number) => {
  //   setForm({
  //     country: cityEntry.country,
  //     state: cityEntry.state,
  //     district: cityEntry.district,
  //     city: cityEntry.city[0] || '' // Set city input to the first city in the array
  //   });
  //   setEditingIndex(index);

  //   // Manually trigger filtering for state and district options
  //   setStateOpts(states.filter((s: StateData) => s.country === cityEntry.country).map((s: StateData) => s.statename));
  //   setDistrictOpts(districts.filter((d: DistrictData) => d.country === cityEntry.country && d.state === cityEntry.state).map((d: DistrictData) => d.district));
  // };

  // const handleDeleteCityEntry = (cityEntry: CityEntry, index: number) => {
  //   showConfirmToast(
  //     `Are you sure you want to delete city: ${cityEntry.city}?`,
  //     () => {
  //       setCities(prevCities => {
  //         const updatedCities = prevCities.filter((_, i) => i !== index);
  //         localStorage.setItem('cities', JSON.stringify(updatedCities));
  //         return updatedCities;
  //       });
  //     },
  //     () => {
  //       // Do nothing if cancelled
  //     }
  //   );
  // };

  // const cityColumns = [
  //   { header: 'Country', accessor: 'country' },
  //   { header: 'State', accessor: 'state' },
  //   { header: 'District', accessor: 'district' },
  //   {
  //     header: 'Cities',
  //     accessor: (row: CityEntry) => row.city.join(', '),
  //   },
  // ];

  return (
    <div className="container my-4">
      <h3>City Form</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label">Country</label>
          <select className="form-control" name="country" value={form.country} onChange={handleChange} required >
            <option value="">Select Country</option>
            {countries.map((country: string) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">State</label>
          <select className="form-control" name="state" value={form.state} onChange={handleChange} required disabled={!form.country}>
            <option value="">Select State</option>
            {stateOpts.map((state: string) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">District</label>
          <select className="form-control" name="district" value={form.district} onChange={handleChange} required disabled={!form.state}>
            <option value="">Select District</option>
            {districtOpts.map((district: string) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">City Name</label>
          <input type="text" className="form-control" placeholder='Enter City Name' name="city" value={form.city} onChange={handleChange} required disabled={!form.district} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2">
            {editingIndex !== null ? 'Update City Entry' : 'Add City'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setForm({ country: '', state: '', district: '', city: '' });
              setEditingIndex(null);
            }}>
            Clear
          </button>
        </div>
      </form>

      <hr className="my-4" />

      {/* <DataTable
        data={cities}
        columns={cityColumns}
        onEdit={handleEditCity}
        onDelete={handleDeleteCityEntry}
      /> */}
    </div>
  );
}
