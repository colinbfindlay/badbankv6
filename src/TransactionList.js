import React, { useContext } from 'react'
import Transaction from './Transaction'

export default function TransactionList( {ctxB}) {

  return (
    ctxB.balance.map(transaction => {
      return (
        <Transaction key={transaction.id} transaction={transaction} />
      )
    })
  )
}
