import React from 'react';

export function RoleSelector({ role, roles, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="roleSelect" className="form-label">Select Role</label>
      <select
        id="roleSelect"
        className="form-select"
        value={role}
        onChange={e => onChange(e.target.value)}
      >
        {/* <option value=""></option> */}
        {roles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}
