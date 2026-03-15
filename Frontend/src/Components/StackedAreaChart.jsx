import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const margin = { right: 24 };

export default function StackedAreaChart() {
  const [theses, setTheses] = useState([]);
  const [years, setYears] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [projectYearData, setProjectYearData] = useState([]);
  const [dissertationsYearData,setDissertationsYearCounts] = useState([]);
  const [thesesYearData,setThesesYearData] = useState([]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/thesis');
        const data = await res.json();

        if (res.ok) {
          const thesesData = data.required_thesis;

          setTheses(thesesData);

          const extractedYears = thesesData.map((t) => t.year);
          const uniqueYears = [...new Set(extractedYears)].sort();
          setYears(uniqueYears);

          const yearCounts = uniqueYears.map((year) => {
            return thesesData.filter((t) => (t.degreeType === "MSc"||t.degreeType === "MA"||t.degreeType === "MTech"||t.degreeType === "MTech by Research")).filter((t)=>t.year===year).length;
          });

          const projectYearCounts=uniqueYears.map((year)=>{
            return thesesData.filter((t)=>t.degreeType==="Btech").filter((t)=>t.year===year).length;
          });

          const dissertationsYearCounts=uniqueYears.map((year)=>{
            return thesesData.filter((t)=>(t.degreeType === "MSc"||t.degreeType === "MA"||t.degreeType === "MTech"||t.degreeType === "MTech by Research")).filter((t)=>t.year===year).length;
          });

          const thesesYearCounts=uniqueYears.map((year)=>{
            return thesesData.filter((t)=>(t.degreeType === "PhD")).filter((t)=>t.year===year).length;
          });

          setYearData(yearCounts);
          setProjectYearData(projectYearCounts);
          setDissertationsYearCounts(dissertationsYearCounts);
          setThesesYearData(thesesYearCounts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchYears();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', height: 300 }}>
        <LineChart
          series={[
              { data: projectYearData, label: 'Projects', area: true, stack: 'total', showMark: false },
              {
                  data: thesesYearData,
                  label: 'Theses',
                  area: true,
                  stack: 'total',
                  showMark: false,
                },
                { data: dissertationsYearData, label: 'Dissertations', area: true, stack: 'total', showMark: false },

          ]}
          xAxis={[{ scaleType: 'point', data: years, height: 28 }]} 
          yAxis={[{ width: 50 }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: 'none',
            },
          }}
          margin={margin}
        />
      </Box>
    </>
  );
}