import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import { useUserContext } from '../../../context/UserContext';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import { TColor } from '../../../type/color-type';
import AdminUserAdd from '../../../common/partial/AdminUserAdd';
import AdminUserEdit from '../../../common/partial/AdminUserEdit';
import { useForm } from 'react-hook-form';
import useDarkMode from '../../../hooks/useDarkMode';
import showNotification from '../../../components/extras/showNotification';
import { listUsers,deleteUsers } from '../../../helpers/connections/admin';
import { useDataUserRoleList } from '../../../helpers/connections/tour';
import { useRouter } from 'next/router';



const Index: NextPage = () => {
	//useTourStep(18);
	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const [filterMenu, setFilterMenu] = useState(false);
	const [userList, setUsersList] = useState<any>([]);
	const { user } = useUserContext();
	const [newModalStatus, setNewModalStatus] = useState<boolean>(false);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [roleIdToFilter, setRoleIdToFilter] = useState("");
	//const { data: userRoleData, isLoading: userRoleIsLoading, isError: userRoleIsError } = useDataUserRoleList();
	const router = useRouter();

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
			roleId: '',
		});
	};
	const handleEditItem = (itm:any) => {
			console.log('itm', itm);
			reset({
			id: itm.id,
			foto: '',
			name: itm.name,
			surname: itm.surname,
			identityNumber: itm.identityNumber,
			emailAddress: itm.email,
			password:itm.password,
			gender: itm.gender,
			phoneNumber: itm.phoneNumber,
			dateOfBirth: itm.dateOfBirth.split('T')[0],
			roleId: itm.roleId,
		});
		setEditModalStatus(true)
	};

	const deleteItem = (data:any) => {
		console.log('id', data);
		deleteUsers({ data: data.id}, user.token!)
			.then((res : any) => {
				console.log('deletePilot', res);
				listUsers({ data : '' }, user.token!).then((res:any) => {
					console.log('listTourReservation', res);
					setUsersList(res.content);
				});
				showNotification(
					'İşlem Başarılı',
					'Kullanıcı başarıyla silindi.',
					'success' // 'default' || 'info' || 'warning' || 'success' || 'danger',
				);
		})
		.catch((err:any) => {
			console.log(`Bir hata meydana geldi. Err:`);
		});

	}

	useEffect(() => {
		setRoleIdToFilter(router.query.roleId?.toString() || '');
	
		
		listUsers({ data : {roleId: router.query.roleId?.toString() || ''} }, user.token!).then((res:any) => {
			console.log('listUsers', res);
			setUsersList(res.content);
		});
	}, [newModalStatus, editModalStatus])

	//if (userRoleIsLoading ) return <div className="flex flex-col w-full">YÜKLENİYOR....</div>;
	//if (userRoleIsError ) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	// console.log('userListData', userListData);

	return (
		<PageWrapper>
			<Head>
				<title>Kullanıcı Listesi</title>
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
						Yeni Kullanıcı Ekle
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row row-cols-xxl-3 row-cols-lg-3 row-cols-md-2'>
					{userList.map((user: any) => (
						<div key={user.name} className='col'>
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
																src={UserImage}
																alt={user.name}
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
																	{`${user.name} ${user.surname}`}
																</div>
																<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
																	{user.role.name}
																</small>
															</div>

															<div className='text-muted'>
																TCKN : {user.identityNumber}
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
											onClick={()=>handleEditItem(user)}

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
											onClick={()=>deleteItem(user)}

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
																		{user.phoneNumber}
																	</Badge>
																</div>
																<div
																	className='col-auto'>
																	<Badge
																		isLight
																		color={'danger' as TColor}
																		className='px-3 py-2'>
																		<Icon
																			icon={'SupportAgent'}
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
																		{user.phoneNumber}
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
			<AdminUserAdd setIsOpen={setNewModalStatus} isOpen={newModalStatus} id='0'  />
			<AdminUserEdit setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' reset={reset}  control={control} getValues={getValues} handleSubmit={handleSubmit}  />
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