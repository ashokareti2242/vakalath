import { useEffect, useRef, useState } from 'react'
import './App.css'
import { CounterAffidavitTemplate } from './pages/highcourt/counter/template';
import {ContemptAffidavitTemplate} from './pages/highcourt/cc/template'
import { renderAsync } from 'docx-preview';
import { Packer } from 'docx';

function App() {
  const containerRef = useRef();
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const doc = ContemptAffidavitTemplate(); 
      Packer.toBlob(doc).then((blob) => {
        renderAsync(blob, containerRef.current, null, {
          className: "docx-preview",
          style: { width: "100%", height: "500px", border: "1px solid #ccc" },
        });
      });
    }
  }, []);
  


  return (
    <div ref={containerRef} />
  )
}

export default App
