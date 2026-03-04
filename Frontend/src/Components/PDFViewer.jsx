import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page} from "react-pdf";
import toast from "react-hot-toast";

import { pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFViewer = () => {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:8081/api/thesis/pdf/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          toast.error("Failed to load PDF");
          return;
        }

        const data=await res.json();
        setFileUrl(data.url);
        console.log("SIGNED URL:", data.url);

      } catch (err) {
        console.error(err);
        toast.error("Error loading PDF");
      }
    };

    fetchPdf();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center p-6">
      {fileUrl ? (
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;