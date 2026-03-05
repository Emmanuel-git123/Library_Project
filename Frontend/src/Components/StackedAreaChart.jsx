import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Button } from 'react-cmdk/dist/components/ListItem';

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2400, 2210, 0, 2000, 2181, 2500, 2100];


export default function StackedAreaChart() {
    // const [years,setYears]=useState([]);
    // useEffect(()=>{
    //     const fetchYears=async()=>{
    //         try {
    //             const res=await fetch('http://localhost:8081/api/thesis');
    //             const data=await res.json();
    //             if(res.ok){
    //                 setYears(data.required_thesis.year);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error)
    //         }
    //     }
    //     fetchYears();
    // },[])

    const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];
    
  return (
    <>
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[
            { data: uData, label: 'uv', area: true, stack: 'total', showMark: false },
            { data: pData, label: 'pv', area: true, stack: 'total', showMark: false },
            {
                data: amtData,
                label: 'amt',
                area: true,
                stack: 'total',
                showMark: false,
            },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
        yAxis={[{ width: 50 }]}
        sx={{
            [`& .${lineElementClasses.root}`]: {
                display: 'none',
            },
        }}
        margin={margin}
        />
    </Box>
    {/* <button onClick={handleclick}>Hwwnldnw</button> */}
    </>
  );
}
