import React from 'react'
import { useAuth } from "../contexts/AuthContexts";
import StudentDashboard from '../dashboards/Studentdashboard';
import TeacherDashboard from '../dashboards/TeacherDashboard';

const Home = () => {
const {loggedInUser} =  useAuth()
  return (
    <div>{loggedInUser.role=="student"?<StudentDashboard/>:<TeacherDashboard/>}</div>
  )
}

export default Home