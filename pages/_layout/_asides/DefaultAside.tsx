import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Brand from '../../../layout/Brand/Brand';
import Navigation, { NavigationLine } from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import {
	adminMenu,
	componentPagesMenu,
	dashboardMenu,
	dashboardPagesMenu,
	demoPagesMenu,
	pageLayoutTypesPagesMenu,
	reservationMenu,
	ticketMenu,
} from '../../../menu';
import ThemeContext from '../../../context/themeContext';
import Card, { CardBody } from '../../../components/bootstrap/Card';

import Hand from '../../../assets/img/hand.png';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';
import { useRouter } from 'next/router';
import { useUserContext } from '../../../context/UserContext';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(
		(typeof window !== 'undefined' &&
			localStorage.getItem('facit_asideDocStatus') === 'true') ||
			false,
	);
	const router = useRouter();
	const { t } = useTranslation(['common', 'menu']);

	const { darkModeStatus } = useDarkMode();
	const {user}= useUserContext();

console.log(user.roleId, '----');

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				<Navigation menu={dashboardMenu} id='aside-dashboard' />
				
				<>
					<NavigationLine />
					{(Number(user.roleId) === 1 || Number(user.roleId) === 6) && <Navigation menu={adminMenu} id='aside-menu1' />}
					<NavigationLine />
					<Navigation menu={reservationMenu} id='aside-menu2' />
					<NavigationLine />
					{!asideStatus && <Navigation menu={ticketMenu} id='aside-menu3' />}
				</>
				

			

				{asideStatus  && (
					<Card className='m-3 '>
						<CardBody className='pt-0'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={Hand} alt='Hand' width={130} height={130} />
							<p
								className={classNames('h4', {
									'text-dark': !darkModeStatus,
									'text-light': darkModeStatus,
								})}>
								{/* {t('Everything is ready!')} */}
								Bilet Satışı
							</p>
							<Button
								color='info'
								isLight
								className='w-100'
								onClick={() => {
									router.push('/bilet');
									/* localStorage.setItem('facit_asideDocStatus', 'false');
									setDoc(false); */
								}}>
							{/* 	{t('Demo Pages')} */}
							Satış Yap
							</Button>
						</CardBody>
					</Card>
				)}
			</AsideBody>
			<AsideFoot>
		{/* 		<nav aria-label='aside-bottom-menu'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								//localStorage.setItem('facit_asideDocStatus', String(!doc));
								//setDoc(!doc);
							}}
							data-tour='documentation'>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={doc ? 'ToggleOn' : 'ToggleOff'}
										color={doc ? 'success' : undefined}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{t('menu:Documentation')}
									</span>
								</span>
								<span className='navigation-link-extra'>
									<Icon
										icon='Circle'
										className={classNames(
											'navigation-notification',
											'text-success',
											'animate__animated animate__heartBeat animate__infinite animate__slower',
										)}
									/>
								</span>
							</span>
						</div>
					</div>
				</nav> */}
				<User />
			</AsideFoot>
		</Aside>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default DefaultAside;
