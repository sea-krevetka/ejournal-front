import axios from 'axios';

const BACKEND_URL = 'http://localhost:8888';

const api = {
  // Login endpoint
  async login(login, password, role) {
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        login,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },

  // Register endpoint
  async register(login, password, role) {
    try {
      const response = await axios.post(`${BACKEND_URL}/register`, {
        login,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  },

  // Get profile using token
  async getProfile(token) {
    try {
      const response = await axios.get(`${BACKEND_URL}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Get Profile Error:', error);
      throw error;
    }
  },

  // Teacher: Create attendance link
  async createAttendanceLink(token, lessonName, expiresMinutes) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/teacher/attendance-link`,
        {
          lesson_name: lessonName,
          expires_minutes: expiresMinutes
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Create Attendance Link Error:', error);
      throw error;
    }
  },

  // Student: Confirm attendance
  async confirmAttendance(token, attendanceId) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/student/attendance/confirm`,
        {
          attendance_id: attendanceId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Confirm Attendance Error:', error);
      throw error;
    }
  }
};

export default api;