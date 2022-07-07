import React, { useState, useEffect } from 'react'
export const useGroup = ({data, groupBy}) => {
    const [groupData, setGroupData] = useState(null);
    const makeGroup = () => {
        if(!data) return;
        let group = {};
        for(let d of data) {
            if(!group[d[`${groupBy}`]]) group[d[`${groupBy}`]] = [];
            group[d[`${groupBy}`]].push(d)
        }
        setGroupData(group);
    }
    useEffect(() => {
        makeGroup();
    }, [data])
    return groupData;
}