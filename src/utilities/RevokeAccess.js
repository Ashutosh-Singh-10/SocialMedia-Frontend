import React, { useState, useEffect } from 'react';

export default function RevokeAccess() {
    




      const [timer, setTimer] = useState(0);
    
      useEffect(() => {
        const intervalId = setTimeout(() => {
          setTimer(timer + 1);
        }, 1000);
    
        return () => {
          clearTimeout(intervalId);
        };
      }, [timer]);








  return (
    <div>
the timer is        {timer}
    </div>
)
}
