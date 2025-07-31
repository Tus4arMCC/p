// src/pages/State/DisplayState.tsx
import React,{ useState , useEffect } from 'react';
import DataTable from '../../components/DataTable.tsx'; // Import DataTable
import { showConfirmToast } from '../../components/ConfirmToast.tsx'; // Import the toast component
import { states as initialStates } from '../../utilits/City';

interface StateEntry {
  country: string;
  statename: string;
  code: string;
}

interface DisplayStateProps {
  initialPageSize?: number;
}

export default function DisplayDistrict({ initialPageSize = 5 }: DisplayStateProps) {
  const [states, setStates] = useState<StateEntry[]>(() => {
    const localData = localStorage.getItem('states');
    return localData ? JSON.parse(localData) : initialStates;
  });

  useEffect(() => {
    localStorage.setItem('states', JSON.stringify(states));
  }, [states]);

  const handleEditState = (state: StateEntry, index: number) => {
    // setForm(state);
    // setEditingIndex(index);
  };

  const handleDeleteState = (state: StateEntry, index: number) => {
    showConfirmToast(
      `Are you sure you want to delete state: ${state.statename}?`,
      () => {
        setStates(prevStates => {
          const updatedStates = prevStates.filter((_, i) => i !== index);
          localStorage.setItem('states', JSON.stringify(updatedStates));
          return updatedStates;
        });
      },
      () => {
        // Do nothing if cancelled
      }
    );
  };

  const stateColumns = [
    { header: 'Country', accessor: 'country' },
    { header: 'State Name', accessor: 'statename' },
    { header: 'Code', accessor: 'code' },
  ];

  return (
    <div className="branch-form container my-4">
      <h3>State List</h3>
    <DataTable
        data={states}
        columns={stateColumns}
        onEdit={handleEditState}
        onDelete={handleDeleteState}
        initialPageSize={initialPageSize}
      />
      </div>
  );
}
