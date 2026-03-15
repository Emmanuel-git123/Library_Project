import React, { useState } from 'react'
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate,useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
import { Field, Input, NativeSelect, Box } from "@chakra-ui/react"
import { Button1 } from '@/Components/Button1';
import { FormControlLabel, Switch } from '@mui/material';
const Upload = () => {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [author, setAuthor] = useState([]);
    const [supervisor, setSupervisor] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const [supervisorIds, setSupervisorIds] = useState([]);
    const [departments, setDepartments] = useState([]);//all depts data
    const [dept, setDept] = useState("");//selected depts id
    const [subj, setSubj] = useState("");//selected subjs id
    const [degree, setDegree] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [keywords, setKeywords] = useState("");
    const [year, setYear] = useState("");

    const [newAuthor, setNewAuthor] = useState(false);
    const [authorName, setAuthorName] = useState("");
    // const [authorEmail, setAuthorEmail] = useState("");
    const [authorDept, setAuthorDept] = useState("");
    const [authorDegree, setAuthorDegree] = useState("");

    const [newSupervisor, setNewSupervisor] = useState(false);
    const [supervisorName, setSupervisorName] = useState("");
    // const [supervisorEmail, setSupervisorEmail] = useState("");
    const [supervisorDept, setSupervisorDept] = useState("");

    const [allowDownload,setAllowDownload] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location=useLocation();

    useEffect(() => {
        if (!location.state?.extractedMeta || !location.state?.pdfFile) {
            toast.error("No extracted data found");
            navigate("/view/upload", { replace: true });
        }
    }, [location, navigate]);

    useEffect(() => {

        const fetchDepts = async () => {
            try {
                const res = await fetch("http://localhost:8081/api/depts")
                const deptData = await res.json();
                if (res.ok) {
                    setDepartments(deptData.departments);
                }
                else {
                    toast.error(deptData.message || "Failed to fetch departments");
                }
            } catch (error) {
                console.error('Error fetching depts:', error);
                toast.error('Error fetching depts');
            }
        }
        const fetchAuthor = async () => {
            try {
                const res = await fetch("http://localhost:8081/api/users?role=Author")
                const data = await res.json();

                if (res.ok) {
                    setAuthor(data.users);
                }
                else {
                    toast.error(data.message || "Failed to fetch authors");
                }
            } catch (error) {
                console.error('Error fetching authors:', error);
                toast.error('Error fetching authros');
            }
        }
        const fetchSupervisor = async () => {
            try {
                const res = await fetch("http://localhost:8081/api/users?role=Supervisor")
                const data = await res.json();
                if (res.ok) {
                    setSupervisor(data.users);
                }
                else {
                    toast.error(data.message || "Failed to fetch supervisors");
                }
            } catch (error) {
                console.error('Error fetching supervisors:', error);
                toast.error('Error fetching supervisors');
            }
        }
        fetchDepts();
        fetchAuthor();
        fetchSupervisor();
    }, [])

    useEffect(() => {
        if (location.state) {
            const { extractedMeta, pdfFile } = location.state;
            setTitle(extractedMeta?.title || "");
            setAbstract(extractedMeta?.abstract || "");
            setKeywords(Array.isArray(extractedMeta?.keywords)? extractedMeta.keywords.join(", "): "");
            setYear(extractedMeta?.year || "");
            setDegree(extractedMeta?.degreeType || "");
            setPdfFile(pdfFile || null);
            console.log(extractedMeta?.text);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setLoading(true);

        if (!authorId || !supervisorIds.length === 0 || !dept || !degree) {
            setLoading(false);
            toast.error("Please fill all required fields");
            return;
        }

        if (!pdfFile) {
            setLoading(false);
            toast.error("PDF file missing. Please re-upload.");
            return;
        }

        const extractedYear = Number(year);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("abstract", abstract);
        formData.append("author", authorId);
        formData.append("supervisors", JSON.stringify(supervisorIds));
        formData.append("departmentId", dept);
        formData.append("degreeType", degree);
        formData.append("pdf", pdfFile);
        formData.append("keywords", JSON.stringify(keywords.split(",").map(k => k.trim())));
        formData.append("year", extractedYear);
        formData.append("allowDownload", allowDownload);

        try {
            const res = await fetch('http://localhost:8081/api/thesis/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (res.ok) {
                toast.success('Thesis created successfully!');
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            else {
                const data = await res.json();
                toast.error(data.message || 'Failed to create thesis');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error');
            setLoading(false);
        }
    }

    const handleDeptChange = (e) => {
        const deptId = e.target.value;
        setDept(deptId);
    }

    const handleNewAuthor = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!authorName || !authorDept || !authorDegree) {
            toast.error("Please fill all required fields");
            return;
        }
        try {
            const data = await fetch("http://localhost:8081/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: authorName, role: "Author", departmentId: authorDept, degreeType: authorDegree })
            })
            const res = await data.json();
            if (data.ok) {
                toast.success("Author created suuccessfully");
                window.location.reload();
            }
            else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error('Error creating a new author:', error);
            toast.error('Error creating author');
        }
    }
    const handleNewSupervisor = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!supervisorName || !supervisorDept) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            const data = await fetch("http://localhost:8081/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: supervisorName,
                    role: "Supervisor",
                    departmentId: supervisorDept
                })
            });

            const res = await data.json();

            if (data.ok) {
                toast.success("Supervisor created successfully");
                window.location.reload();
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.error("Error creating supervisor:", error);
            toast.error("Error creating supervisor");
        }
    }
    const handleChange=async()=>{
        setAllowDownload((t)=>!t);
    }
    return (
        <Box maxW="3xl" mx="auto" className='py-4 px-8 border'>
            {newAuthor && 
            <div className='fixed z-50 flex flex-col bg-amber-100 p-4 gap-2 w-fit '>
                <div className='flex flex-col p-3 w-lg gap-2'>
                    <label>Name:</label>
                    <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} type="text" className='border' />
                    <label>Department:</label>
                    <select value={authorDept} onChange={(e) => setAuthorDept(e.target.value)} className="border">
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                            <option key={d._id} value={d._id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                    <label>DegreeType:</label>
                    <div>
                        {['Btech', 'MA', 'MSc','MTech','MTech by Research','PhD'].map((deg) => (
                            <div key={deg}>
                                <input type="radio" value={deg} onChange={(e) => setAuthorDegree(e.target.value)} checked={authorDegree === deg} id={deg} className='border' />
                                <label>{deg}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=' flex gap-3  flex-row-reverse'>
                    <button onClick={() => {
                        setNewAuthor(false);
                        setAuthorDegree("");
                        setAuthorDept("");
                        setAuthorName("");
                        setAuthorId("default");
                    }} className='border px-2 py-1 rounded bg-amber-200 '>Cancel</button>
                    <button onClick={handleNewAuthor} className='border px-2 py-1 rounded bg-amber-200 '>Submit</button>
                </div>
            </div>}
            {newSupervisor && 
            <div className='fixed z-50 flex flex-col bg-amber-100 p-4 gap-2 w-fit '>
                <div className='flex flex-col p-3 w-lg gap-2'>
                    <label>Name:</label>
                    <input value={supervisorName} onChange={(e) => setSupervisorName(e.target.value)} type="text" className='border' />
                    <label>Department:</label>
                    <select value={supervisorDept} onChange={(e) => setSupervisorDept(e.target.value)} className="border">
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                            <option key={d._id} value={d._id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className=' flex gap-3  flex-row-reverse'>
                    <button onClick={() => {
                        setNewSupervisor(false);
                        setSupervisorDept("");
                        setSupervisorName("");
                    }} className='border px-2 py-1 rounded bg-amber-200 '>Cancel</button>
                    <button onClick={handleNewSupervisor} className='border px-2 py-1 rounded bg-amber-200 '>Submit</button>
                </div>
            </div>}
            
            <div className='flex flex-col'>
                <Field.Root className='mb-2'>
                    <Field.Label>Title:</Field.Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='border' />
                    <Field.Label>Abstract:</Field.Label>
                    <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} rows={6} className="border w-full"/>    
                    <Field.Label>Author:</Field.Label>
                    <NativeSelect.Root value={authorId} onChange={(e) => {
                        if (e.target.value == 'new') {
                            setNewAuthor(true);
                            setAuthorId("default");
                        }
                        else {
                            setAuthorId(e.target.value);
                        }
                    }} className='border'>

                        <NativeSelect.Field>
                            <option value="default">Select Author</option>
                            <option value="new">+ Add a new author</option>
                            {author.map(a => (
                                <option key={a._id} value={a._id}>
                                    {a.name}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />

                    </NativeSelect.Root>
                    <Field.Label>Supervisor(s):</Field.Label>
                    <div className="flex flex-wrap gap-2 mb-1">
                        <button
                            type="button"
                            onClick={() => setNewSupervisor(true)}
                            className="text-sm border border-amber-500 text-amber-700 px-2 py-1 rounded hover:bg-amber-50"
                        >
                            + Add a new supervisor
                        </button>
                    </div>
                    <div className="border p-2 max-h-40 overflow-y-auto">
                        {supervisor.map((s) => (
                            <label key={s._id} className="flex items-center gap-2">
                            <input type="checkbox" checked={supervisorIds.includes(s._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSupervisorIds((prev) => [...prev, s._id]);
                                    } else {
                                        setSupervisorIds((prev) =>
                                        prev.filter((id) => id !== s._id)
                                        );
                                    }
                                }}
                            />
                            {s.name}
                            </label>
                        ))}
                    </div>
                    <Field.Label>Department:</Field.Label>
                    <NativeSelect.Root value={dept} onChange={handleDeptChange} className="border">
                        <NativeSelect.Field>
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                            <option key={d._id} value={d._id}>
                                {d.name} 
                            </option>
                        ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator/>
                    </NativeSelect.Root>
                    <div>
                        <label>Degree Type:</label>
                        <div>
                            {['Btech', 'MA', 'MSc','MTech','MTech by Research','PhD'].map((deg) => (
                                <div key={deg}>
                                    <input type="radio" defaultChecked value={deg} onChange={(e) => setDegree(e.target.value)} checked={degree === deg} id={deg} className='checkbox checkbox-sm text-black' />
                                    <label>{deg}</label>
                                </div>
                            ))}
                        </div>

                    </div>
                    {pdfFile && (
                        <p className="text-sm text-gray-600">
                            Uploaded PDF: <strong>{pdfFile.name}</strong>
                        </p>
                    )}
                    <label>Keywords:</label>
                    <input value={keywords} onChange={(e) => setKeywords(e.target.value)} type="text" className='border w-full' />
                    <label>Year:</label>
                    <input value={year} onChange={(e) => setYear(e.target.value)} type="number" placeholder="Enter year" className="border"/>
                </Field.Root>
                <FormControlLabel  required control={<Switch onChange={handleChange} />} label="Allow Downlaod" />
            </div>
            <Button colorPalette="cyan" loading={loading} loadingText="Saving..." onClick={handleSubmit} className='bg-gray-200 my-4 text-gray-700 px-3 py-1 text-sm rounded border hover:bg-gray-300'>Submit</Button>
        </Box>
    )
}

export default Upload