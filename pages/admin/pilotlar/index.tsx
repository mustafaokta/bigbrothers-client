import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import classNames from 'classnames';
import useTourStep from '../../../hooks/useTourStep';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import { deletePilot, postPilotList } from '../../../helpers/connections/paragliding';
import { useUserContext } from '../../../context/UserContext';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import { TColor } from '../../../type/color-type';
import AdminPilotsAdd from '../../../common/partial/AdminPilotsAdd';
import AdminPilotsEdit from '../../../common/partial/AdminPilotsEdit';
import { useForm } from 'react-hook-form';
import useDarkMode from '../../../hooks/useDarkMode';
import showNotification from '../../../components/extras/showNotification';
import { fetchUserPhoto } from '../../../helpers/connections/user';



const Index: NextPage = () => {
	//useTourStep(18);
	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const [filterMenu, setFilterMenu] = useState(false);
	const [pilotList, setPilotList] = useState<any>([]);
	const { user } = useUserContext();
	const [newModalStatus, setNewModalStatus] = useState<boolean>(false);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const { themeStatus, darkModeStatus } = useDarkMode();

	const handleNewItem = () => {
		setNewModalStatus(true)
			reset({
			foto: '',
			name: '',
			surname: '',
			identityNumber: '',
			emailAddress: '',
			password: '',
			gender: '',
			dateOfBirth: '',
			licenseType: '',
			issuingAuthority: '',
			licenseNumber: '',
			licenseExpirationDate: '',
			emergencyContactFullName: '',
			emergencyContactPhone: '',
			emergencyContactRelationship: ''
		});
	};
	const handleEditItem = (itm:any) => {
			reset({
			foto: itm.user.avatar|| UserImage,
			name: itm.user.name,
			surname: itm.user.surname,
			identityNumber: itm.user.identityNumber,
			emailAddress: itm.user.email,
			password:itm.password,
			gender: itm.user.gender,
			phoneNumber: itm.user.phoneNumber,
			dateOfBirth: itm.user.dateOfBirth?.split('T')[0],
			licenseType:  itm.licensingAndCertification.licenseType,
			issuingAuthority: itm.licensingAndCertification.issuingAuthority,
			licenseNumber: itm.licensingAndCertification.licenseNumber,
			licenseExpirationDate: itm.licensingAndCertification.licenseExpirationDate?.split('T')[0],
			emergencyContactFullName: itm.contactInformation.emergencyContactFullName,
			emergencyContactPhone: itm.contactInformation.emergencyContactPhone,
			emergencyContactRelationship: itm.contactInformation.emergencyContactRelationship,
			contactInformationId: itm.contactInformationId,
			pilotId: itm.id,
			licensingAndCertificationId: itm.licensingAndCertificationId,
			userId: itm.userId
		});
		setEditModalStatus(true)
	};

	const deleteItem = (data:any) => {
		//console.log('id', id);
		deletePilot({ data: {contactInformationId:data.contactInformationId,pilotId:data.id,licensingAndCertificationId:data.licensingAndCertificationId,userId:data.userId}}, user.token!)
			.then((res : any) => {
				setPilotList((prev: any[])=> prev.filter((item:any)=> item.id !== data.id) );

			/* 	postPilotList({ data : '' }, user.token!).then((res:any) => {
					console.log('listTourReservation', res);
					setPilotList(res.content);
				});	 */			showNotification(
					'İşlem Başarılı',
					'Pilot başarıyla silindi.',
					'success' // 'default' || 'info' || 'warning' || 'success' || 'danger',
				);
		})
		.catch((err:any) => {
			console.log(`Bir hata meydana geldi. Err:`);
		});

	}

	useEffect(() => {
		console.log('tekrar çalıştı');

		postPilotList({ data : '' }, user.token!).then(async(res:any) => {
			for (const user of res.content) {
				try {
				  const response: any = await fetchUserPhoto({ userId: user.userId });
				  if (response.status !== 404) {
					user.user.avatar = URL.createObjectURL(response);
				  }
				} catch (err) {
				  console.log(`An error occurred: ${err}`);
				}
			  }
			setPilotList(res.content);
		});
	}, [newModalStatus, editModalStatus])

	return (
		<PageWrapper>
			<Head>
				<title>Pilot Listesi</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
			{/* 		<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/> */}
				</SubHeaderLeft>
				<SubHeaderRight>
					<Dropdown isOpen={filterMenu} setIsOpen={setFilterMenu}>
						<DropdownToggle hasIcon={false}>
							<Button icon='FilterAlt' color='primary' isLight />
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg' isCloseAfterLeave={false}>
							<div className='container py-2'>

							</div>
						</DropdownMenu>
					</Dropdown>
					<Button
						icon='PersonAdd'
						color='info'
						 type='button'
						onClick={handleNewItem}
						isLight
						tag='a'>
						Yeni Pilot Ekle
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row row-cols-xxl-3 row-cols-lg-3 row-cols-md-2'>
					{pilotList.map((pilot: any) => (
						<div key={pilot.user.name} className='col'>
							<Card>
								<CardBody>
									<div className='row g-3'>
										<div className='col d-flex'>
											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div
														className='ratio ratio-1x1'
														style={{ width: 100 }}>
														<div
															className={classNames(
																//`bg-l25-${user.color}`,
																`bg-l25-yellow`,
																'rounded-2',
																'd-flex align-items-center justify-content-center',
																'overflow-hidden',
																'shadow',
															)}>
															{/* eslint-disable-next-line @next/next/no-img-element */}
														{ 	<img
																src={pilot.user.avatar|| UserImage}
																alt={pilot.user.name}
																width={100}
															/> }
														</div>
													</div>
													{true && (
														<span className='position-absolute top-100 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
															<span className='visually-hidden'>
																Online user
															</span>
														</span>
													)}
												</div>
											</div>
											<div className='flex-grow-1 ms-3 d-flex justify-content-between'>
												<div className='w-100'>
													<div className='row'>
														<div className='col'>
															<div className='d-flex align-items-center'>
																<div className='fw-bold fs-5 me-2'>
																	{`${pilot.user.name} ${pilot.user.surname}`}
																</div>
																<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
																	Pilot
																</small>
															</div>

															<div className='text-muted'>
																TCKN : {pilot.user.identityNumber}
															</div>
														</div>
														<div className='col-auto'>
														<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames({
												'border-light': !darkModeStatus,
											})}
											icon='Edit'
											onClick={()=>handleEditItem(pilot)}

											aria-label='Detailed information'
										/>
											<Button
											isOutline={!darkModeStatus}
											color='brand-two'
											isLight={darkModeStatus}
											className={classNames({
												'border-light': !darkModeStatus,
											})}
											icon='Delete'
											onClick={()=>deleteItem(pilot)}

											aria-label='Detailed information'
										/>
														</div>
													</div>
												{	(
														<div className='row g-2 mt-3'>
																<div
																	className='col-auto'>
																	<Badge
																		isLight
																		color={'success' as TColor}
																		className='px-3 py-2'>
																		<Icon
																			icon={'AddIcCall'}
																			size='lg'
																			className='me-1'
																		/>
																		{pilot.user.phoneNumber}
																	</Badge>
																</div>
																<div
																	className='col-auto'>
																	<Badge
																		isLight
																		color={'danger' as TColor}
																		className='px-3 py-2'>
																		<Icon
																			icon={'Paragliding'}
																			size='lg'
																			className='me-1'
																		/>

																	</Badge>
																</div>
																{/* <div
																	className='col-auto'>
																	<Badge
																		isLight
																		color={'primary' as TColor}
																		className='px-3 py-2'>
																		<Icon
																			icon={'Feed'}
																			size='lg'
																			className='me-1'
																		/>
																		{pilot.licensingAndCertification.licenseNumber}
																	</Badge>
																</div> */}

														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
			</Page>
			<AdminPilotsAdd setIsOpen={setNewModalStatus} isOpen={newModalStatus} id='0'  />
			<AdminPilotsEdit setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' reset={reset}  control={control} getValues={getValues} handleSubmit={handleSubmit}  />
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