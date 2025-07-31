// src/pages/Branch/DisplayBranch.tsx
import React,{ useState , useEffect } from 'react';
import DataTable from '../../components/DataTable.tsx'; // Import DataTable
import { showConfirmToast } from '../../components/ConfirmToast.tsx'; // Import the toast component

interface BranchData {
  id?: number | null; // Assuming id can be null or undefined initially
  code: string;
  branchname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  date: string;
}

interface DisplayBranchProps {
  initialPageSize?: number;
}

const initialBranchData: BranchData[] = []; // Placeholder - Replace with your actual data source

export default function DisplayBranch({ initialPageSize = 5 }: DisplayBranchProps) {
  const [branches, setBranches] = useState<BranchData[]>(() => {
    const localData = localStorage.getItem('branches');
    return localData ? JSON.parse(localData) : initialBranchData;
  });

  useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);
  
  const handleEditBranch = (branch: BranchData, index: number) => {
    // setForm(branch);
    // setEditingIndex(index);
  };

  const handleDeleteBranch = (branch: BranchData, index: number) => {
    showConfirmToast(
      `Are you sure you want to delete branch: ${branch.branchname}?`,
      () => {
        setBranches(prevBranches => {
          const updatedBranches = prevBranches.filter((_, i) => i !== index);
          localStorage.setItem('branches', JSON.stringify(updatedBranches));
          return updatedBranches;
        });
      },
      () => {
        // Do nothing if cancelled
      }
    );
  };

  const branchColumns = [
    { header: 'Code', accessor: 'code' },
    { header: 'Branch Name', accessor: 'branchname' },
    { header: 'Address', accessor: 'address' },
    { header: 'City', accessor: 'city' },
    { header: 'State', accessor: 'state' },
    { header: 'Country', accessor: 'country' },
    { header: 'Pin', accessor: 'pin' },
    { header: 'Date', accessor: 'date' },
  ];

  return (
    <div className="branch-form container my-4">
      <h3>Branches List</h3>
    <DataTable
        data={branches}
        columns={branchColumns}
        onEdit={handleEditBranch}
        onDelete={handleDeleteBranch}
      />
      </div>
  );
}
