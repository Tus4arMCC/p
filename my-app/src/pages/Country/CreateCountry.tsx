// src/pages/Country/CreateCountry.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import '../../css/CountryForm.css';
// import DataTable from '../../components/DataTable.tsx';
// import { countries, states, districts, cities as initialCities } from '../../utilits/Country';
import { showSuccessToast, showErrorToast } from '../../components/Toast.tsx'; // Import toast components
import apiService from '../../api/apiService.ts'; // Assuming apiService is in this path
// import { showConfirmToast } from '../../components/ConfirmToast';

interface CountryEntry {
  country: string;
  state: string;
  district: string;
  Country: string[];
}

interface CountryFormState {
  Country: string; // Input for a single Country name
}

// interface StateData {
//   country: string;
//   statename: string;
//   code: string;
// }

// interface DistrictData {
//   country: string;
//   state: string;
//   district: string;
// }

// interface CountryData {
//   country: string;
//   state: string;
//   district: string;
//   Country: string[];
// }

export default function CountryForm() {
//   const [cities, setCities] = useState<CountryEntry[]>(() => {
//     const localData = localStorage.getItem('cities');
    // return localData ? JSON.parse(localData) : initialCities;
//   });

  const [form, setForm] = useState<CountryFormState>({
    Country: '' // Input for a single Country name
  });

//   const [stateOpts, setStateOpts] = useState<string[]>([]);
//   const [districtOpts, setDistrictOpts] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Effect to update filtered options when country or state in form changes
//   useEffect(() => {
//     setStateOpts(states.filter((s: StateData) => s.country === form.country).map((s: StateData) => s.statename));
//     setDistrictOpts(districts.filter((d: DistrictData) => d.country === form.country && d.state === form.state).map((d: DistrictData) => d.district));
//   }, [form.country, form.state]);

  // Effect to save cities to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cities', JSON.stringify(cities));
//   }, [cities]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const countryData = {
      country: form.Country,
      postingDate: new Date().toISOString(),
    };

    try {
      const response = await apiService.post('api/Country/Create', countryData); // Adjust endpoint as needed
      if (response.status === 201) {
        showSuccessToast('Country added successfully!');
        setForm({ Country: '' });
      } else {
        showErrorToast('Failed to add Country.');
      }
    } catch (error) {
      showErrorToast('Failed to add Country.');
    }
  }

    // setCities(updatedCountry);
    // console.log('Country Saved:', form);
    // setForm({ country: '', state: '', district: '', Country: '' });
    // setEditingIndex(null);
//   };

  // const handleEditCountry = (CountryEntry: CountryEntry, index: number) => {
  //   setForm({
  //     country: CountryEntry.country,
  //     state: CountryEntry.state,
  //     district: CountryEntry.district,
  //     Country: CountryEntry.Country[0] || '' // Set Country input to the first Country in the array
  //   });
  //   setEditingIndex(index);

  //   // Manually trigger filtering for state and district options
  //   setStateOpts(states.filter((s: StateData) => s.country === CountryEntry.country).map((s: StateData) => s.statename));
  //   setDistrictOpts(districts.filter((d: DistrictData) => d.country === CountryEntry.country && d.state === CountryEntry.state).map((d: DistrictData) => d.district));
  // };

  // const handleDeleteCountryEntry = (CountryEntry: CountryEntry, index: number) => {
  //   showConfirmToast(
  //     `Are you sure you want to delete Country: ${CountryEntry.Country}?`,
  //     () => {
  //       setCities(prevCities => {
  //         const updatedCountry = prevCities.filter((_, i) => i !== index);
  //         localStorage.setItem('cities', JSON.stringify(updatedCountry));
  //         return updatedCountry;
  //       });
  //     },
  //     () => {
  //       // Do nothing if cancelled
  //     }
  //   );
  // };

  // const CountryColumns = [
  //   { header: 'Country', accessor: 'country' },
  //   { header: 'State', accessor: 'state' },
  //   { header: 'District', accessor: 'district' },
  //   {
  //     header: 'Cities',
  //     accessor: (row: CountryEntry) => row.Country.join(', '),
  //   },
  // ];

  return (
    <div className="container my-4">
      <h3>Country Form</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label">Country Name</label>
          <input type="text" className="form-control" placeholder='Enter Country Name' name="Country" value={form.Country} onChange={handleChange} required  />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2">
            {editingIndex !== null ? 'Update Country Entry' : 'Add Country'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setForm({ Country: '' });
              setEditingIndex(null);
            }}>
            Clear
          </button>
        </div>
      </form>

      <hr className="my-4" />

      {/* <DataTable
        data={cities}
        columns={CountryColumns}
        onEdit={handleEditCountry}
        onDelete={handleDeleteCountryEntry}
      /> */}
    </div>
  );
}
