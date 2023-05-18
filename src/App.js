import React, { useEffect, useState } from 'react';

function App() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/attendance/1/information');
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Attendance Information</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Total Working Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.name}</td>
              <td>{attendance.checkin || 'N/A'}</td>
              <td>{attendance.checkout || 'N/A'}</td>
              <td>{attendance.totalWorkingHours || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
