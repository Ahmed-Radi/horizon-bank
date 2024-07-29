import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionTable from "./TransactionTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
	accounts,
	transactions = [],
	appwriteItemId,
	page = 1,
}: RecentTransactionsProps) => {
	const rowsParPage = 10;
	const totalPages = Math.ceil(transactions.length / rowsParPage);
	const indexOfLastTransaction = page * rowsParPage;
	const indexOfFirstTransaction = indexOfLastTransaction - rowsParPage;
	const currentTransactions = transactions.slice(
		indexOfFirstTransaction,
		indexOfLastTransaction
	);

	return (
		<section className='recent-transactions'>
			<header className='flex items-center justify-between'>
				<h2 className='recent-transactions-label'>
					Recent Transactions
				</h2>
				<Link
					href={`/transaction-history/?id=${appwriteItemId}`}
					className='view-all-btn'>
					View All
				</Link>
			</header>
			<Tabs defaultValue={appwriteItemId} className='w-full'>
				<TabsList className='recent-transactions-tablist'>
					{accounts.map(account => (
						<TabsTrigger
							key={account.id}
							value={account.appwriteItemId}>
							<BankTabItem
								key={account.id}
								account={account}
								appwriteItemId={appwriteItemId}
							/>
						</TabsTrigger>
					))}
				</TabsList>
				{accounts.map(account => (
					<TabsContent
						value={account.appwriteItemId}
						key={account.id}
						className='space-y-4'>
						<BankInfo
							appwriteItemId={account.appwriteItemId}
							account={account}
							type='full'
						/>
						<TransactionTable transactions={currentTransactions} />
						{totalPages > 1 && (
							<div className='my-4 w-full'>
								<Pagination
									totalPages={totalPages}
									page={page}
								/>
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
};

export default RecentTransactions;
