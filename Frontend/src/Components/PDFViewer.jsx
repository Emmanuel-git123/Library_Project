import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ thesisId, pdfTitle }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 border rounded-lg shadow-lg overflow-hidden bg-white">
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-6xl font-bold text-gray-300 opacity-20 rotate-12 select-none text-center wrap-break-word">
          {pdfTitle || 'Untitled'}
        </span>
      </div>

      <div className="relative z-10 p-4 overflow-auto h-[80vh]">
        <Document
          file={`/api/thesis/pdf/${thesisId}`}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ workerSrc: "/pdf.worker.js" }}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="mb-4 shadow-md rounded"
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;