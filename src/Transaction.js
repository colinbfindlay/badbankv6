import React from 'react'

export default function Transaction({ transaction }) {

  if(transaction.isDeposit) {
  return (
    <div>
      <label className="text-success">
        ${transaction.amount} {transaction.description}
      </label>
    </div>
  )
  }
  return (
    <div>
      <label className="text-danger">
        ${transaction.amount} {transaction.description}
      </label>
    </div>
  )

}