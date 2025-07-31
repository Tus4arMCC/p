// src/pages/District/DisplayDistrict.tsx
import React,{ useState , useEffect } from 'react';
import DataTable from '../../components/DataTable.tsx'; // Import DataTable
import { showConfirmToast } from '../../components/ConfirmToast.tsx'; // Import the toast component
import { districts as initialDistricts } from '../../utilits/City';

interface DistrictEntry {
  country: string;
  state: string;
  district: string;
}

interface DisplayDistrictProps {
  initialPageSize?: number;
}

export default function DisplayDistrict({ initialPageSize = 5 }: DisplayDistrictProps) {
    const [districts, setDistricts] = useState<DistrictEntry[]>(() => {
        const localData = localStorage.getItem('districts');
        return localData ? JSON.parse(localData) : initialDistricts;
      });


      useEffect(() => {
        localStorage.setItem('districts', JSON.stringify(districts));
      }, [districts]);



      const handleEditDistrict = (district: DistrictEntry, index: number) => {
        // setForm(district);
        // setEditingIndex(index);
      };
    
      const handleDeleteDistrict = (district: DistrictEntry, index: number) => {
        showConfirmToast(
          `Are you sure you want to delete district: ${district.district}?`,
          () => {
            setDistricts(prevDistricts => {
              const updatedDistricts = prevDistricts.filter((_, i) => i !== index);
              localStorage.setItem('districts', JSON.stringify(updatedDistricts));
              return updatedDistricts;
            });
          },
          () => {
            // Do nothing if cancelled
          }
        );
      };

  const districtColumns = [
    { header: 'Country', accessor: 'country' },
    { header: 'State', accessor: 'state' },
    { header: 'District', accessor: 'district' },
  ];

  return (
    <div className="branch-form container my-4">
        <h3>District List</h3>
    <DataTable
        data={districts}
        columns={districtColumns}
        onEdit={handleEditDistrict}
        onDelete={handleDeleteDistrict}
        initialPageSize={initialPageSize}
      />
      </div>
  );
}
