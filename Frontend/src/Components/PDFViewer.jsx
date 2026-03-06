import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import toast from "react-hot-toast";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
const PDFViewer = () => {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [thesis,setThesis] = useState(null);
  const [name,setName] = useState("");
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8081/api/thesis/pdf/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load");
        
        const data = await res.json();
        setFileUrl(data.url);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPdf();
  }, [id]);

  useEffect(()=>{
    const fetchName=async()=>{
      try {
        const res=await fetch(`http://localhost:8081/api/thesis/${id}`)
        const data=await res.json();

        if(res.ok){
          setThesis(data.thesis);
          setName(data.thesis.author.name);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchName();
  },[id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div onContextMenu={handleContextMenu} className="select-none bg-gray-400 p-5 flex flex-col items-center">
      {fileUrl && <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<div>Loading PDF...</div>}>
      {numPages &&Array.from(new Array(numPages),(el,index)=>(
        <div key={index} className="mb-6 flex justify-center">
          <div className="text-8xl opacity-60 absolute text-gray-100 z-10 rotate-45 self-center items-center">{name}</div>
          <Page scale={1.2} pageNumber={index+1}  renderTextLayer={false} renderAnnotationLayer={true} />
        </div>
      ))}
      </Document>}
    </div>
  );
};

export default PDFViewer;