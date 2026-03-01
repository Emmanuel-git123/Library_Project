import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import worker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

const PDFViewer = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber,setPageNumber]=useState(0);
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [workerError, setWorkerError] = useState(false);

  const onDocumentSuccess=({numPages})=>{
    setNumPages(numPages);
    setPageNumber(1);
  };


  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("No authentication token found");
        }

        const res = await fetch(
          `http://localhost:8081/api/thesis/pdf/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch PDF: ${res.statusText}`);
        }

        const data = await res.json();
        
        if (!data.url) {
          throw new Error("No URL returned from server");
        }

        setUrl(data.url);
      } catch (err) {
        console.error("Error fetching PDF:", err);
        setError(err.message);
      } 

    };

    if (id) {
      fetchSignedUrl();
    }
  }, [id]);


  return (
    <div>
        <Document file={url} onLoadSuccess={onDocumentSuccess}>
            <Page height={600} pageNumber={pageNumber}/>
        </Document>
    </div>
  );
};

export default PDFViewer;