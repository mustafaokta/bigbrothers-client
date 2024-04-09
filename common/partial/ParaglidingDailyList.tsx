import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import {
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import data from '../data/dummyEventsData';
import Avatar from '../../components/Avatar';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/bootstrap/Modal';
import { parachuteEntryDelete, useDataPilotName} from '../../helpers/connections/paragliding';
import { Controller, useForm } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import Select from '../../components/bootstrap/forms/Select';
import { useDataUserList } from '../../helpers/connections/user';
import {  useDataPaymentMethods,useDataHotelList } from '../../helpers/connections/tour';
import { postAddParachuteEntry,listParachuteEntry,parachuteEntryUpdate } from '../../helpers/connections/paragliding';
import UserImage from '../../assets/img/wanna/wanna1.png';
import showNotification from '../../components/extras/showNotification';
import Spinner from '../../components/bootstrap/Spinner';

interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const ParaglidingDailyList: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const { user } = useUserContext();

	const [listEntry, setlistEntry] = useState<any>({content:[]});

	const { data:hotelData, isLoading:hotelIsLoading, isError:hotelIsError } = useDataHotelList();
	const { data:pilotListData, isLoading: pilotlistIsLoading, isError: pilotlistIsError } = useDataPilotName();
	const { data:userListData, isLoading:userListIsLoading, isError:userListIsError } = useDataUserList();
	const { data:paymentMethodsData, isLoading:paymentMethodsIsLoading, isError:paymentMethodIsError } = useDataPaymentMethods();


	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);


	useEffect(() => {

		listParachuteEntry({ data : {} }, user.token!).then((res:any) => {
						 setlistEntry(res);
			}
			);
		}, [newItemOffcanvas,upcomingEventsEditOffcanvas]);



	const handleUpcomingEdit = (itm:any) => {
		setUpcomingEventsEditOffcanvas(true);
			   let itemm : { [key: string]: any }=	{
						   id: itm.id,
							 tourId: itm.tourId,
							  tourDate: itm.tourDate.split('T')[0],
							  tourTime: itm.tourTime,
							  extraLocation: itm.extraLocation,
							  hotelId: itm.hotel?.id,
							  roomNumber: itm.roomNumber,
							  timeToPickUp: itm.timeToPickUp,
							  salesmanId: itm.salesmanId,
							  price: itm.price,
							  paid: itm.paid,
							  currency: itm.currency,
							  paymentMethodId: itm.paymentMethodId,
							  ticketNumber: itm.ticketNumber,
							  adult: itm.adult,
							  child: itm.child,
							  baby: itm.baby,
							  transferNumber: itm.transferNumber,
							  note: itm.note,
							  needsTransfer: itm.needsTransfer,
							  pilotId: itm.sortie.pilotId,
							  customerName: itm.customers[0].customerName,
							  customerSurname: itm.customers[0].customerSurname,
							  customerIdentityNumber: itm.customers[0].customerIdentityNumber,
							  customerPhoneNumber: itm.customers[0].customerPhoneNumber,
							  customerDateOfBirth: itm.customers[0].customerDateOfBirth.split('T')[0],
							  customerId: itm.customers[0].id,
							  sortieId: itm.sortie.id

					   }
	   reset(itemm);

   };


	const handleNewItem = () => {
		setNewItemOffcanvas(!newItemOffcanvas);
		reset({
			id: 0,
		 	tourId: 1,
			tourDate: dayjs().format('YYYY-MM-DD'),
			tourTime: '',
			extraLocation: '',
			roomNumber: '',
			timeToPickUp: '',
			salesmanId: '',
			price: '',
			paid: '',
			paymentMethodId: '',
			ticketNumber: '',
			transferNumber: '',
			note: '',
			pilotId: '',
			hotelId: '',
			customerName: '',
			customerSurname: '',
			customerIdentityNumber: '',
			customerPhoneNumber: '',
			customerDateOfBirth: '',
			adult: '',
			child: '',
			baby: '',
			currency: '',
		});

	};

	const tourData = [
		{ value: 1, label: 'Bigbrothers Yamaç Paraşütü' },
	];

	//console.log('pilotListData', pilotListData);

	const handleUpdateAction = (post_data: any) => {
		let postData = post_data;
		console.log("postData",postData);
	 parachuteEntryUpdate({ data: postData }, user.token!)
			.then((res) => {
			// 	toast.success(`Tur kaydı güncelleştirildi`);
				setUpcomingEventsEditOffcanvas(false);
				showNotification(
					'İşlem Başarılı',
					'Giriş başarıyla güncellendi', // String, HTML or Component
					'success' // 'default' || 'info' || 'warning' || 'success' || 'danger',
				);
			})
			.catch((err) => {
				console.log("error");
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleSaveAction = (data: any) => {
		postAddParachuteEntry({ data : data }, user.token!)
				.then((res) => {
					setNewItemOffcanvas(false)
					showNotification(
						'Başarılı',
						'Giriş başarıyla eklendi', // String, HTML or Component
						'success' // 'default' || 'info' || 'warning' || 'success' || 'danger',
					);
				})
				.catch((err) => {
					console.log("error");
				});
		};
		const handleDeleteAction = (postData: any) => {
			parachuteEntryDelete({ data : {id: postData.id } }, user.token!).then((res:any) => {
				setlistEntry(res);
	}
	)
			.catch((err:any) => {
				console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
		}

		const sortiTimes = [
			{ value: '08:30', label: '08:30' },
			{ value: '11:00', label: '11:00' },
			{ value: '13:00', label: '13:00' },
			{ value: '15:00', label: '15:00' },
			{ value: '17:00', label: '17:00' },
		];

		const currency = [
			{ value: 'TRY', label: 'TL' },
			{ value: 'USD', label: 'Dolar' },
			{ value: 'EUR', label: 'Euro' },
			{ value: 'GBP', label: 'Sterlin' },

			]

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { requestSort, getClassNamesFor } = useSortableData(data);


	if (pilotlistIsLoading||userListIsLoading||paymentMethodsIsLoading||hotelIsLoading) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if (pilotlistIsError||userListIsError||paymentMethodIsError||hotelIsError) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	let items= listEntry.content;
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Paragliding' iconColor='info'>
						<CardTitle>Günlük Girişler - Yamaç Parşütü</CardTitle>
					</CardLabel>
					<div className='d-flex gap-2'>
					<CardActions>
						<Button
							icon='PersonAdd'
							color='primary'
							isLight
							onClick={handleNewItem}
							>
							Yeni Kayıt
						</Button>
					</CardActions>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							tag='a'
							to='/somefile.txt'
							target='_blank'
							download>
							Export
						</Button>
					</CardActions>
					</div>

				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<td style={{ width: 60 }} />
								<th
									onClick={() => requestSort('date')}
									className='cursor-pointer text-decoration-underline'>
									Tur Tarih / Sorti{' '}
									<Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/>
								</th>
								<th>Müşteri</th>
								<th>Pilot</th>
								<th>Satışı Yapan</th>
								<th>Otel Adı</th>
								<th>Oda</th>
								<th>Ödeme Türü</th>
								<th>Ücret</th>
								<th>Kalan</th>
								<th>Bilet No</th>
								<td />
							</tr>
						</thead>
						<tbody>
							{dataPagination(items, currentPage, perPage).map((item) => (
								<tr key={item.id}>
									<td>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames({
												'border-light': !darkModeStatus,
											})}
											icon='Delete'
											onClick={()=>handleDeleteAction(item)}
											aria-label='Sil'
										/>
									</td>
									<td>
										<div className='d-flex align-items-center'>
											{/* <span
												className={classNames(
													'badge',
													'border border-2',
													[`border-${themeStatus}`],
													'rounded-circle',
													'bg-success',
													'p-2 me-2',
													`bg-${item.status.color}`,
												)}>
												<span className='visually-hidden'>
													{item.status.name}
												</span>
											</span> */}
											<span className='text-nowrap'>
												{dayjs(`${item.tourDate}`).format(
													'MMM Do YYYY',
												)}-{item.tourTime}
											</span>
										</div>
									</td>
									<td>
										<div>
										<div>{item.customers[0]?.customerName} {item.customers[0]?.customerSurname}</div>
											<div className='small text-muted'>
												{item.customers[0]?.customerPhoneNumber}
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex'>
											<div className='flex-shrink-0'>
												<Avatar
													src={UserImage}
													color="primary"
													size={36}
												/>
											</div>
											<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
											{
									pilotListData.content.map((el:any) => {
										if (el.id === item.sortie.pilotId) {
										return `${el.user.name} ${el.user.surname}`;
										} else {
										return '';
										}
									})
									}
									</div>
										</div>
									</td>
									<td>{item.salesman.name}</td>
									<td>{hotelData.content.filter((el:any)=>el.id==item.hotelId)[0]?.name}</td>
									<td>{item.roomNumber}</td>
									<td>{item.paymentMethod.name} - {item.currency}</td>
									<td>{item.price}</td>
									<td>{(item.price - item.paid)}</td>
									<td>{item.ticketNumber}</td>
									<td>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											icon='Edit'
											onClick={()=>handleUpcomingEdit(item)}>
											Edit
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
				<PaginationButtons
					data={items}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>

		{/* edit  Modal */}
				<Modal
					setIsOpen={setUpcomingEventsEditOffcanvas}
					isOpen={upcomingEventsEditOffcanvas}
					titleId='upcomingEdit'
					isCentered
					isScrollable
					size='lg'>
					<ModalHeader setIsOpen={setUpcomingEventsEditOffcanvas}>
						<OffCanvasTitle id='newRecordIncomingTitle'>Girişi Güncelle</OffCanvasTitle>
					</ModalHeader>
					<form onSubmit={handleSubmit((data) => handleUpdateAction(data))}>
					<ModalBody>
					<div className='row g-4'>
							<div className='col-6'>
						    <FormGroup id='tourId' label='Tur Adı' isFloating>
						        <Controller name="tourId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={tourData.map((el: any) => ({
																			value: el.value.toString(),
																			text: el.label,
																			label: el.label,
																		}))}
																		disabled={true}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.tourId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6'>
							<FormGroup id='tourDate' label='Tur Tarih' isFloating>
						        <Controller name="tourDate"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Tur Adı'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.tourDate && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-6'>
								<FormGroup id='tourTime' label='Sorti Saati' isFloating>
								<Controller name="tourTime"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={sortiTimes.map((el: any) => ({
																			value: el.value,
																			text: el.label,
																			label: el.label,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
								</FormGroup>
								{errors.tourTime && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-6'>
						    <FormGroup id='pilotId' label='Pilot' isFloating>
						        <Controller name="pilotId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={pilotListData.content.map((el: any) => ({
																			value: el.id.toString(),
																			text: el.user.name+' '+el.user.surname,
																			label: el.user.name+' '+el.user.surname,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.pilotId && <span>Bu alan gerekli</span>}
							</div>


							<div className='col-6'>
						    <FormGroup id='salesmanId' label='Satıcı' isFloating>
						        <Controller name="salesmanId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={userListData.content.map((el: any) => ({
																			value: el.id,
																			text: el.name,
																			label: el.name,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.salesmanId && <span>Bu alan gerekli</span>}
							</div>

							<div className='col-3'>
							<FormGroup id='price' label='Ücret' isFloating>
						        <Controller name="price"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												type='number'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.price && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-3'>
							<FormGroup id='paid' label='Ödenen' isFloating>
						        <Controller name="paid"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												type='number'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.paid && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
						    <FormGroup id='paymentMethodId' label='Ödeme Yöntemi' isFloating>
						        <Controller name="paymentMethodId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={paymentMethodsData.content.map((el: any) => ({
																			value: el.id,
																			text: el.name,
																			label: el.name,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.paymentMethodId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
							<FormGroup id='currency' label='Birim' isFloating>
							<Controller name="currency"
										rules={{ required: true }}
										 control={ control}
										render={({ field }) => (
											<Select
											size='sm'
											placeholder='Seçiniz'
											ariaLabel='Seçiniz'
											list={currency.map((el: any) => ({
												value: el.value,
												text: el.label,
												label: el.label,
											}))}
											className={classNames('rounded-1', {
												'bg-white': !darkModeStatus,
											})}
										{...field}
										/>
										 )}
								/>


							</FormGroup>
							{errors.currency && <span>Bu alan gerekli</span>}

						</div>
							<div className='col-3'>
							<FormGroup id='ticketNumber' label='Bilet Numarası' isFloating>
						        <Controller name="ticketNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Tur Adı'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-3'>
							<FormGroup id='roomNumber' label='Oda/Kapı Numarası' isFloating>
						        <Controller name="roomNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Oda/Kapı Numarası'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-6'>
						<FormGroup id='hotelId' label='Otel' isFloating>
							<Controller name="hotelId"
											control={control}
											rules={{ required: false }}
											render={({ field }) => (
																	<Select
																	size='sm'
																	placeholder='Seçiniz'
																	ariaLabel='Seçiniz'
																	list={hotelData.content.map((el: any) => ({
																		value: el.id,
																		text: el.name,
																		label: el.name,
																	}))}
																	className={classNames('rounded-1', {
																	'bg-white': !darkModeStatus,
																	})}
																	{...field}
																		/>
													 )}
							/>
						</FormGroup>
						</div>
							<div className='col-6'>
							<FormGroup id='extraLocation' label='Extra Konum' isFloating>
						        <Controller name="extraLocation"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Extra Konum'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-4'>
							<FormGroup id='customerName' label='Müşteri Adı' isFloating>
						        <Controller name="customerName"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri Adı'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerName && <span>Bu alan gerekli</span>}
							</div><div className='col-4'>
							<FormGroup id='customerSurname' label='Müşteri Soyadı' isFloating>
						        <Controller name="customerSurname"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri Adı'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerSurname && <span>Bu alan gerekli</span>}
							</div>
								<div className='col-4'>
							<FormGroup id='customerIdentityNumber' label='Müşteri TC/PP' isFloating>
						        <Controller name="customerIdentityNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri TC/PP'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-6'>
							<FormGroup id='customerPhoneNumber' label='Müşteri Telefon' isFloating>
						        <Controller name="customerPhoneNumber"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
													type='tel'
													mask='+90 (999) 999-9999'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerPhoneNumber && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6'>
							<FormGroup id='customerDateOfBirth' label='Müşteri Doğum Tarihi' isFloating>
						        <Controller name="customerDateOfBirth"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
													type='date'
												placeholder='Müşteri Doğum Tarihi'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerDateOfBirth && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
							<FormGroup id='note' label='Not1' isFloating>
						        <Controller name="note"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Yazınız'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>

						</div>
					</ModalBody>
					<ModalFooter className='bg-transparent'>
						<Button
							color='info'
							className='w-100'
							type='submit'
							>
							Kaydet
						</Button>
					</ModalFooter>
					</form>
			</Modal>
			{/* New Record Modal */}
			<Modal
					setIsOpen={setNewItemOffcanvas}
					isOpen={newItemOffcanvas}
					titleId='newRecordIncomingModal'
					isCentered
					isScrollable
					size='lg'>
					<ModalHeader setIsOpen={setNewItemOffcanvas}>
						<OffCanvasTitle id='newRecordIncomingTitle'>Yeni Kayıt</OffCanvasTitle>
					</ModalHeader>
					<form onSubmit={handleSubmit((data) => handleSaveAction(data))}>
					<ModalBody>
						<div className='row g-4'>
							<div className='col-6'>
						    <FormGroup id='tourId' label='Tur Adı' isFloating>
						        <Controller name="tourId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={tourData.map((el: any) => ({
																			value: el.value.toString(),
																			text: el.label,
																			label: el.label,
																		}))}
																		disabled={true}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.tourId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6'>
							<FormGroup id='tourDate' label='Tur Tarih' isFloating>
						        <Controller name="tourDate"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Tur Adı'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.tourDate && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-6'>
								<FormGroup id='tourTime' label='Sorti Saati' isFloating>
								<Controller name="tourTime"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={sortiTimes.map((el: any) => ({
																			value: el.value,
																			text: el.label,
																			label: el.label,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
								</FormGroup>
								{errors.tourTime && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-6'>
						    <FormGroup id='pilotId' label='Pilot' isFloating>
						        <Controller name="pilotId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={pilotListData.content.map((el: any) => ({
																			value: el.id.toString(),
																			text: el.user.name+' '+el.user.surname,
																			label: el.user.name+' '+el.user.surname,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.pilotId && <span>Bu alan gerekli</span>}
							</div>


							<div className='col-6'>
						    <FormGroup id='salesmanId' label='Satıcı' isFloating>
						        <Controller name="salesmanId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={userListData.content.map((el: any) => ({
																			value: el.id,
																			text: el.name,
																			label: el.name,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.salesmanId && <span>Bu alan gerekli</span>}
							</div>

							<div className='col-3'>
							<FormGroup id='price' label='Ücret' isFloating>
						        <Controller name="price"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												type='number'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.price && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-3'>
							<FormGroup id='paid' label='Ödenen' isFloating>
						        <Controller name="paid"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												type='number'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.paid && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
						    <FormGroup id='paymentMethodId' label='Ödeme Yöntemi' isFloating>
						        <Controller name="paymentMethodId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={paymentMethodsData.content.map((el: any) => ({
																			value: el.id,
																			text: el.name,
																			label: el.name,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.paymentMethodId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
							<FormGroup id='currency' label='Birim' isFloating>
							<Controller name="currency"
										rules={{ required: true }}
										 control={ control}
										render={({ field }) => (
											<Select
											size='sm'
											placeholder='Seçiniz'
											ariaLabel='Seçiniz'
											list={currency.map((el: any) => ({
												value: el.value,
												text: el.label,
												label: el.label,
											}))}
											className={classNames('rounded-1', {
												'bg-white': !darkModeStatus,
											})}
										{...field}
										/>
										 )}
								/>


							</FormGroup>
							{errors.currency && <span>Bu alan gerekli</span>}

						</div>
							<div className='col-3'>
							<FormGroup id='ticketNumber' label='Bilet Numarası' isFloating>
						        <Controller name="ticketNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Tur Adı'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-3'>
							<FormGroup id='roomNumber' label='Oda/Kapı Numarası' isFloating>
						        <Controller name="roomNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Oda/Kapı Numarası'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-6'>
						<FormGroup id='hotelId' label='Otel' isFloating>
							<Controller name="hotelId"
											control={control}
											rules={{ required: false }}
											render={({ field }) => (
																	<Select
																	size='sm'
																	placeholder='Seçiniz'
																	ariaLabel='Seçiniz'
																	list={hotelData.content.map((el: any) => ({
																		value: el.id,
																		text: el.name,
																		label: el.name,
																	}))}
																	className={classNames('rounded-1', {
																	'bg-white': !darkModeStatus,
																	})}
																	{...field}
																		/>
													 )}
							/>
						</FormGroup>
						</div>
							<div className='col-6'>
							<FormGroup id='extraLocation' label='Extra Konum' isFloating>
						        <Controller name="extraLocation"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Extra Konum'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-4'>
							<FormGroup id='customerName' label='Müşteri Adı' isFloating>
						        <Controller name="customerName"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri Adı'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerName && <span>Bu alan gerekli</span>}
							</div><div className='col-4'>
							<FormGroup id='customerSurname' label='Müşteri Soyadı' isFloating>
						        <Controller name="customerSurname"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri Adı'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerSurname && <span>Bu alan gerekli</span>}
							</div>
								<div className='col-4'>
							<FormGroup id='customerIdentityNumber' label='Müşteri TC/PP' isFloating>
						        <Controller name="customerIdentityNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri TC/PP'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-6'>
							<FormGroup id='customerPhoneNumber' label='Müşteri Telefon' isFloating>
						        <Controller name="customerPhoneNumber"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
													type='tel'
													mask='+90 (999) 999-9999'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerPhoneNumber && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6'>
							<FormGroup id='customerDateOfBirth' label='Müşteri Doğum Tarihi' isFloating>
						        <Controller name="customerDateOfBirth"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
													type='date'
												placeholder='Müşteri Doğum Tarihi'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.customerDateOfBirth && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
							<FormGroup id='note' label='Not1' isFloating>
						        <Controller name="note"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Yazınız'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>

						</div>
					</ModalBody>
					<ModalFooter className='bg-transparent'>
						<Button
							color='info'
							className='w-100'
							type='submit'
							>
							Kaydet
						</Button>
					</ModalFooter>
					</form>
			</Modal>
		</>
	);
};



export default ParaglidingDailyList;
