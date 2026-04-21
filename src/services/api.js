import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9999';

const api = {
  // Login endpoint
  async login(login, password) {
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        login,
        password
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
  async register(login, password, role, inviteCode) {
    try {
      const response = await axios.post(`${BACKEND_URL}/register`, {
        login,
        password,
        role,
        invite_code: inviteCode
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
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Get Profile Error:', error);
      throw error;
    }
  },

  // Teacher: Create attendance link
  async createAttendanceLink(token, subjectId, lessonName, expiresMinutes) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/teacher/attendance-link`,
        {
          subject_id: subjectId,
          lesson_name: lessonName,
          expires_minutes: expiresMinutes
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
  async confirmAttendance(token, inviteToken) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/student/attendance/confirm`,
        {
          invite_token: inviteToken
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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