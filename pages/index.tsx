import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTour } from '@reactour/tour';
import Button, { ButtonGroup } from '../components/bootstrap/Button';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../layout/SubHeader/SubHeader';
import CommonAvatarTeam from '../common/partial/other/CommonAvatarTeam';
import ThemeContext from '../context/themeContext';
import useDarkMode from '../hooks/useDarkMode';
import { TABS, TTabs } from '../common/type/helper';
import Page from '../layout/Page/Page';
import CommonDashboardAlert from '../common/partial/CommonDashboardAlert';
import CommonDashboardUserCard from '../common/partial/CommonDashboardUserCard';
import StaffOfficer from '../common/partial/StaffOfficer';
import CommonDashboardDesignTeam from '../common/partial/CommonDashboardDesignTeam';
import CommonDashboardIncome from '../common/partial/CommonDashboardIncome';
import CommonDashboardRecentActivities from '../common/partial/CommonDashboardRecentActivities';
import CommonDashboardUserIssue from '../common/partial/CommonDashboardUserIssue';
import CommonDashboardSalesByStore from '../common/partial/CommonDashboardSalesByStore';
import CommonDashboardWaitingAnswer from '../common/partial/CommonDashboardWaitingAnswer';
import CommonDashboardTopSeller from '../common/partial/CommonDashboardTopSeller';
import CommonMyWallet from '../common/partial/CommonMyWallet';
import { useUserContext } from '../context/UserContext';
import StaffSalesman from '../common/partial/StaffSalesman';
import StaffPilot from '../common/partial/StaffPilot';
import StaffDriver from '../common/partial/StaffDriver';
import VehiclePerformance from '../common/partial/VehiclePerformance';
import StaffOperation from '../common/partial/StaffOperation';

const Index: NextPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	const { user } = useUserContext();
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			localStorage.getItem('tourModalStarted') !== 'shown' &&
			!mobileDesign
		) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { themeStatus } = useDarkMode();

	const [activeTab, setActiveTab] = useState<TTabs>(TABS.DAILY);

	return (
		<PageWrapper>
			<Head>
				<title>Yönetim Paneli</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Yönetim Paneli</span>
					<SubheaderSeparator />
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Aktif</strong> Personel
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<CommonDashboardAlert />
					</div>

					<div className='col-xl-4'>
						<CommonDashboardUserCard user={user} />
					</div>
					<div className='col-xl-4'>
						<StaffOfficer />
					</div>
					<div className='col-xl-4'>
					    <StaffSalesman />
					</div>
					<div className='col-xl-4'>
					    <StaffPilot />
					</div>
					<div className='col-xl-4'>
					    <StaffDriver />
					</div>
					<div className='col-xl-4'>
					    <StaffOperation />
					</div>

				{/* 	<div className='col-xxl-8'>
						<CommonDashboardIncome activeTab={activeTab} />
					</div> */}
				{/* 	 <div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>  */}
					<div className='col-xxl-12'>
						<CommonDashboardUserIssue />
					</div> 

				{/* 	<div className='col-xxl-8'>
						<CommonDashboardSalesByStore />
					</div> */}
			{/* 		<div className='col-xxl-4 col-xl-12'>
						<CommonDashboardWaitingAnswer />
					</div> */}

					{/* <div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div> */}
					<div className='col-xl-12'>
						<VehiclePerformance />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Index;
