import React from 'react'
import { Box, FileUpload, Icon } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState } from 'react'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import axios from "axios";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const ExtractMetaData = () => {
  const [file,setFile]=useState(null);
  const [loading,setLoading]=useState(false);
  const [progress, setProgress] = useState(0);

  const navigate=useNavigate();

  const handleClick= async ()=>{
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    setLoading(true);
    setProgress(0);

    const formData=new FormData();
    formData.append("pdf",file);

    const token=localStorage.getItem("token");

    try {
      const res=await axios.post("http://localhost:8081/api/thesis/extract",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          }
        }
      );
      const data=res.data; 
      toast.success("Metadata extracted!");

      navigate("/view/upload/submit",{
        state:{
          extractedMeta:data,
          pdfFile:file
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Failed to extract metadata");
    }
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-3xl font-bold my-8'>Upload Thesis</div>
      <FileUpload.Root onFileAccept={({files}) => {setFile(files[0]);}} maxW="xl" alignItems="stretch" accept=".pdf" className='mb-8 cursor-pointer' maxFiles={1}>
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone>
          <Icon as={LuUpload} boxSize="6" color="fg.muted" />
          <FileUpload.DropzoneContent>
            <Box>Drag and drop files here</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
        <FileUpload.List />
      </FileUpload.Root>
      {loading && (
        <div className="w-full max-w-xl mb-6">
          <div className='mb-2'>Uploading:</div>
          <LinearProgressWithLabel value={progress} />
        </div>
      )}
      <ButtonGroup size="sm" className='mb-8' variant="outline">
      {!loading?(<Button disabled={!file} onClick={handleClick} colorPalette="blue">Save</Button>):(<Button disabled className='transition-all' colorPalette="green">Uploading...</Button>)}
      <Button onClick={()=>window.location.reload()}>Cancel</Button>
    </ButtonGroup>
    </div>
  )
} 

export default ExtractMetaData