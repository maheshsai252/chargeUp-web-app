import React, { useEffect } from 'react'
import { useState } from 'react';
import '../../css/dashboard.scss';

import ParticipantsTable from './ParticipantsTable';

export default function EventDashboardView({event, regs}) {
    const [groups,setGroups] = useState({});
    const [count,setCount] = useState(0);

    useEffect(()=> {
        setCount(0)
        const groups = regs.reduce((groups, game) => {
            console.log(game, "dd")
            const date = game.date.split('T')[0];
            if (!groups[date]) {
              groups[date] = 0;
            }
            groups[date]+=1;
            setCount(count+1);
            return groups;
          }, {});
        setGroups(groups);
    },[regs])
  return (
    <div>   
     
        <br />
        <ParticipantsTable groups={groups} />
    </div>
  )
}
