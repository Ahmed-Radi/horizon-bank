import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

export default function Home() {
	const loggedIn = {
		firstName: "Ahmed",
		lastName: "Radi",
		email: "ahmedradi743@gmail.com",
	};
	return (
		<section className='home'>
			<div className='home-content'>
				<header className='home-header'>
					<HeaderBox
						type='greeting'
						title='Welcome'
						user={loggedIn.firstName || "Ahmed Radi"}
						subtext='Access and manage your account and transactions efficiently.'
					/>
					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={1250.12}
					/>
				</header>
			</div>
			<RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 1254}, {}]} />
		</section>
	);
}
