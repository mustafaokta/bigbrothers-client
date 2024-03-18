import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { createUseStyles } from 'react-jss';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import Richie from '../../assets/img/richie.png';
import BootstrapLogo from '../../assets/img/bootstrap.svg';
import StorybookLogo from '../../assets/img/storybbok.png';
import FormikLogo from '../../assets/img/formik.jpeg';
import ApexLogo from '../../assets/img/apexcharts.png';
import Item1 from '../../assets/img/animation-items/item.png';
import Item2 from '../../assets/img/animation-items/item2.png';
import Item3 from '../../assets/img/animation-items/item3.png';
import Item4 from '../../assets/img/animation-items/item4.png';
import Item5 from '../../assets/img/animation-items/item5.png';
import Item6 from '../../assets/img/animation-items/item6.png';
import Item7 from '../../assets/img/animation-items/item7.png';
import Item8 from '../../assets/img/animation-items/item8.png';
import Item9 from '../../assets/img/animation-items/item9.png';
import Item10 from '../../assets/img/animation-items/item10.png';
import Item11 from '../../assets/img/animation-items/item11.png';
import Item12 from '../../assets/img/animation-items/item12.png';
import Item13 from '../../assets/img/animation-items/item13.png';
import Item14 from '../../assets/img/animation-items/item14.png';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import Badge from '../../components/bootstrap/Badge';
import Button from '../../components/bootstrap/Button';
import Page from '../../layout/Page/Page';
import Card, { CardBody } from '../../components/bootstrap/Card';
import Logo from '../../components/Logo';

const useStyles = createUseStyles({
	// stylelint-disable
	intro: {
		zIndex: 200,
		overflow: 'hidden',
	},

	introImageWrapper: {
		zIndex: 1,
	},

	introImage: {
		backgroundImage: `url(${Richie})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		height: '100%',

		'@media (min-width: 992px)': {
			backgroundPosition: 'center right',
			transform: 'translateX(10vw)',
		},
	},

	introContentWrapper: {
		zIndex: 2,
	},

	animation: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		display: 'flex',
		overflow: 'hidden',
		width: '100%',
		height: '100vh',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},

	item: {
		position: 'relative',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		transformStyle: 'preserve-3d',
		willChange: 'transform',
	},

	item1: {
		top: '10%',
		width: 20,
		height: 20,
		backgroundImage: `url(${Item1})`,
	},

	item2: {
		top: '15%',
		width: 55,
		height: 55,
		backgroundImage: `url(${Item2})`,
	},

	item3: {
		top: '37%',
		left: '-30%',
		width: 45,
		height: 45,
		backgroundImage: `url(${Item3})`,
	},

	item4: {
		width: 15,
		height: 15,
		margin: 'auto 10px',
		backgroundImage: `url(${Item4})`,
	},

	item5: {
		top: '78%',
		right: '24%',
		bottom: 'auto',
		left: 'auto',
		width: 12,
		height: 12,
		backgroundImage: `url(${Item5})`,
	},

	item6: {
		top: '53%',
		right: '20%',
		bottom: 'auto',
		left: 'auto',
		width: 10,
		height: 10,
		backgroundImage: `url(${Item6})`,
	},

	item7: {
		top: '60%',
		right: '0%',
		bottom: 'auto',
		left: '0%',
		width: 25,
		height: 25,
		backgroundImage: `url(${Item7})`,
	},

	item8: {
		position: 'absolute',
		top: 'auto',
		right: '8%',
		bottom: '14%',
		width: 44,
		height: 44,
		backgroundImage: `url(${Item8})`,
	},

	item9: {
		top: '32%',
		bottom: 'auto',
		left: '16%',
		width: 10,
		height: 10,
		backgroundImage: `url(${Item9})`,
	},

	item10: {
		top: '32%',
		right: '-35%',
		width: 32,
		height: 32,
		backgroundImage: `url(${Item10})`,
	},

	item11: {
		top: '71%',
		right: 'auto',
		bottom: 'auto',
		left: '38%',
		width: 20,
		height: 20,
		backgroundImage: `url(${Item11})`,
	},

	item12: {
		top: '73%',
		right: 'auto',
		bottom: 'auto',
		left: '-44%',
		width: 18,
		height: 18,
		backgroundImage: `url(${Item12})`,
	},

	item13: {
		top: '56%',
		right: 'auto',
		bottom: 'auto',
		left: '30%',
		width: 12,
		height: 12,
		backgroundImage: `url(${Item13})`,
	},

	item14: {
		top: '93%',
		right: '-22%',
		bottom: 'auto',
		left: '0%',
		width: 18,
		height: 18,
		backgroundImage: `url(${Item14})`,
	},

	logoWrapper: {
		height: 300,

		'@media (minwidth: 992px)': {
			height: 450,
		},
	},

	bootstrapLogo: {
		height: '100%',
		backgroundImage: `url(${BootstrapLogo})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
	},

	storybookLogo: {
		height: '100%',
		backgroundImage: `url(${StorybookLogo})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
	},

	formikLogo: {
		height: '100%',
		backgroundImage: `url(${FormikLogo})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
	},

	apexLogo: {
		height: '100%',
		backgroundImage: `url(${ApexLogo})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
	},
	// stylelint-enable
});

const Index: NextPage = () => {
	const classes = useStyles();
	const [ref, { height }] = useMeasure<HTMLDivElement>();

	return (
		<PageWrapper ref={ref}>
			<Head>
				<title>React Admin Dashboard Template</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<span className='fw-bold'>React Admin Dashboard Template</span>
					<SubheaderSeparator />
					<span>
						incl. Bootstrap{' '}
						<sup>
							<Badge color='primary' isLight rounded={1}>
								5
							</Badge>
						</sup>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button color='success' isLight icon='ShoppingCart' tag='a' href='/'>
						Buy on Envato
					</Button>
					<Button
						color='info'
						isLight
						tag='a'
						href='mailto:info@omtanke.studio'
						icon='MarkunreadMailbox'>
						Support
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div id='intro' className='scroll-margin'>
					<div className={classNames('row', 'h-fluid-min-100', classes.intro)}>
						<div
							className={classNames('col-lg-6', 'col-12', classes.introImageWrapper)}>
							<div className={classes.introImage} />
						</div>
						<div
							className={classNames(
								'col-lg-6',
								'col-12',
								'd-flex',
								'align-items-center',
								'justify-content-center',
								classes.introContentWrapper,
							)}>
							<div>
								<h1 className='display-1 mb-4'>
									Welcome to <Logo height={70} />
								</h1>
								<p className='display-6 mb-4'>
									Everything is thought to make it easy.
								</p>
								<p className='h2 mb-5'>
									Take your coffee and{' '}
									<span className='text-info'>focus on your business.</span>
								</p>
								<Button
									color='primary'
									size='lg'
									shadow='lg'
									isOutline
									icon='Class'
									tag='a'
									to='#bootstrap'>
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={classes.animation}>
						<motion.div
							animate={{
								x: [height * -0.3, height * -0.35, height * -0.3],
								y: [height * 0.2, height * 0.25, height * 0.2],
							}}
							transition={{
								duration: 15,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item1)}
						/>
						<motion.div
							animate={{
								x: [0, -4, 0],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 25,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item2)}
						/>
						<motion.div
							animate={{
								x: [-48, 0, -48],
								y: [-170, 0, -170],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 32,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item3)}
						/>
						<motion.div
							animate={{
								y: [0, 150, 0],
							}}
							transition={{
								duration: 18,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item4)}
						/>
						<motion.div
							animate={{
								x: [0, 200, 0],
								y: [0, 200, 0],
							}}
							transition={{
								duration: 46,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item5)}
						/>
						<motion.div
							animate={{
								x: [0, -150, 0],
							}}
							transition={{
								duration: 22,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item6)}
						/>
						<motion.div
							animate={{
								x: [0, -300, 0],
								y: [0, -100, 0],
							}}
							transition={{
								duration: 22,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item7)}
						/>
						<motion.div
							animate={{
								x: [0, -200, 0],
								y: [0, -200, 0],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 38,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item8)}
						/>
						<motion.div
							animate={{
								x: [0, 120, 0],
								y: [0, 120, 0],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 54,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item9)}
						/>
						<motion.div
							animate={{
								x: [50, 50, 50],
								y: [0, 140, 0],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 15,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item10)}
						/>
						<motion.div
							animate={{
								x: [0, -120, 0],
								y: [0, -120, 0],
							}}
							transition={{
								duration: 36,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item11)}
						/>
						<motion.div
							animate={{
								x: [0, 100, 0],
								y: [0, -100, 0],
							}}
							transition={{
								duration: 34,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item12)}
						/>
						<motion.div
							animate={{
								x: [0, -200, 0],
								y: [0, -50, 0],
							}}
							transition={{
								duration: 34,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item13)}
						/>
						<motion.div
							animate={{
								x: [0, 200, 0],
								y: [0, -200, 0],
							}}
							transition={{
								duration: 34,
								ease: 'linear',
								times: [0, 0.5, 1],
								repeat: Infinity,
								repeatType: 'loop',
							}}
							className={classNames(classes.item, classes.item14)}
						/>
					</div>
				</div>
				<div id='bootstrap' className='row h-fluid-min-lg-100 scroll-margin'>
					<div className='col-12'>
						<Card stretch>
							<CardBody className='h-100'>
								<div className='row d-flex align-items-center h-100'>
									<div className={classNames('col-xl-6', classes.logoWrapper)}>
										<div className={classes.bootstrapLogo} />
									</div>
									<div className='col-xl-6'>
										<div className='display-1 fw-bold mb-4 position-relative'>
											Bootstrap <span className='text-primary'>5</span>
											<span className='display-6 position-absolute top-0 translate-middle-y'>
												<Badge color='success' shadow='default'>
													NEW
												</Badge>
											</span>
										</div>
										<p className='fs-4 mb-5'>
											It is compatible with the design with{' '}
											<strong>Reactstrap</strong> logic and new components
											have been created with <em>Bootstrap 5</em> and you can
											make changes in them. The usage of all components in the{' '}
											<strong>storybook</strong> are available.
										</p>
										<div className='row g-4'>
											<div className='col-auto'>
												<Button
													color='primary'
													icon='CustomReact'
													isLight
													size='lg'
													tag='a'
													href='../components/card'>
													Components
												</Button>
											</div>
											<div className='col-auto'>
												<Button
													color='storybook'
													icon='CustomStorybook'
													isLight
													size='lg'
													tag='a'
													target='_blank'
													href={`${process.env.NEXT_PUBLIC_STORYBOOK_URL}`}>
													Storybook
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<div id='storybook' className='row h-fluid-min-lg-100 scroll-margin'>
					<div className='col-12'>
						<Card stretch>
							<CardBody className='h-100'>
								<div className='row d-flex align-items-center h-100'>
									<div className={classNames('col-xl-6', classes.logoWrapper)}>
										<div className={classes.storybookLogo} />
									</div>
									<div className='col-xl-6'>
										<div className='display-1 fw-bold mb-4'>Storybook</div>
										<p className='fs-4 mb-5'>
											You can share how the components are used and your
											customized stories with your teammates. You can also
											copy the jsx and html outputs and paste them directly
											into your project.
										</p>
										<Button
											color='storybook'
											icon='CustomStorybook'
											isLight
											size='lg'
											tag='a'
											target='_blank'
											href={`${process.env.NEXT_PUBLIC_STORYBOOK_URL}`}>
											Storybook
										</Button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<div id='formik' className='row h-fluid-min-lg-100 scroll-margin'>
					<div className='col-12'>
						<Card stretch>
							<CardBody className='h-100'>
								<div className='row d-flex align-items-center h-100'>
									<div className={classNames('col-xl-6', classes.logoWrapper)}>
										<div className={classes.formikLogo} />
									</div>
									<div className='col-xl-6'>
										<div className='display-1 fw-bold mb-4'>Formik</div>
										<p className='fs-2 mb-3'>
											Build forms in React, without the tears 🥳
										</p>
										<p className='fs-4 mb-5'>
											Yes! You will have a lot of fun while dealing with
											forms, you will get the results you want without
											contradicting the design of the project. In fact, we
											have another good news, validation is also included.
										</p>
										<div className='row g-4'>
											<div className='col-auto'>
												<Button
													color='primary'
													icon='CustomReact'
													isLight
													size='lg'
													tag='a'
													href='../forms/form-group'>
													Form Components
												</Button>
											</div>
											<div className='col-auto'>
												<Button
													color='danger'
													icon='VerifiedUser'
													isLight
													size='lg'
													tag='a'
													href='../forms/validation'>
													Validation
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<div id='apex' className='row h-fluid-min-lg-100 scroll-margin'>
					<div className='col-12'>
						<Card stretch>
							<CardBody className='h-100'>
								<div className='row d-flex align-items-center h-100'>
									<div className={classNames('col-xl-6', classes.logoWrapper)}>
										<div className={classes.apexLogo} />
									</div>
									<div className='col-xl-6'>
										<div className='display-1 fw-bold mb-4'>Apex Chart</div>
										<p className='fs-4 mb-5'>
											You can easily include 16 different types of graphics in
											your project and have harmonious designs.
										</p>
										<Button
											color='primary'
											icon='ShowChart'
											isLight
											size='lg'
											tag='a'
											href='../charts/general-usage'>
											Charts
										</Button>
									</div>
								</div>
							</CardBody>
						</Card>
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
