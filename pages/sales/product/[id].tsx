import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ApexOptions } from 'apexcharts';
import { useFormik } from 'formik';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useDarkMode from '../../../hooks/useDarkMode';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Avatar from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { priceFormat } from '../../../helpers/helpers';
import Chart from '../../../components/extras/Chart';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import tableData from '../../../common/data/dummyProductData';

interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string;
}
const validate = (values: IValues) => {
	const errors = {
		name: '',
		price: '',
		stock: '',
		category: '',
	};

	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length < 3) {
		errors.name = 'Must be 3 characters or more';
	} else if (values.name.length > 20) {
		errors.name = 'Must be 20 characters or less';
	}

	if (!values.price) {
		errors.price = 'Required';
	} else if (values.price < 0) {
		errors.price = 'Price should not be 0';
	}

	if (!values.stock) {
		errors.stock = 'Required';
	}

	if (!values.category) {
		errors.category = 'Required';
	} else if (values.category.length < 3) {
		errors.category = 'Must be 3 characters or more';
	} else if (values.category.length > 20) {
		errors.category = 'Must be 20 characters or less';
	}

	return errors;
};

type TTabs = 'Summary' | 'Comments' | 'Edit';
interface ITabs {
	[key: string]: TTabs;
}

const Id: NextPage = () => {
	const router = useRouter();

	const { darkModeStatus } = useDarkMode();

	const { id } = router.query;

	const itemData = tableData.filter(
		(item) =>
			typeof item.id !== 'undefined' &&
			typeof id !== 'undefined' &&
			item.id.toString() === id.toString(),
	);
	const data = itemData[0];

	const chartOptions: ApexOptions = {
		colors: [String(process.env.NEXT_PUBLIC_WARNING_COLOR)],
		chart: {
			type: 'line',
			width: '100%',
			height: 105,
			sparkline: {
				enabled: true,
			},
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false,
			},
			x: {
				show: false,
			},
			y: {
				title: {
					formatter() {
						return '';
					},
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
	};

	const TABS: ITabs = {
		SUMMARY: 'Summary',
		COMMENTS: 'Comments',
		EDIT: 'Edit',
	};
	const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

	const [editItem, setEditItem] = useState<IValues>(data);
	const formik = useFormik({
		initialValues: {
			name: '',
			price: 0,
			stock: 0,
			category: '',
		},
		validate,
		onSubmit: () => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Product has been updated successfully',
			);
		},
	});
	useEffect(() => {
		if (editItem) {
			formik.setValues({
				name: editItem.name,
				price: editItem.price,
				stock: editItem.stock,
				category: editItem.category,
			});
		}
		return () => {
			formik.setValues({
				name: '',
				price: 0,
				stock: 0,
				category: '',
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editItem]);

	return (
		<PageWrapper>
			<Head>
				<title>{demoPagesMenu.sales.subMenu.product.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => router.back()}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<Avatar src={USERS.RYAN.src} size={32} color={USERS.RYAN.color} />
					<span>
						<strong>{`${USERS.RYAN.name} ${USERS.RYAN.surname}`}</strong>
					</span>
					<span className='text-muted'>Owner</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='display-4 fw-bold py-3'>{data?.name}</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={data?.image}
											alt=''
											width='100%'
											className='p-5'
										/>
									</div>
									<div className='col-12'>
										<Button
											icon='Summarize'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.SUMMARY}
											onClick={() => setActiveTab(TABS.SUMMARY)}>
											{TABS.SUMMARY}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Chat'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.COMMENTS}
											onClick={() => setActiveTab(TABS.COMMENTS)}>
											{TABS.COMMENTS}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Edit'
											color='success'
											className='w-100 p-3'
											isLight={activeTab !== TABS.EDIT}
											onClick={() => setActiveTab(TABS.EDIT)}>
											{TABS.EDIT}
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100'>
									<Button
										icon='Delete'
										color='danger'
										isLight
										className='w-100 p-3'>
										Delete
									</Button>
								</CardFooterLeft>
							</CardFooter>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card
							stretch
							className='overflow-hidden'
							tag='form'
							noValidate
							onSubmit={formik.handleSubmit}>
							{activeTab === TABS.SUMMARY && (
								<>
									<CardHeader>
										<CardLabel icon='Summarize' iconColor='info'>
											<CardTitle>Summary</CardTitle>
											<CardSubTitle>Product Information</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row'>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-primary rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Price</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='ConfirmationNumber'
																	size='4x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{priceFormat(data?.price)}
																</div>
																<div className='text-muted'>
																	<b>Quantity: </b> {data?.stock}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-warning bg-l${
														darkModeStatus ? 'o50' : '10'
													}-warning-hover transition-base rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle tag='h4' className='h5'>
																Sales
															</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody className='py-0'>
														<Chart
															className='mx-n4'
															series={data?.series}
															options={chartOptions}
															type={chartOptions.chart?.type}
															height={chartOptions.chart?.height}
															width={chartOptions.chart?.width}
														/>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-success rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Category</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Category'
																	size='4x'
																	color='success'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{data?.category}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-info rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Compatible</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Extension'
																	size='4x'
																	color='info'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{data?.file}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-12 shadow-3d-container'>
												<Accordion id='faq' shadow='sm'>
													<AccordionItem
														id='faq1'
														title='Can I change the colors?'>
														In at urna nec risus aliquam accumsan.
														Vivamus rutrum rhoncus massa, sed facilisis
														justo sodales vitae. Pellentesque mattis
														felis ac enim viverra faucibus. Curabitur
														maximus nibh massa, ut dictum quam
														scelerisque eget. Maecenas scelerisque
														egestas diam a posuere. Sed non vehicula
														nunc. Proin feugiat nisi ut mi mattis
														bibendum. Suspendisse lobortis libero ut
														libero semper, sed fermentum lectus commodo.
														Nam pretium mi sit amet purus imperdiet
														tempus. Aliquam congue ligula quis vulputate
														viverra. Morbi dapibus vitae odio vel
														luctus. Vivamus tellus tortor, aliquet id
														ultricies a, hendrerit non massa. Ut feugiat
														quam non sollicitudin molestie. Praesent ut
														ante mattis, efficitur est ac, scelerisque
														magna. Donec congue erat a suscipit
														condimentum. Curabitur purus nunc,
														ullamcorper vitae lectus quis, aliquam
														lacinia arcu.
													</AccordionItem>
													<AccordionItem
														id='faq2'
														title='Can I use these for presentations?'>
														Nunc ex odio, fermentum dignissim urna eu,
														suscipit vehicula magna. Vestibulum vel
														risus sed metus pellentesque gravida. Etiam
														hendrerit lorem vitae elit tempor bibendum.
														Vivamus tincidunt consectetur erat at
														venenatis. Nam elementum varius massa non
														congue. Class aptent taciti sociosqu ad
														litora torquent per conubia nostra, per
														inceptos himenaeos. Vivamus fermentum
														scelerisque ligula, quis bibendum felis
														luctus quis. Donec magna sem, ullamcorper id
														tempus ut, pharetra sed felis. Ut quis ante
														tristique, condimentum lacus eget, mollis
														magna. Phasellus fringilla diam ac erat
														consequat feugiat. Vestibulum eu ex eget
														ligula placerat finibus. Quisque vitae velit
														feugiat, mattis lectus nec, molestie justo.
														Vivamus nec tincidunt augue. Pellentesque
														nec mattis ipsum, non malesuada libero.
														Proin aliquam est turpis, sit amet efficitur
														ex gravida ac. Nunc in molestie augue.
													</AccordionItem>
													<AccordionItem
														id='faq3'
														title='an I use these for commercial projects?'>
														Cras rutrum turpis in nisl rhoncus volutpat.
														In vel augue commodo, aliquet dolor sit
														amet, pellentesque diam. Donec in dolor eu
														metus venenatis rutrum. Nam eu venenatis
														diam. Praesent vel tortor ornare, aliquet
														risus eget, elementum nisi. Morbi at
														faucibus neque, at luctus massa. Morbi
														convallis urna lacus, id suscipit nibh
														viverra at. Suspendisse molestie lorem nec
														nulla tempor pulvinar. Praesent interdum
														felis et lorem ullamcorper, sit amet mattis
														sapien imperdiet.
													</AccordionItem>
												</Accordion>
											</div>
										</div>
									</CardBody>
								</>
							)}
							{activeTab === TABS.COMMENTS && (
								<>
									<CardHeader>
										<CardLabel icon='Chat' iconColor='info'>
											<CardTitle>Comments</CardTitle>
											<CardSubTitle>Product Reviews</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row g-4'>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													<Avatar
														src={USERS.GRACE.src}
														color={USERS.GRACE.color}
														size={64}
													/>
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																We made a very logical decision to
																use it in our project. Design
																quality is very nice.
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{USERS.GRACE.name} in{' '}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													<Avatar
														src={USERS.SAM.src}
														color={USERS.SAM.color}
														size={64}
													/>
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																We have used another product of the
																same author before. It was very easy
																to integrate it into our project.
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{USERS.SAM.name} in{' '}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													<Avatar
														src={USERS.CHLOE.src}
														color={USERS.CHLOE.color}
														size={64}
													/>
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																Just the design I was looking
																for.🎉🎉
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{USERS.CHLOE.name} in{' '}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
										</div>
									</CardBody>
								</>
							)}
							{activeTab === TABS.EDIT && (
								<>
									<CardHeader>
										<CardLabel icon='Edit' iconColor='success'>
											<CardTitle>Edit</CardTitle>
											<CardSubTitle>Product Details</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<Card>
											<CardHeader>
												<CardLabel icon='Photo' iconColor='info'>
													<CardTitle>Product Image</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row'>
													<div className='col-lg-4'>
														{editItem?.image ? (
															// eslint-disable-next-line @next/next/no-img-element
															<img
																src={editItem.image}
																alt=''
																width={128}
																height={128}
																className='mx-auto d-block img-fluid mb-3'
															/>
														) : (
															<PlaceholderImage
																width={128}
																height={128}
																className='mx-auto d-block img-fluid mb-3 rounded'
															/>
														)}
													</div>
													<div className='col-lg-8'>
														<div className='row g-4'>
															<div className='col-12'>
																<Input
																	type='file'
																	autoComplete='photo'
																/>
															</div>
															<div className='col-12'>
																<Button
																	color='dark'
																	isLight
																	icon='Delete'
																	onClick={() => {
																		setEditItem({
																			...editItem,
																			image: undefined,
																		});
																	}}>
																	Delete Image
																</Button>
															</div>
														</div>
													</div>
												</div>
											</CardBody>
										</Card>

										<Card>
											<CardHeader>
												<CardLabel icon='Description' iconColor='success'>
													<CardTitle>Product Details</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row g-4'>
													<div className='col-12'>
														<FormGroup
															id='name'
															label='Name'
															isFloating>
															<Input
																placeholder='Name'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.name}
																isValid={formik.isValid}
																isTouched={formik.touched.name}
																invalidFeedback={formik.errors.name}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='price'
															label='Price'
															isFloating>
															<Input
																placeholder='Price'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.price}
																isValid={formik.isValid}
																isTouched={formik.touched.price}
																invalidFeedback={
																	formik.errors.price
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='stock'
															label='Stock'
															isFloating>
															<Input
																placeholder='Stock'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.stock}
																isValid={formik.isValid}
																isTouched={formik.touched.stock}
																invalidFeedback={
																	formik.errors.stock
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='category'
															label='Category'
															isFloating>
															<Input
																placeholder='Category'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.category}
																isValid={formik.isValid}
																isTouched={formik.touched.category}
																invalidFeedback={
																	formik.errors.category
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
												</div>
											</CardBody>
										</Card>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button
												color='info'
												icon='Save'
												type='submit'
												isDisable={!formik.isValid && !!formik.submitCount}>
												Save
											</Button>
										</CardFooterRight>
									</CardFooter>
								</>
							)}
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

export async function getStaticPaths() {
	return {
		paths: [
			// String variant:
			'/sales/product/1',
			// Object variant:
			{ params: { id: '2' } },
		],
		fallback: true,
	};
}

export default Id;
