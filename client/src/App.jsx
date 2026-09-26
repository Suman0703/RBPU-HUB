import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import HODDashboard from './pages/HODDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './pages/Unauthorized'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/hod" element={
          <ProtectedRoute allowedRoles={['hod']}>
            <HODDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  )
}

export default App
