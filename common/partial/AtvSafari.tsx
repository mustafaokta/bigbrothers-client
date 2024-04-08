import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
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
import Checks from '../../components/bootstrap/forms/Checks';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Select from '../../components/bootstrap/forms/Select';
import { postAddAtv,deleteAtv, useDataAgency, useDataPaymentMethods, useDataTourList, useDataHotelList, listAtvReservation, updateAtvTour } from '../../helpers/connections/tour';
import { useUserContext } from '../../context/UserContext';
import { useDataUserList } from '../../helpers/connections/user';
import showNotification from '../../components/extras/showNotification';
import { listTransfer } from '../../helpers/connections/transfer';
import Spinner from '../../components/bootstrap/Spinner';


interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const TourList: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [incomingTourData, setIncomingTourData] = useState<any>({content:[]});
	const { register, handleSubmit, reset, formState: { errors }, getValues, control,setValue, watch } = useForm();
	const { user } = useUserContext();
	const [fragments, setFragments] = useState([{ id: 0 }]); // Initial fragment

	const { data:hotelData, isLoading:hotelIsLoading, isError:hotelIsError } = useDataHotelList();
	const { data:tourData, isLoading:tourIsLoading, isError:tourIsError } = useDataTourList();
	const { data:userListData, isLoading:userListIsLoading, isError:userListIsError } = useDataUserList();
	const { data:paymentMethodsData, isLoading:paymentMethodsIsLoading, isError:paymentMethodIsError } = useDataPaymentMethods();
	const { data: agencyData, isLoading: agencyIsLoading, isError: agencyIsError } = useDataAgency();
	const [incomingIsLoading, setIncomingIsLoading] = useState(true);


	const [editOffcanvas, setEditOffcanvas] = useState(false);



	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);
	const [tourDate, setTourDate] = useState<any>(null);
	const [transferData, setTransferData] = useState<any>(null);
	useEffect(() => {

		listAtvReservation({ data : {reservationType:'giden'} }, user.token!).then((res:any) => {
		 								setIncomingTourData(res);
		 								setIncomingIsLoading(false)
		}
		);
	}, [newItemOffcanvas, editOffcanvas])
	useEffect(() => {
	listTransfer({ data : {} }, user.token!).then((res:any) => {
	setTransferData(res);
	}
	);
	}, [tourDate]);

	const handleUpcomingEdit = (itm:any) => {


		setFragments(itm.customers.length>0?itm.customers:[{ id: 0 }]);

			   let itemm : { [key: string]: any }=	{
						        id: itm.id,
								type : 'kendi',
							tourId: itm.tourId,
							  tourDate: itm.tourDate.split('T')[0],
							  tourTime: itm.tourTime,
							  extraLocation: itm.extraLocation,
							  hotelId: itm.hotelId,
							  roomNumber: itm.roomNumber,
							  timeToPickUp: itm.timeToPickUp,
							  salesmanId: itm.salesmanId,
							  price: itm.price,
							  paid: itm.paid,
							  currency: itm.currency,
							  paymentMethodId: itm.paymentMethodId,
							  ticketNumber: itm.ticketNumber,
							  doubleCount: itm.doubleCount,
							  singleCount: itm.singleCount,
							  transferNumber: itm.transferNumber,
							  note: itm.note,
							  needsTransfer: itm.needsTransfer,

					   }
					   for (let i = 0; i < itm.customers.length; i++) {

						let id: number = itm.customers[i]['id'];

						itemm[`customerName${i+1}`] = itm.customers[i]['customerName'];
						itemm[`customerId${i+1}`] = id;
						itemm[`customerSurname${i+1}`] = itm.customers[i]['customerSurname'];
						itemm[`customerIdentityNumber${i+1}`] = itm.customers[i]['customerIdentityNumber'];
						itemm[`customerPhoneNumber${i+1}`]= itm.customers[i]['customerPhoneNumber'];
						itemm[`customerAddress${i+1}`] = itm.customers[i]['customerAddress'];
						itemm[`customerDateOfBirth${i+1}`] = itm.customers[i]['customerDateOfBirth'].split('T')[0];
						itemm[`customerEmail${i+1}`] = itm.customers[i]['customerEmail'];


						}
						   reset(itemm);
						   setEditOffcanvas(true);

   };

	const handleNewItem = () => {
		setNewItemOffcanvas(!newItemOffcanvas);
		 // set form to default empty values
		reset({
			id : '',
			type : 'kendi',
		 	tourId: '2',
			tourDate: '',
			tourTime: '',
			extraLocation: '',
			hotelId: '',
			roomNumber: '',
			timeToPickUp: '',
			salesmanId: '',
			price: '',
			paid: '',
			paymentMethodId: '',
			ticketNumber: '',
			doubleCount: '',
			singleCount: '',
			transferNumber: '',
			note: '',
			needsTransfer: false,
			currency: '',
		});
		setFragments([{ id: 0 }]);
	};
	const handleUpdateAction = (post_data: any) => {
		let postData = post_data;

	 updateAtvTour({ tour: postData }, user.token!)
			.then((res) => {
			// 	toast.success(`Tur kaydı güncelleştirildi`);


			setEditOffcanvas(false);

			})
			.catch((err) => {
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleSaveAction = (data: any) => {

	postAddAtv({ data : data }, user.token!)
			.then((res) => {
				showNotification(
					'success',
					'Kayıt Başarılı',
					'Yeni Atv rezervasyon kaydı oluşturuldu',
				);
				setNewItemOffcanvas(false);
			})
			.catch((err) => {
				console.log("error");
				// toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};


	const handleDeleteAction = (postData: any) => {
		deleteAtv({ data: postData}, user.token!)
	   .then((res) => {

		listAtvReservation({ data : {reservationType:'giden'} }, user.token!).then((res:any) => {
								setIncomingTourData(res);}
);

	})
		.catch((err:any) => {
			// console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		});
	}

	const currency = [
		{ value: 'TRY', label: 'TL' },
		{ value: 'USD', label: 'Dolar' },
		{ value: 'EUR', label: 'Euro' },
		{ value: 'GBP', label: 'Sterlin' },

		]



	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	// const { items, requestSort, getClassNamesFor } = useSortableData(data);
	if (tourIsLoading || hotelIsLoading || userListIsLoading || paymentMethodsIsLoading || agencyIsLoading || incomingIsLoading) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if (tourIsError || hotelIsError || userListIsError || paymentMethodIsError || agencyIsError) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;


	let items = incomingTourData.content;
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='SportsScore' iconColor='info'>
						<CardTitle>Atv Safari</CardTitle>
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
									//onClick={() => requestSort('date')}
									onClick={() => null}
									className='cursor-pointer text-decoration-underline'>
									Tur Tarih / Saat{' '}
									{/* <Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/> */}
								</th>
								<th>Müşteri Bilgileri</th>
								<th>Single</th>
								<th>Double</th>
								<th>Otel Adı</th>
								<th>Oda No</th>
								<th>Bilet No</th>
								<th>Ödeme Türü</th>
								<th>Ücret</th>
								<th>Ödenen</th>
								<th>Kalan Ödeme</th>
								<td />
							</tr>
						</thead>
						<tbody>

							{dataPagination(items, currentPage, perPage).map((item:any) => (
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

											aria-label='Detailed information'
										/>
									</td>
									<td>{item.tourDate.split('T')[0]} - {item.timeToPickUp}</td>
									{/* <td>
										<div>
											<div>{tourData.content.filter((el:any)=>el.id==item.tourId)[0].name}</div>
											<div className='small text-muted'>
											{agencyData.content.filter((el:any)=>el.id==item.tour.agencyId)[0].name}
											</div>
										</div>
									</td> */}
									<td>
										<div>
											<div>{item.customers[0]?.customerName} {item.customers[0]?.customerSurname}</div>
											<div className='small text-muted'>
											{item.customers[0]?.customerPhoneNumber}
											</div>
										</div>
									</td>
									<td>{item.singleCount}</td>
									<td>{item.doubleCount}</td>
									<td>{item.hotelId?hotelData.content.filter((el:any)=>el.id==item.hotelId)[0].name:''}</td>
									<td>{item.roomNumber}</td>
									<td>{item.ticketNumber}</td>
									<td>{paymentMethodsData.content.filter((el:any)=>el.id==item.paymentMethodId)[0].name} - {item.currency}</td>
									<td>{item.price}</td>
									<td>{item.paid}</td>
									<td>{item.price - item.paid}</td>
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
					data={incomingTourData.content}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>



			{/* Edit Modal */}
			<Modal
					setIsOpen={setEditOffcanvas}
					isOpen={editOffcanvas}
					titleId='newRecordIncomingModal'
					isCentered
					isScrollable
					size='xl'>
					<ModalHeader setIsOpen={setEditOffcanvas}>
						<OffCanvasTitle id='newRecordIncomingTitle'>Kayıt Düzenle</OffCanvasTitle>
					</ModalHeader>
					<form onSubmit={handleSubmit((data) => handleUpdateAction(data))}>
					<ModalBody>
					<div className='row g-4'>
							<div className='col-4'>
						    <FormGroup id='tourId' label='Tur Adı' isFloating>
						        <Controller name="tourId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={tourData.content.filter((el:any)=>el.id==2).map((el: any) => ({
																			value: el.id,
																			text: el.type.name+'-'+el.agency.name,
																			label: el.type.name+'-'+el.agency.name,
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
							<div className='col-2'>
							<FormGroup id='tourDate' label='Tur Tarih' isFloating>
						        <Controller name="tourDate"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Tur Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.tourDate && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
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
							<div className='col-3'>
							<FormGroup id='roomNumber' label='Oda/Kapı Numarası' isFloating>
						        <Controller name="roomNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-6'>
							<FormGroup id='extraLocation' label='Ekstra Konum' isFloating>
						        <Controller name="extraLocation"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-3'>
							<FormGroup id='timeToPickUp' label='Müşteri Alış Saati' isFloating>
						        <Controller name="timeToPickUp"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												type='time'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.timeToPickUp && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
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
							<div className='col-2'>
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
							<div className='col-2'>
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
							<div className='col-2'>
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
							<div className='col-5'>
							<FormGroup  id='singleCount' label='Single Kişi Sayısı'>
							<Controller name="singleCount"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
													type='number'
													autoComplete='cc-csc'
													placeholder='Giriniz'
													required
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-5'>
							<FormGroup  id='doubleCount' label='Double Kişi Sayısı'>
							<Controller name="doubleCount"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
													type='number'
													autoComplete='cc-csc'
													placeholder='Giriniz'
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>


							<DynamicFragments  control={control} errors={errors} fragments={fragments} setFragments={setFragments} setValue={setValue}  />

							<div className='col-3'>
							<FormGroup id='transferNumber' label='Transfer Numarası' isFloating>
						        <Controller name="transferNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Transfer Numarası'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-2'>
								<FormGroup id='needsTransfer' isFloating>
								<Controller name="needsTransfer"
                                            rules={{ required: false }}
                                             control={ control}
                                            render={({ field }) => (
												<Checks
												id='needsTransfer'
												type='switch'
												label='Transfer istiyor'
												onChange={(e:any) => field.onChange(e.target.checked)} // Manually handle onChange
												checked={field.value} // Use field.value instead of {...field}
											/>
                                             )}
                                    />


								</FormGroup>
							</div>
							<div className='col-7'>
							<FormGroup id='note' label='Not' isFloating>
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
							type='submit'
							className='w-100'
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
					size='xl'>
					<ModalHeader setIsOpen={setNewItemOffcanvas}>
						<OffCanvasTitle id='newRecordIncomingTitle'>Yeni Kayıt</OffCanvasTitle>
					</ModalHeader>
					<form onSubmit={handleSubmit((data) => handleSaveAction(data))}>
					<ModalBody>
						<div className='row g-4'>
							<div className='col-4'>
						    <FormGroup id='tourId' label='Tur Adı' isFloating>
						        <Controller name="tourId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={tourData.content.filter((el:any)=>el.id==2).map((el: any) => ({
																			value: el.id,
																			text: el.type.name+'-'+el.agency.name,
																			label: el.type.name+'-'+el.agency.name,
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
							<div className='col-2'>
							<FormGroup id='tourDate' label='Tur Tarih' isFloating>
						        <Controller name="tourDate"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Tur Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.tourDate && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
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
							<div className='col-3'>
							<FormGroup id='roomNumber' label='Oda/Kapı Numarası' isFloating>
						        <Controller name="roomNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-6'>
							<FormGroup id='extraLocation' label='Ekstra Konum' isFloating>
						        <Controller name="extraLocation"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-3'>
							<FormGroup id='timeToPickUp' label='Müşteri Alış Saati' isFloating>
						        <Controller name="timeToPickUp"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Giriniz'
												type='time'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors.timeToPickUp && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
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
							<div className='col-2'>
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
							<div className='col-2'>
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
							<div className='col-2'>
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
							<div className='col-5'>
							<FormGroup  id='singleCount' label='Single Kişi Sayısı'>
							<Controller name="singleCount"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
													type='number'
													autoComplete='cc-csc'
													placeholder='Giriniz'
													required
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-5'>
							<FormGroup  id='doubleCount' label='Double Kişi Sayısı'>
							<Controller name="doubleCount"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
													type='number'
													autoComplete='cc-csc'
													placeholder='Giriniz'
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>


							<DynamicFragments  control={control} errors={errors} fragments={fragments} setFragments={setFragments} setValue={setValue}  />

							<div className='col-3'>
							<FormGroup id='transferNumber' label='Transfer Numarası' isFloating>
						        <Controller name="transferNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Transfer Numarası'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-2'>
								<FormGroup id='needsTransfer' isFloating>
								<Controller name="needsTransfer"
                                            rules={{ required: false }}
                                             control={ control}
                                            render={({ field }) => (
												<Checks
												id='needsTransfer'
												type='switch'
												label='Transfer istiyor'
												onChange={(e:any) => field.onChange(e.target.checked)} // Manually handle onChange
												checked={field.value} // Use field.value instead of {...field}
											/>
                                             )}
                                    />


								</FormGroup>
							</div>
							<div className='col-7'>
							<FormGroup id='note' label='Not' isFloating>
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
							type='submit'
							className='w-100'
							>
							Kaydet
						</Button>
					</ModalFooter>
					</form>
			</Modal>
		</>
	);
};

const DynamicFragments = ({ control, errors, isDisabled=false, fragments, setFragments, setValue} :any ) => {

	const addFragment = () => {
	  setFragments((prev: any[]) => [...prev, { id: prev.length }]);
	};

	const deleteFragment = (id:any) => {
		if (fragments.length === 1) {
			return showNotification(
				'Hata', // String, HTML or Component
				'En az bir müşteri bilgisi girilmelidir.', // String, HTML or Component
				'danger' // 'default' || 'info' || 'warning' || 'success' || 'danger',
			);

		}

			const confirmation = window.confirm('Silmek istediğinizden emin misiniz?'); // Tarayıcı standart onay kutusu
			let indexDeleted=	fragments.findIndex((object: { id: any; }) => object.id === id)


			if (confirmation) {
			    setFragments((prev:any[]) => prev.filter(fragment => fragment.id !== id));
			    setValue(`customerName${indexDeleted +1}`, undefined);
			    setValue(`customerName${indexDeleted +1}`, undefined);
			    setValue(`customerSurname${indexDeleted +1}`, undefined);
			    setValue(`customerIdentityNumber${indexDeleted +1}`, undefined);
			    setValue(`customerPhoneNumber${indexDeleted +1}`, undefined);
			    setValue(`customerDateOfBirth${indexDeleted +1}`, undefined);

				for (let i = 0; i < fragments.filter((fragment: { id: any; }) => fragment.id !== id).length; i++) {

					let id: number = fragments[i]['id'];

					setValue(`customerName${i+1}`, fragments[i]['customerName']);
					setValue(`customerId${i+1}`, id);
					setValue(`customerSurname${i+1}`, fragments[i]['customerSurname']);
					setValue(`customerIdentityNumber${i+1}`, fragments[i]['customerIdentityNumber']);
					setValue(`customerPhoneNumber${i+1}`,fragments[i]['customerPhoneNumber']);
					setValue(`customerAddress${i+1}`, fragments[i]['customerAddress']);
					setValue(`customerDateOfBirth${i+1}`, fragments[i]['customerDateOfBirth']?.split('T')[0]);
					setValue(`customerEmail${i+1}`, fragments[i]['customerEmail'])


					}


				showNotification(
					'Başarılı', // String, HTML or Component
					'Müşteri Silindi', // String, HTML or Component
					'warning' // 'default' || 'info' || 'warning' || 'success' || 'danger',
				);
			}

	};


	return (
	  <>

	{!isDisabled &&<div className='col-1'><Icon icon='SupervisorAccount' className='me-2' size='2x' onClick={addFragment}  />Ekle</div>}

		{fragments.map((fragment: any, index: number) => (
			fragment.id !== 11 &&
		  <React.Fragment key={fragment.id} >
							 <div className='col-2'>
							<FormGroup id={`customerName${index +1}`} label='Müşteri Adı' isFloating>
						        <Controller name={`customerName${index +1}`}
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
							{errors["customerName"+index +1] && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-2'>
							<FormGroup id={`customerSurname${index +1}`} label='Müşteri Soyadı' isFloating>
						        <Controller name={`customerSurname${index +1}`}
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri Soyadı'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors["customerSurname"+index +1] && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-3'>
							<FormGroup id={`customerIdentityNumber${index +1}`} label='Müşteri TC/PP' isFloating>
						        <Controller name={`customerIdentityNumber${index +1}`}
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
							<div className='col-2'>
							<FormGroup id={`customerPhoneNumber${index +1}`} label='Müşteri Telefon' isFloating>
						        <Controller name={`customerPhoneNumber${index +1}`}
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
							{errors["customerPhoneNumber"+index +1] && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-2'>
							<FormGroup id={`customerDateOfBirth${index +1}`} label='Müşteri Doğum Tarihi' isFloating>
						        <Controller name={`customerDateOfBirth${index +1}`}
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Müşteri Doğum Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							{errors["customerDateOfBirth"+index +1] && <span>Bu alan gerekli</span>}
							</div>


			  {((fragments.length > 0)&&!isDisabled) && (
				<div className='col-1'><Icon icon='DeleteForever' className='me-2' size='2x' onClick={() => deleteFragment(fragment.id)} />Sil</div>
				  )}
			  {/* Similar structure for halfPrice, period1Start, and period1End */}
			  {/* Delete button for each fragment */}

		  </React.Fragment>
		))}
	  </>
	);
  };

export default TourList;
