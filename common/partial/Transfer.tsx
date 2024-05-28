import React, { FC, useEffect, useRef, useState } from 'react';
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
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Select from '../../components/bootstrap/forms/Select';
import { useDataAgency, useDataPaymentMethods, useDataHotelList, useDataVehicleList, useDataDriverList } from '../../helpers/connections/tour';
import { useUserContext } from '../../context/UserContext';
import { useDataUserList } from '../../helpers/connections/user';
import showNotification from '../../components/extras/showNotification';
import { listTransfer, postAddTransfer, postDeleteTransfer, postUpdateTransfer } from '../../helpers/connections/transfer';
import Spinner from '../../components/bootstrap/Spinner';
import ReactToPrint from 'react-to-print';



interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const List: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const componentRef = useRef<HTMLDivElement>(null)

	const { register, handleSubmit, reset, formState: { errors }, getValues, setValue, control, watch } = useForm();
	const { user } = useUserContext();
	const [fragments, setFragments] = useState([{ id: 0 }]); // Initial fragment


	const { data:hotelData, isLoading:hotelIsLoading, isError:hotelIsError } = useDataHotelList();
	const { data:vehicleData, isLoading:vehicleIsLoading, isError:vehicleIsError } = useDataVehicleList();
	const { data:driverData, isLoading:driverIsLoading, isError:driverIsError } = useDataDriverList();
	const { data:userListData, isLoading:userListIsLoading, isError:userListIsError } = useDataUserList();
	const { data:paymentMethodsData, isLoading:paymentMethodsIsLoading, isError:paymentMethodIsError } = useDataPaymentMethods();
	const { data: agencyData, isLoading: agencyIsLoading, isError: agencyIsError } = useDataAgency();
	const [transferIsLoading, setTransferIsLoading] = useState(true);




	const [editOffcanvas, setEditOffcanvas] = useState(false);



	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);
	const [transferData, setTransferData] = useState<any>(null);

	useEffect(() => {
	listTransfer({ data : {} }, user.token!).then((res:any) => {
	 		// console.log('listTransfer', res);
	setTransferData(res);
	setTransferIsLoading(false)
	}
	);
	}, [newItemOffcanvas, editOffcanvas]);

	const handleUpcomingEdit = (itm:any) => {
		console.log('handleUpcomingEdit', itm);


					  setFragments(itm.customers.length>0?itm.customers:[{ id: 0 }]);

			   let itemm : { [key: string]: any }=	{
						        id: itm.id,
								transferDate: itm.transferDate.split('T')[0],
								transferTime: itm.transferTime,
						        direction: itm.direction,
						        flightNumber: itm.flightNumber,
								startPoint: itm.startPoint,
								endPoint: itm.endPoint,
								vehicleId: itm.vehicle.id,
								driverId: itm.driver.id,
								hotelId: itm.hotel?.id,
								distanceKm: itm.distanceKm,
								roomNumber: Number(itm.roomNumber),
								timeToPickUp: itm.timeToPickUp,
								salesmanId: itm.salesman.id,
								sellerAgencyId: itm.sellerAgency.id,
								price: itm.price,
								paid: itm.paid,
								unit: itm.currency,
								paymentMethodId: itm.paymentMethod.id,
								adult: itm.adult,
								child: itm.child,
								baby: itm.baby,
								note: itm.note,

					   }
					   for (let i = 0; i < itm.customers.length; i++) {
						   console.log('itm.customers[i]', itm.customers[i]);

						   let id: number = itm.customers[i]['id'];
						  // console.log('id', id);

						   itemm[`customerName${i+1}`] = itm.customers[i]['customerName'];
						   itemm[`customerId${i+1}`] = id;
						   itemm[`customerSurname${i+1}`] = itm.customers[i]['customerSurname'];
						   itemm[`customerIdentityNumber${i+1}`] = itm.customers[i]['customerIdentityNumber'];
						   itemm[`customerPhoneNumber${i+1}`]= itm.customers[i]['customerPhoneNumber'];
						   itemm[`customerAddress${i+1}`] = itm.customers[i]['customerAddress'];
						   itemm[`customerDateOfBirth${i+1}`] = itm.customers[i]['customerDateOfBirth']?.split('T')[0];
						   itemm[`customerEmail${i+1}`] = itm.customers[i]['customerEmail'];


						   }
						   reset(itemm);
						   setEditOffcanvas(true);

   };

	const handleNewItem = () => {
		setNewItemOffcanvas(!newItemOffcanvas);
		 // set form to default empty values
		reset({
			id: 0,
			transferDate: '',
			transferTime: '',
			direction: '',
			flightNumber: '',
			startPoint: '',
			endPoint: '',
			vehicleId: '',
			distanceKm: '',
			driverId: '',
			hotelId: '',
			roomNumber: '',
			timeToPickUp: '',
			salesmanId: '',
			sellerAgencyId: '',
			price:'',
			paid:'',
			unit: '',
			paymentMethodId: '',
			adult: '',
			child:'',
			baby: '',
			note: '',
		});
		setFragments([{ id: 0 }]);
	};
	const handleUpdateAction = (post_data: any) => {
		let postData = post_data;

	postUpdateTransfer({ data: postData }, user.token!)
			.then((res) => {
			// 	toast.success(`Tur kaydı güncelleştirildi`);


			setEditOffcanvas(false);

			})
			.catch((err) => {
				console.log("error");
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleSaveAction = (data: any) => {

	postAddTransfer({ data : data }, user.token!)
			.then((res) => {
				//toast.success(`Yeni tour rezervasyon kaydı oluşturuldu`);
				setNewItemOffcanvas(false)
			})
			.catch((err) => {
				console.log("error");
				// toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleDeleteAction = (data: any) => {

	postDeleteTransfer({ data : data }, user.token!)
			.then((res:any) => {
				listTransfer({ data : {} }, user.token!).then((res:any) => {
		   setTransferData(res);
		   }
		   );
			})
			.catch((err) => {
				console.log("error");
				// toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};

	const currency = [
		{ value: 'TRY', label: 'TL' },
		{ value: 'USD', label: 'Dolar' },
		{ value: 'EUR', label: 'Euro' },
		{ value: 'GBP', label: 'Sterlin' },

		]
	const directionTypes = [
		{ value: 'giden', label: 'Giden' },
		{ value: 'gelen', label: 'Gelen' }

		]
		const sellerCompany = [
			{id: 1, value: 'bigbrothersTravel', label: 'Bigbrothers Travel' },
			{id: 14, value: 'oludenizTravel', label: 'Ölüdeniz Travel' },
			{id:42, value: 'fethiyeTatilTurlari', label: 'Fethiye Tatil Turları' }
			]



	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	// const { items, requestSort, getClassNamesFor } = useSortableData(data);
	if (hotelIsLoading || userListIsLoading || paymentMethodsIsLoading || agencyIsLoading || vehicleIsLoading|| transferIsLoading || driverIsLoading) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if (hotelIsError || userListIsError || paymentMethodIsError || agencyIsError|| vehicleIsError|| driverIsError) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	// console.log('userListData', userListData);
	// console.log('tourData', tourData);

	let items = transferData.content;
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Transferler</CardTitle>
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
						<ReactToPrint
  trigger={() => <Button
	color='info'
	icon='CloudDownload'
	isLight
	tag='a'
	/* to='/somefile.txt' */
	target='_blank'
	/*download*/
	>
	Export
</Button>}
  content={() => componentRef.current}
/>
					</CardActions>
					</div>

				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'  ref={componentRef as React.RefObject<HTMLTableElement>}>
						<thead>
							<tr>
								<td style={{ width: 60 }} />
								<th
									//onClick={() => requestSort('date')}
									onClick={() => null}
									className='cursor-pointer text-decoration-underline'>
									Transfer Tarih / Saat{' '}
									{/* <Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/> */}
								</th>
								<th>Yön</th>
								{/* <th>Mesafe</th> */}
								<th>Uçuş Numarası</th>
								<th>Kalkış</th>
								<th>Varış</th>
								<th>Şoför</th>
								<th>Araç Türü</th>
								<td />
							</tr>
						</thead>
						<tbody>

							{dataPagination(items, currentPage, perPage).map((item:any) => (
								<tr key={item.id.toString()}>
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
									<td>{item.transferDate + item.transferTime}</td>
									<td>{item.direction}</td>
									<td>{item.flightNumber}</td>
									<td>{item.startPoint}</td>
									<td>{item.endPoint}</td>
									 <td>{item.driver.user.name+ ' ' + item.driver.user.surname }</td>
									<td>{item.vehicle.type}</td>
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
					data={ transferData.content}
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
						<div className='col-2'>
						<FormGroup id='transferDate' label='Transfer Tarih' isFloating>
							<Controller name="transferDate"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<Input
											placeholder='Transfer Tarihi'
											type='date'
											{...field}
										/>
													 )}
							/>
						</FormGroup>
						</div>
						<div className='col-4'>
								<FormGroup id='sellerAgencyId' label='Satıcı Acenta' isFloating>
									<Controller name="sellerAgencyId"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Select
												size='sm'
												placeholder='Seçiniz'
												ariaLabel='Seçiniz'
												list={agencyData.content.map((el: any) => ({
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
								{errors.sellerAgencyId && <span>Bu alan gerekli</span>}

							</div>
						<div className='col-3'>
							<FormGroup id='direction' label='Yön' isFloating>
							<Controller name="direction"
										rules={{ required: true }}
										 control={ control}
										render={({ field }) => (
											<Select
											size='sm'
											placeholder='Birim'
											ariaLabel='Birim'
											list={directionTypes.map((el: any) => ({
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
							{errors.unit && <span>Bu alan gerekli</span>}

						</div>
						<div className='col-3'>
						<FormGroup id='flightNumber' label='Uçuş Numarası' isFloating>
							<Controller name="flightNumber"
											control={control}
											rules={{ required: false }}
											render={({ field }) => (
												<Input
											placeholder='Uçuş Numarası'
											{...field}
										/>
													 )}
							/>
						</FormGroup>
						</div>

						<div className='col-3'>
						<FormGroup id='startPoint' label='Kalkış' isFloating>
							<Controller name="startPoint"
											control={control}
											rules={{ required: false }}
											render={({ field }) => (
												<Input
											placeholder='Alış Yeri'
											{...field}
										/>
													 )}
							/>
						</FormGroup>
						</div>
						<div className='col-3'>
						<FormGroup id='endPoint' label='Varış' isFloating>
							<Controller name="endPoint"
											control={control}
											rules={{ required: false }}
											render={({ field }) => (
												<Input
											placeholder='İniş Yere'
											{...field}
										/>
													 )}
							/>
						</FormGroup>
						</div>
						<div className='col-3'>
						<FormGroup id='vehicleId' label='Araç' isFloating>
							<Controller name="vehicleId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
																	<Select
																	size='sm'
																	placeholder='Seçiniz'
																	ariaLabel='Seçiniz'
																	list={vehicleData.content.map((el: any) => ({
																		value: el.id,
																		label: el.type+' '+el.model+'-'+ el.plate,
																	}))}
																	className={classNames('rounded-1', {
																	'bg-white': !darkModeStatus,
																	})}
																	{...field}
																		/>
													 )}
							/>
						</FormGroup>
						 {errors.salesman && <span>Bu alan gerekli</span>}
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
						</div>
						<div className='col-3'>
						<FormGroup id='driverId' label='Sürücü' isFloating>
							<Controller name="driverId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
																	<Select
																	size='sm'
																	placeholder='Seçiniz'
																	ariaLabel='Seçiniz'
																	list={driverData.content.map((el: any) => ({
																		value: el.id,
																		text: el.user.name + ' ' + el.user.surname,
																		label: el.user.name + ' ' + el.user.surname,
																	}))}
																	className={classNames('rounded-1', {
																	'bg-white': !darkModeStatus,
																	})}
																	{...field}
																		/>
													 )}
							/>
						</FormGroup>
						 {errors.driverId && <span>Bu alan gerekli</span>}
						</div>
						<div className='col-3'>
						<FormGroup id='salesmanId' label='Satıcı' isFloating>
							<Controller name="salesmanId"
											control={control}
											rules={{ required: false }}
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
							<FormGroup id='unit' label='Birim' isFloating>
							<Controller name="unit"
										rules={{ required: true }}
										 control={ control}
										render={({ field }) => (
											<Select
											size='sm'
											placeholder='Birim'
											ariaLabel='Birim'
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
							{errors.unit && <span>Bu alan gerekli</span>}

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
						 {errors.paymentMethod && <span>Bu alan gerekli</span>}
						</div>

						<div className='col-4'>
						<FormGroup  id='adult' label='Yetişkin'>
						<Controller name="adult"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<Input
												type='number'
												placeholder='Giriniz'
												{...field}
											/>
													 )}
							/>
						</FormGroup>
						</div>
						<div className='col-4'>
						<FormGroup  id='child' label='Çocuk'>
						<Controller name="child"
											control={control}
											rules={{ required: false }}
											render={({ field }) => (
												<Input
												type='number'
												placeholder='Giriniz'
												{...field}
											/>
													 )}
							/>
						</FormGroup>
						</div>
						<div className='col-3'>
						<FormGroup  id='baby' label='Bebek'>
						<Controller name="baby"
											control={control}
											rules={{ required: false }}
											render={({ field }) => (
												<Input
												type='number'
												placeholder='Giriniz'
												{...field}
											/>
													 )}
							/>
						</FormGroup>
						</div>

						<DynamicFragments  control={control} errors={errors} fragments={fragments} setFragments={setFragments} setValue={setValue}  />


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
							<div className='col-2'>
							<FormGroup id='transferDate' label='Transfer Tarih' isFloating>
						        <Controller name="transferDate"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Transfer Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-4'>
								<FormGroup id='sellerAgencyId' label='Satıcı Acenta' isFloating>
									<Controller name="sellerAgencyId"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Select
												size='sm'
												placeholder='Seçiniz'
												ariaLabel='Seçiniz'
												list={agencyData.content.map((el: any) => ({
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
								{errors.sellerAgencyId && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-3'>
								<FormGroup id='direction' label='Yön' isFloating>
								<Controller name="direction"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Select
											size='sm'
											placeholder='Birim'
											ariaLabel='Birim'
											list={directionTypes.map((el: any) => ({
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
								{errors.unit && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-3'>
							<FormGroup id='flightNumber' label='Uçuş Numarası' isFloating>
						        <Controller name="flightNumber"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Uçuş Numarası'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>

							<div className='col-3'>
							<FormGroup id='startPoint' label='Kalkış' isFloating>
						        <Controller name="startPoint"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Kalkış'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-3'>
							<FormGroup id='endPoint' label='Varış' isFloating>
						        <Controller name="endPoint"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
												placeholder='Varış'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-3'>
						    <FormGroup id='vehicleId' label='Araç' isFloating>
						        <Controller name="vehicleId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={vehicleData.content.map((el: any) => ({
																			value: el.id,
																			label: el.type+' '+el.model+'-'+ el.plate,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.vehicleId && <span>Bu alan gerekli</span>}
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
							 {errors.hotelId && <span>Bu alan gerekli</span>}
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
							</div>
							<div className='col-3'>
						    <FormGroup id='driverId' label='Sürücü' isFloating>
						        <Controller name="driverId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={driverData.content.map((el: any) => ({
																			value: el.id,
																			text: el.user.name + ' ' + el.user.surname,
																			label: el.user.name + ' ' + el.user.surname,
																		}))}
																		className={classNames('rounded-1', {
																		'bg-white': !darkModeStatus,
																		})}
																		{...field}
																			/>
                                                         )}
								/>
							</FormGroup>
							 {errors.driverId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-3'>
						    <FormGroup id='salesmanId' label='Satıcı' isFloating>
						        <Controller name="salesmanId"
	                                            control={control}
	                                            rules={{ required: false }}
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
								<FormGroup id='unit' label='Birim' isFloating>
								<Controller name="unit"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Select
												size='sm'
												placeholder='Birim'
												ariaLabel='Birim'
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
								{errors.unit && <span>Bu alan gerekli</span>}

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
							 {errors.paymentMethod && <span>Bu alan gerekli</span>}
							</div>

							<div className='col-4'>
							<FormGroup  id='adult' label='Yetişkin'>
							<Controller name="adult"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
													type='number'
													placeholder='Giriniz'
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-4'>
							<FormGroup  id='child' label='Çocuk'>
							<Controller name="child"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
													type='number'
													placeholder='Giriniz'
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-3'>
							<FormGroup  id='baby' label='Bebek'>
							<Controller name="baby"
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
													type='number'
													placeholder='Giriniz'
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>

							<DynamicFragments  control={control} errors={errors} fragments={fragments} setFragments={setFragments} setValue={setValue}  />


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
				console.log(fragments.length, 'fragments', fragments);

			const confirmation = window.confirm('Silmek istediğinizden emin misiniz?'); // Tarayıcı standart onay kutusu
			let indexDeleted=	fragments.findIndex((object: { id: any; }) => object.id === id)
		console.log('indexDeleted', indexDeleted);
		console.log(`customerName${indexDeleted +1}` );


			if (confirmation) {
			    setFragments((prev:any[]) => prev.filter(fragment => fragment.id !== id));
			    setValue(`customerName${indexDeleted +1}`, undefined);
			    setValue(`customerName${indexDeleted +1}`, undefined);
			    setValue(`customerSurname${indexDeleted +1}`, undefined);
			    setValue(`customerIdentityNumber${indexDeleted +1}`, undefined);
			    setValue(`customerPhoneNumber${indexDeleted +1}`, undefined);
			    setValue(`customerDateOfBirth${indexDeleted +1}`, undefined);

				for (let i = 0; i < fragments.filter((fragment: { id: any; }) => fragment.id !== id).length; i++) {
					console.log('delete func içi fragments[i]', fragments[i]);

					let id: number = fragments[i]['id'];
				   // console.log('id', id);

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
					'Fiyat dönemi başarıyla silindi..', // String, HTML or Component
					'warning' // 'default' || 'info' || 'warning' || 'success' || 'danger',
				);
			}

	};
console.log('fragments', fragments);


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

export default List;
