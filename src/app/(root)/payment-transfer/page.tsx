import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const PaymentTransfer = async () => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn.$id,
  })

  if(!accounts) return;

  const accountsData = accounts?.data;

  return (
    <div className='payment-transfer'>
      <HeaderBox
        title='Transfer Funds'
        subtext ='Please provide any details or note related to the payment transfer'
      />
      <section className='size-full pt-5'>
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </div>
  )
}

export default PaymentTransfer;