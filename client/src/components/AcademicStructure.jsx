import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function AcademicStructure() {
  const [universities, setUniversities] = useState([]);
  const [schools, setSchools] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // In a real app we might fetch universities, but we can mock it or fetch if API exists
      // const resUniv = await axios.get('/api/universities');
      // setUniversities(resUniv.data);
      const resSchools = await axios.get('/api/schools');
      setSchools(resSchools.data);
      const resDepts = await axios.get('/api/departments');
      setDepartments(resDepts.data);
      const resClasses = await axios.get('/api/classes');
      setClasses(resClasses.data);
      const resSubj = await axios.get('/api/subjects');
      setSubjects(resSubj.data);
    } catch (err) {
      console.error(err);
    }
  };

  // State for forms
  const [schoolForm, setSchoolForm] = useState({ name: '', code: '', universityId: '' });
  const [deptForm, setDeptForm] = useState({ name: '', code: '', schoolId: '' });
  const [classForm, setClassForm] = useState({ name: '', departmentId: '', currentSemester: '' });
  const [subjectForm, setSubjectForm] = useState({ name: '', code: '', type: 'theory', classId: '', owningDepartmentId: '', credits: '' });

  const handleCreateSchool = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/schools', schoolForm);
      fetchData();
      setSchoolForm({ name: '', code: '', universityId: '' });
    } catch (err) { console.error(err); }
  };

  const handleCreateDept = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/departments', deptForm);
      fetchData();
      setDeptForm({ name: '', code: '', schoolId: '' });
    } catch (err) { console.error(err); }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/classes', classForm);
      fetchData();
      setClassForm({ name: '', departmentId: '', currentSemester: '' });
    } catch (err) { console.error(err); }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/subjects', subjectForm);
      fetchData();
      setSubjectForm({ name: '', code: '', type: 'theory', classId: '', owningDepartmentId: '', credits: '' });
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-8 mt-8">
      <h2 className="text-xl font-bold border-b pb-2">Academic Structure Management</h2>

      {/* School Form */}
      <section className="bg-white p-4 shadow rounded-lg">
        <h3 className="font-semibold mb-4">Add School</h3>
        <form onSubmit={handleCreateSchool} className="flex gap-4">
          <input className="border p-2 rounded" placeholder="School Name" value={schoolForm.name} onChange={e => setSchoolForm({...schoolForm, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Code" value={schoolForm.code} onChange={e => setSchoolForm({...schoolForm, code: e.target.value})} required />
          {/* Note: University mock or real dropdown would go here */}
          <input className="border p-2 rounded" placeholder="University ID" value={schoolForm.universityId} onChange={e => setSchoolForm({...schoolForm, universityId: e.target.value})} required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </form>
      </section>

      {/* Department Form */}
      <section className="bg-white p-4 shadow rounded-lg">
        <h3 className="font-semibold mb-4">Add Department</h3>
        <form onSubmit={handleCreateDept} className="flex gap-4">
          <input className="border p-2 rounded" placeholder="Department Name" value={deptForm.name} onChange={e => setDeptForm({...deptForm, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Code" value={deptForm.code} onChange={e => setDeptForm({...deptForm, code: e.target.value})} required />
          <select className="border p-2 rounded" value={deptForm.schoolId} onChange={e => setDeptForm({...deptForm, schoolId: e.target.value})} required>
            <option value="">Select School</option>
            {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </form>
      </section>

      {/* Class Form */}
      <section className="bg-white p-4 shadow rounded-lg">
        <h3 className="font-semibold mb-4">Add Class</h3>
        <form onSubmit={handleCreateClass} className="flex gap-4">
          <input className="border p-2 rounded" placeholder="Class Name (e.g. CSE-A)" value={classForm.name} onChange={e => setClassForm({...classForm, name: e.target.value})} required />
          <select className="border p-2 rounded" value={classForm.departmentId} onChange={e => setClassForm({...classForm, departmentId: e.target.value})} required>
            <option value="">Home Department</option>
            {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          <input className="border p-2 rounded" type="number" min="1" max="8" placeholder="Current Semester" value={classForm.currentSemester} onChange={e => setClassForm({...classForm, currentSemester: e.target.value})} required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </form>
      </section>

      {/* Subject Form */}
      <section className="bg-white p-4 shadow rounded-lg">
        <h3 className="font-semibold mb-4">Add Subject</h3>
        <form onSubmit={handleCreateSubject} className="flex gap-4 flex-wrap">
          <input className="border p-2 rounded" placeholder="Subject Name" value={subjectForm.name} onChange={e => setSubjectForm({...subjectForm, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Code" value={subjectForm.code} onChange={e => setSubjectForm({...subjectForm, code: e.target.value})} required />
          
          <select className="border p-2 rounded" value={subjectForm.type} onChange={e => setSubjectForm({...subjectForm, type: e.target.value})} required>
            <option value="theory">Theory</option>
            <option value="lab">Lab</option>
          </select>

          <select className="border p-2 rounded" value={subjectForm.classId} onChange={e => setSubjectForm({...subjectForm, classId: e.target.value})} required>
            <option value="">Select Class</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>

          <select className="border p-2 rounded" value={subjectForm.owningDepartmentId} onChange={e => setSubjectForm({...subjectForm, owningDepartmentId: e.target.value})} required>
            <option value="">Owning Department (Teaches it)</option>
            {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          
          <input className="border p-2 rounded" type="number" placeholder="Credits" value={subjectForm.credits} onChange={e => setSubjectForm({...subjectForm, credits: e.target.value})} required />
          
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </form>
      </section>
    </div>
  );
}
