import React from 'react'
import useFetch from '../hooks/useFetch'
import { useGroup } from '../hooks/useGroup'
import { calculateRewards, formatMoney, formatDisplayDate, totalRewards } from '../utils/helpers'
const RewardsTable = () => {
    const transactions = useFetch('/transactions');
    const groupData = useGroup({data: transactions?.data, groupBy: 'customer_id'});
    return(
        <>
            <div className = "wrapper">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Customer</td>
                            <td>Timestamp</td>
                            <td>Transaction Amount</td>
                            <td>Rewards</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions?.data && transactions?.data.map((t) => (
                                <tr key = {t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.customer_name}</td>
                                    <td>{formatDisplayDate(t.timestamp)}</td>
                                    <td>{formatMoney(t.amount)}</td>
                                    <td>{formatMoney(calculateRewards(t.amount))}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className = "wrapper">
                <table>
                    <thead>
                        <tr>
                            <td>Customer</td>
                            <td>Total Rewards</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groupData && Object.keys(groupData).map((customer_id) => (
                               <tr key = {customer_id}>
                                   <td>{groupData[customer_id][0].customer_name}</td>
                                   <td>{formatMoney(totalRewards(groupData[customer_id]))}</td>
                               </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default RewardsTable