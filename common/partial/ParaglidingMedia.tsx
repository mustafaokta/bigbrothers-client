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
import {
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Avatar from '../../components/Avatar';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Select from '../../components/bootstrap/forms/Select';
import { useDataAgency, useDataPaymentMethods, useDataTourList } from '../../helpers/connections/tour';
import { useUserContext } from '../../context/UserContext';
import { useDataUserList } from '../../helpers/connections/user';
import { deleteMedia,postAddMediaPayment, postMediaList ,updateMediaPayment} from '../../helpers/connections/paragliding';
import { useDataPilotName} from '../../helpers/connections/paragliding';
import UserImage from '../../assets/img/wanna/wanna1.png';


interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const Media: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [mediaListData, setMediaListData] = useState<any>({content:[]});
	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const { user } = useUserContext();

	const { data:tourData, isLoading:tourIsLoading, isError:tourIsError } = useDataTourList();
	const { data:userListData, isLoading:userListIsLoading, isError:userListIsError } = useDataUserList();
	const { data:paymentMethodsData, isLoading:paymentMethodsIsLoading, isError:paymentMethodIsError } = useDataPaymentMethods();
	const { data: agencyData, isLoading: agencyIsLoading, isError: agencyIsError } = useDataAgency();
	const { data:pilotListData, isLoading: pilotlistIsLoading, isError: pilotlistIsError } = useDataPilotName();
	const [mediaListIsLoading, setMediaListIsLoading] = useState(true);


const mediaPaymentTypes =[{id : 1, name : 'Standart'}, {id : 2, name : 'Ekstra 360'}]


	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);

	const currency = [
		{ value: 'TRY', label: 'TL' },
		{ value: 'USD', label: 'Dolar' },
		{ value: 'EUR', label: 'Euro' },
		{ value: 'GBP', label: 'Sterlin' },

		]


		const handleDeleteAction = (postData: any) => {
			deleteMedia({ data: postData}, user.token!)
		   .then((res) => {
			postMediaList({ data : {} }, user.token!).then((res:any) => {
				console.log('postMediaList', res);
				setMediaListData(res);
			   }
   );

		})
			.catch((err:any) => {
				console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
		}

	const handleUpcomingEdit = (itm:any) => {

		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);

	let itemm=	{
	    id :    itm.id,
		type :  itm.type,
		price   :  itm.price,
		paymentMethodId :  itm.paymentMethodId,
		paid   : itm.paid,
		isSold  :  itm.isSold,
		soldDate : new Date(itm.soldDate).toISOString().split('T')[0],
		soldTime : itm.soldTime,
		currency   : itm.currency,
		tourReservationId : itm.tourReservationId,
		note : itm.note,
		pilotId : itm.pilotId,
	}
		reset(itemm);

	};

	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);

	useEffect(() => {
	console.log('tekrar çalıştı');

	postMediaList({ data : {} }, user.token!).then((res:any) => {
		 			console.log('postMediaList', res);
					 setMediaListData(res);
		 								setMediaListIsLoading(false)
		}
		);
	}, [newItemOffcanvas, upcomingEventsEditOffcanvas])

	const sortiTimes = [
		{ value: '08:30', label: '08:30' },
		{ value: '11:00', label: '11:00' },
		{ value: '13:00', label: '13:00' },
		{ value: '15:00', label: '15:00' },
		{ value: '17:00', label: '17:00' },
	];

	const handleNewItem = () => {
		setNewItemOffcanvas(!newItemOffcanvas);
		 // set form to default empty values
		reset({
			id :  '',
			type :  '',     // For example, "DVD", "Book", "Digital", etc.
			price   :  '',
			paymentMethodId : '',
			paid   : '',
			isSold  :  '',
			soldDate : '',
			pilotId: '',
			soldTime : '',
			currency   : '',
			tourReservationId : '',
		});
	};
	const handleUpdateAction = (post_data: any) => {
		let postData = post_data;
	 console.log('post_data update !!!!!!!', postData);

	 updateMediaPayment({ mediaPayment: postData }, user.token!)
			.then((res) => {
			// 	toast.success(`Tur kaydı güncelleştirildi`);
				setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
			})
			.catch((err) => {
				console.log("error");
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleSaveAction = (data: any) => {
	 console.log('post_data', data);

	postAddMediaPayment({ mediaPayment :  data  }, user.token!)
			.then((res) => {
				//toast.success(`Yeni tour rezervasyon kaydı oluşturuldu`);
				setNewItemOffcanvas(false)
			})
			.catch((err) => {
				console.log("error");
				// toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};




	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	// const { items, requestSort, getClassNamesFor } = useSortableData(data);
	if (tourIsLoading || userListIsLoading || paymentMethodsIsLoading || pilotlistIsLoading || mediaListIsLoading) return <div className="flex flex-col w-full">YÜKLENİYOR....</div>;
	if (tourIsError || userListIsError || paymentMethodIsError || pilotlistIsError) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;

	let items = mediaListData.content;
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Media Ödemeleri</CardTitle>
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
								<th>Satış Tarih / Sorti</th>
								<th>Pilot Adı</th>
								<th>Media Türü</th>
								{/* <th>Satıldı Mı</th>
								<th>Formatı</th> */}
								<th>Ücreti</th>
								<th>Ödeme Yöntemi</th>
								<th>Ödenen</th>
								<th>Kalan Ödeme</th>
								<th>Para Birimi</th>
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
									<td>
									{dayjs(`${item.soldDate}`).format(
													'MMM Do YYYY',
												)}-{item.soldTime}</td>

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
										if (el.id === item.pilotId) {
										return `${el.user.name} ${el.user.surname}`;
										} else {
										return '';
										}
									})
									}
									</div>
										</div>
									</td>
									<td>{mediaPaymentTypes.filter((el:any)=>el.id==item.type)[0].name}</td>
									{/* <td>{item.isSold ? 'Evet': 'Hayır' }</td> */}

									<td>{item.price}</td>
									<td>{paymentMethodsData.content.filter((el:any)=>el.id==item.paymentMethodId)[0].name}</td>
									<td>{item.paid}</td>
									<td>{(item.price - item.paid)}</td>
									<td>{item.currency}</td>

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
					data={mediaListData.content}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>


			{/* Edit Modal */}
			<Modal
					setIsOpen={setUpcomingEventsEditOffcanvas}
					isOpen={upcomingEventsEditOffcanvas}
					titleId='upcomingEdit'
					isCentered
					isScrollable
					size='lg'>
					<ModalHeader setIsOpen={setUpcomingEventsEditOffcanvas}>
						<OffCanvasTitle id='upcomingEdit'>Medya Düzenle</OffCanvasTitle>
					</ModalHeader>
					<form onSubmit={handleSubmit((data) => handleUpdateAction(data))}>
					<ModalBody>
						<div className='row g-4'>

							<div className='col-6'>
							<FormGroup id='soldDate' label='Satış Tarihi' isFloating>
						        <Controller name="soldDate"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Satış Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>

							<div className='col-6'>
								<FormGroup id='soldTime' label='Sorti Saati' isFloating>
								<Controller name="soldTime"
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
																			value: el.id,
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

							<div className='col-4'>
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
							<div className='col-4'>
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
							<div className='col-4'>
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
							<div className='col-6'>
						    <FormGroup id='type' label='Tipi' isFloating>
						        <Controller name="type"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={mediaPaymentTypes.map((el: any) => ({
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


							<div className='col-6'>
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
					size='lg'>
					<ModalHeader setIsOpen={setNewItemOffcanvas}>
						<OffCanvasTitle id='newRecordIncomingTitle'>Yeni Kayıt</OffCanvasTitle>
					</ModalHeader>
					<form onSubmit={handleSubmit((data) => handleSaveAction(data))}>
					<ModalBody>
						<div className='row g-4'>

							<div className='col-6'>
							<FormGroup id='soldDate' label='Satış Tarihi' isFloating>
						        <Controller name="soldDate"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
												placeholder='Satış Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>

							<div className='col-6'>
								<FormGroup id='soldTime' label='Sorti Saati' isFloating>
								<Controller name="soldTime"
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
																			value: el.id,
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
							 {errors.typeId && <span>Bu alan gerekli</span>}
							</div>

							<div className='col-6'>
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

							<div className='col-4'>
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
							<div className='col-4'>
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
							<div className='col-4'>
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
							<div className='col-6'>
						    <FormGroup id='type' label='Tipi' isFloating>
						        <Controller name="type"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={mediaPaymentTypes.map((el: any) => ({
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


							<div className='col-6'>
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



export default Media;
