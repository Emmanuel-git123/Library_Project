import React from 'react'
import { Box, FileUpload, Icon } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState } from 'react'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

const ExtractMetaData = () => {
  const [file,setFile]=useState(null);
  const navigate=useNavigate();
  const handleClick= async ()=>{
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    const formData=new FormData();
    formData.append("pdf",file);
    const token=localStorage.getItem("token");
    try {
      const res=await fetch("http://localhost:8081/api/thesis/extract",{
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      // console.log(data.text);
      if(!res.ok){
        toast.error("Extraction Failed!");
        return;
      }
      else{
        toast.success("Metadata extracted!");
        navigate("/view/upload/submit", {
          state: {
            extractedMeta: data,
            pdfFile: file
          }
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to extract metadata");
    }
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-3xl font-bold my-8'>Upload Thesis</div>
      <FileUpload.Root onFileAccept={({files}) => {setFile(files[0]);}} maxW="xl" alignItems="stretch" accept=".pdf" className='mb-8 cursor-pointer' maxFiles={1}>
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone>
          <Icon size="md" color="fg.muted">
            <LuUpload />
          </Icon>
          <FileUpload.DropzoneContent>
            <Box>Drag and drop files here</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
        <FileUpload.List />
      </FileUpload.Root>
      <ButtonGroup size="sm" className='mb-8' variant="outline">
      <Button disabled={!file} onClick={handleClick} colorPalette="blue">Save</Button>
      <Button onClick={()=>window.location.reload()}>Cancel</Button>
    </ButtonGroup>
    </div>
  )
} 

export default ExtractMetaData