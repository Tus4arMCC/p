// src/pages/City/DisplayCity.tsx
import React,{ useState , useEffect } from 'react';
import DataTable from '../../components/DataTable.tsx'; // Import DataTable
import { showConfirmToast } from '../../components/ConfirmToast.tsx'; // Import the toast component
import { cities as initialCities, states, districts } from '../../utilits/City';

interface CityEntry {
  country: string;
  state: string;
  district: string;
  city: string[];
}

interface DisplayCityProps {
  initialPageSize?: number;
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

export default function DisplayCity({ initialPageSize = 5 }: DisplayCityProps) {
  const [cities, setCities] = useState<CityEntry[]>(() => {
    const localData = localStorage.getItem('cities');
    return localData ? JSON.parse(localData) : initialCities;
  });

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const handleEditBranch = (branch: any, index: number) => {
    // setForm(branch);
    // setEditingIndex(index);
  };

  const handleEditCity = (cityEntry: CityEntry, index: number) => {
    // setForm({
    //   country: cityEntry.country,
    //   state: cityEntry.state,
    //   district: cityEntry.district,
    //   city: cityEntry.city[0] || '' // Set city input to the first city in the array
    // });
    // setEditingIndex(index);

    // Manually trigger filtering for state and district options
    // These state and district filtering lines seem out of place in a Display component
    // and might belong in a form or creation component instead.
    // Keeping them for now during conversion, but they might need refactoring.
    // setStateOpts(states.filter((s: StateData) => s.country === cityEntry.country).map((s: StateData) => s.statename));
    // setDistrictOpts(districts.filter((d: DistrictData) => d.country === cityEntry.country && d.state === cityEntry.state).map((d: DistrictData) => d.district));
  };

  const handleDeleteCityEntry = (cityEntry: CityEntry, index: number) => {
    showConfirmToast(
      `Are you sure you want to delete city: ${cityEntry.city.join(', ')}?`,
      () => {
        setCities(prevCities => {
          const updatedCities = prevCities.filter((_, i) => i !== index);
          localStorage.setItem('cities', JSON.stringify(updatedCities));
          return updatedCities;
        });
      },
      () => {
        // Do nothing if cancelled
      }
    );
  };

  const cityColumns = [
    { header: 'Country', accessor: 'country' },
    { header: 'State', accessor: 'state' },
    { header: 'District', accessor: 'district' },
    {
      header: 'Cities',
      accessor: (row: CityEntry) => row.city.join(', '),
    },
  ];

  return (
    <div className="branch-form container my-4">
      <h3>City List</h3>
    <DataTable
        data={cities}
        columns={cityColumns}
        onEdit={handleEditCity}
        onDelete={handleDeleteCityEntry}
        initialPageSize={initialPageSize}
      />
      </div>
  );
}
