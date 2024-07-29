import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

type Props = {}

const MyBanks = async () => {

  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn.$id,
  })

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          title='My Bank Accounts'
          subtext='View all your bank accounts here.'
        />
        <div className='space-y-4'>
          <h2 className='header-2'>
            Your cards
          </h2>
          <div className='flex flex-wrap gap-2'>
            {accounts ? accounts && accounts?.data?.map((account: Account) => (
              <BankCard
                key={account.id}
                account={account}
                userName={loggedIn.firstName}
              />
            )) : <div>No Accounts, yet.</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks;