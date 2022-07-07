import React from 'react'
import useFetch from '../hooks/useFetch'

const RewardsTable = () => {
    const transactions = useFetch('/transactions');
    return(
        <>
            <div className = "wrapper">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Customer</td>
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
                                    <td>{t.amout}</td>
                                    <td>{t.amout}</td>
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