import React, { useState } from 'react';
import { Document } from 'react-pdf';


export default function Resume() {
  // const [file] = useState<File('../../assets/resume.pdf');
  var file = new File([""], "../../assets/resume.pdf");


  return (
    <>
      <Document file={file} />
    </>
  );
}