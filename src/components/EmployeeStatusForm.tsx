import React, { useState } from 'react';
import { EmployeeStatus, employeeStatuses } from '../constants/status';
import { EmployeeStatus, employeeStatuses } from '../constants/status';

interface EmployeeStatusFormProps {
  onSubmit: (status: string, isKeepFwdEmail: boolean) => void;
}

const EmployeeStatusForm: React.FC<EmployeeStatusFormProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState('');
  const [isKeepFwdEmail, setIsKeepFwdEmail] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(status, isKeepFwdEmail);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select status</option>
          {Object.keys(EmployeeStatus).map((key) => (
            <option key={key} value={key}>
              {employeeStatuses[key as EmployeeStatus]}
            </option>
          ))}
          {/* Add other statuses as needed */}
        </select>
      </label>
      {status === 'leave' && (
        <label>
          <input
            type="checkbox"
            checked={isKeepFwdEmail}
            onChange={(e) => setIsKeepFwdEmail(e.target.checked)}
          />
          Keep Forward Email
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeStatusForm;
