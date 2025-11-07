import { useEffect, useRef, useState } from 'react'
import './App.css'
import { CounterAffidavitTemplate } from './pages/highcourt/counter/template';
import { ContemptAffidavitTemplate } from './pages/highcourt/cc/template'
import { renderAsync } from 'docx-preview';
import { Packer } from 'docx';
import { generateAndDownloadDocx } from './services/templateFunctions';
import { AffipetTemplate } from './pages/highcourt/aa/template';

function App() {
  const containerRef = useRef();
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const doc = AffipetTemplate();
      Packer.toBlob(doc).then((blob) => {
        renderAsync(blob, containerRef.current, null, {
          className: "docx-preview",
          style: { width: "100%", height: "500px", border: "1px solid #ccc" },
        });
      });
    }
  }, []);



  return (
    <div>
      <button
        className="btn btn-success"
        onClick={() => generateAndDownloadDocx()}
      >
        Download DOCX
      </button>
      <div ref={containerRef} />
    </div>
  )
}

export default App
