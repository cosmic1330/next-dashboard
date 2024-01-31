import { useEffect, useMemo, useState } from 'react';

export default function useClocks() {
    const [date, setDate] = useState(new Date());
    

  const {hours, minutes} = useMemo(()=>{

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return {hours, minutes}
  },[date])

  
  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return {
    date,
    hours,
    minutes
  }
}
