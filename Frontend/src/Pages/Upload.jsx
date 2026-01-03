import React, { useState } from 'react'
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const Upload = () => {
    const [title,setTitle] = useState("");
    const [abstract,setAbstract] = useState("");
    const [author,setAuthor] = useState([]);
    const [supervisor,setSupervisor] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const [supervisorId, setSupervisorId] = useState("");
    const [departments, setDepartments] = useState([]);//all depts data
    const [dept,setDept] = useState("");//selected depts id
    const [subjects, setSubjects] = useState([]);//all subjs data
    const [subj,setSubj] = useState("");//selected subjs id
    const [degree,setDegree] = useState("");
    const [pdfurl,setPdfurl] = useState(null);
    const [keywords,setKeywords] = useState("");
    const [year,setYear] = useState("");

    const navigate=useNavigate();

    useEffect(()=>{

        const fetchDepts=async()=>{
            try {
                const res=await fetch("http://localhost:8080/api/depts")
                const deptData=await res.json();
                if(res.ok){
                    setDepartments(deptData.departments);
                }
                else{
                    toast.error(deptData.message|| "Failed to fetch departments");
                }
            } catch (error) {
                console.error('Error fetching depts:', error);
                toast.error('Error fetching depts');
            }
        }
        const fetchAuthor=async()=>{
            try {
                const res=await fetch("http://localhost:8080/api/users?role=Author")
                const data=await res.json();

                if(res.ok){
                    setAuthor(data.users);
                }
                else{
                    toast.error(data.message|| "Failed to fetch authors");
                }
            } catch (error) {
                console.error('Error fetching authors:', error);
                toast.error('Error fetching authros');
            }
        }
        const fetchSupervisor=async()=>{
            try {
                const res=await fetch("http://localhost:8080/api/users?role=Supervisor")
                const data=await res.json();
                if(res.ok){
                    setSupervisor(data.users);
                }
                else{
                    toast.error(data.message|| "Failed to fetch supervisors");
                }
            } catch (error) {
                console.error('Error fetching supervisors:', error);
                toast.error('Error fetching supervisors');
            }
        }
        fetchDepts();
        fetchAuthor();
        fetchSupervisor();
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!authorId || !supervisorId || !dept || !degree) {
            toast.error("Please fill all required fields");
            return;
        }

        const extractedYear = year ? Number(year.split("-")[0]) : "";
        const formData = new FormData();
        formData.append("title", title);
        formData.append("abstract", abstract);
        formData.append("author", authorId);
        formData.append("supervisor", supervisorId);
        formData.append("departmentId", dept);
        formData.append("subjectId", subj);
        formData.append("degreeType",degree);
        formData.append("pdf", pdfurl); 
        formData.append("keywords",JSON.stringify(keywords.split(",").map(k => k.trim())));
        formData.append("year", extractedYear);
        
        try {
            const res=await fetch('http://localhost:8080/api/thesis',{
                method:'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body:formData,
            });
            if(res.ok){
                toast.success('Thesis created successfully!');
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            else{
                const data = await res.json();
                toast.error(data.message || 'Failed to create thesis');
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error');
        }
    }

    const handleDeptChange=(e)=>{
        const deptId = e.target.value;
        setDept(deptId);
        const fetchSubjects=async()=>{
            try { 
                const res=await fetch(`http://localhost:8080/api/subjects?departmentId=${deptId}`)
                const data=await res.json();
                if(res.ok){
                    setSubjects(data.subjects);
                }
                else{
                    toast.error(deptData.message|| "Failed to fetch subjects");
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
                toast.error('Error fetching subjects');
            }
        }
        fetchSubjects();
    }
    
  return (
      <div>

        <div className='flex flex-col'>
            <label>Title:</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className='border'/>
            <label>Abstract:</label>
            <input value={abstract} onChange={(e)=>setAbstract(e.target.value)} type="text" className='border'/>
            <label>Author:</label>
            <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} className='border'>

            <option value="">Select Author</option>
            <option value="new">+ Add a new author</option>
            {author.map(a => (
                <option key={a._id} value={a._id}>
                {a.name}
                </option>
            ))}
            </select>            
            <label>Supervisor:</label>
            <select value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)} className='border'>
            <option value="">Select Supervisor</option>
            {supervisor.map(a => (
                <option key={a._id} value={a._id}>
                {a.name}
                </option>
            ))}
            </select> 
            <label>Department:</label>
            <select value={dept} onChange={handleDeptChange} className="border">
            <option value="">Select Department</option>
            {departments.map((d) => (
                <option key={d._id} value={d._id}>
                {d.name} ({d.category})
                </option>
            ))}
            </select>
            <label>Subject:</label>
            <select value={subj} onChange={(e)=>setSubj(e.target.value)} className="border">
            <option value="">Select Subject:</option>
            {subjects.map((d) => (
                <option key={d._id} value={d._id}>
                {d.name}
                </option>
            ))}
            </select>
            <div>
                <label>Degree Type:</label>
                <div>
                    {["Btech","MA","MSc","MTech","PhD"].map((deg)=>(
                        <div key={deg}>
                            <input type="radio" value={deg} onChange={(e)=>setDegree(e.target.value)} checked={degree===deg} id={deg} className='border'/>
                            <label>{deg}</label>
                        </div>
                    ))}
                </div>

            </div>
            <label>PDF URL:</label>
            <input onChange={(e)=>setPdfurl(e.target.files[0])} type="file" className='border'/>
            <label>Keywords:</label>
            <input value={keywords} onChange={(e)=>setKeywords(e.target.value)} type="text" className='border'/>
            <label>Year:</label>
            <input value={year} onChange={(e)=>setYear(e.target.value)} type="month" className='border'/>
        </div>
        <button onClick={handleSubmit} className='bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded border hover:bg-gray-300'>Submit</button>
    </div>
  )
}

export default Upload