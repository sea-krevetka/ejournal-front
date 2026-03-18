import React, { useState, useEffect } from 'react';
import ProfileSquare from './components/ProfileSquare';
import ProfileDescription from './components/ProfileDescription';
import SlidersUnder from './components/SlidersUnder';
import Calendar from './components/Calendar';
import InfoCard from './components/InfoCard';
import DataTable from './components/DataTable';
import useWebSocket from './hooks/useWebSocket';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const { sendMessage, lastMessage, connectionStatus } = useWebSocket('ws://localhost:8080/ws');

  useEffect(() => {
    // Запрос данных пользователя после логина
    if (connectionStatus === 'connected') {
      sendMessage({
        action: 'getUserData',
        data: {}
      });
      
      sendMessage({
        action: 'getStudentsList',
        data: {}
      });
      
      sendMessage({
        action: 'getAttendance',
        data: {}
      });
    }
  }, [connectionStatus, sendMessage]);

  useEffect(() => {
    if (lastMessage) {
      const response = JSON.parse(lastMessage);
      if (response.ok) {
        switch (response.id) {
          case 'getUserData':
            setUserData(response.result);
            break;
          case 'getStudentsList':
            setStudentsData(response.result);
            break;
          case 'getAttendance':
            setAttendanceData(response.result);
            break;
          default:
            break;
        }
      } else {
        console.error('Error:', response.error);
      }
    }
  }, [lastMessage]);

  // Пример данных для карточек
  const cardData = [
    { id: 1, title: 'test', value: 'test', color: '#5E3E9F' },
    { id: 2, title: 'test', value: 'test', color: '#5E3E9F' },
    { id: 3, title: 'test', value: 'test', color: '#5E3E9F' }
  ];

  return (
    <div className="contentContainer">
      <ProfileSquare userData={userData} />
      <ProfileDescription userData={userData} />
      <SlidersUnder />
      <Calendar />
      
      {cardData.map((card, index) => (
        <InfoCard
          key={card.id}
          title={card.title}
          value={card.value}
          color={card.color}
          position={index + 1}
        />
      ))}
      
      <DataTable
        data={studentsData}
        type="students"
        title="Список студентов"
      />
      
      <DataTable
        data={attendanceData}
        type="attendance"
        title="Посещаемость"
      />
    </div>
  );
}

export default App;