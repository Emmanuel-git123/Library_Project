import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Not_found from './Pages/Not_found'
import About_Us from './Pages/About_Us'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Year from './Components/Year'
import Subject from './Pages/Subject'
import SubjectDetail from './Pages/SubjectDetail'
import Department from './Pages/Department'
// import DepartmentDetail from './Pages/DepartmentDetail'
import Authors from './Pages/Authors'
import Supervisors from './Pages/Supervisors'
import ThesisType from './Pages/ThesisType'
import ThesisListing from './Pages/ThesisListing'
import ThesisDetail from './Pages/ThesisDetail'
import Upload from './Pages/Upload'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Components/ProtectedRoute'
import AdminInvite from './Pages/AdminInvite'
import ExtractMetaData from './Pages/ExtractMetaData'
import PDFViewer from './Components/PDFViewer'

const App = () => {
  return (
    <div className=''>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/info' element={<About_Us/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/view/dept/:deptId/years' element={<Year/>}/>
        <Route path='/view/year/:year' element={<ThesisListing/>}/>
        <Route path='/view/subject' element={<Subject/>}/>
        <Route path='/view/subject/all' element={<ThesisListing/>}/>
        <Route path='/view/subject/:subjectId' element={<SubjectDetail/>}/>
        <Route path='/view/subject/:subjectId/theses' element={<ThesisListing/>}/>
        <Route path='/view/dept' element={<Department/>}/>
        <Route path='/view/dept/all' element={<ThesisListing/>}/>
        <Route path='/view/dept/:id' element={<ThesisListing/>}/>
        <Route path='/view/dept/:deptId/year/:year' element={<ThesisListing/>}/>
        <Route path='/view/author' element={<Authors/>}/>
        <Route path='/view/author/:id' element={<ThesisListing/>}/>
        <Route path='/view/supervisor' element={<Supervisors/>}/>
        <Route path='/view/supervisor/:supervisorId/years' element={<Year/>}/>
        <Route path='/view/supervisor/:supervisorId/year/:year' element={<ThesisListing/>}/>
        <Route path='/view/thesis_type' element={<ThesisType/>}/>
        <Route path='/view/thesis_type/:id' element={<ThesisListing/>}/>
        <Route path='/view/upload/submit' element={<ProtectedRoute> <Upload/></ProtectedRoute>}/>
        <Route path='/view/pdf/:id' element={<ProtectedRoute><PDFViewer/></ProtectedRoute>}/>
        <Route path='/view/upload' element={<ProtectedRoute> <ExtractMetaData/></ProtectedRoute>}/>
        <Route path='/admin/invite' element={<ProtectedRoute><AdminInvite/></ProtectedRoute>}/>
        <Route path='/thesis/:id' element={<ThesisDetail/>}/>
        <Route path='/view/year' element={<Year/>}/>
        <Route path='/*' element={<Not_found/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App