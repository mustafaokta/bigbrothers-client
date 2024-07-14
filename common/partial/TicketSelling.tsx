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
import Checks from '../../components/bootstrap/forms/Checks';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Select from '../../components/bootstrap/forms/Select';
import { postAddTourReservation, useDataAgency, useDataPaymentMethods,useDataHotelList, useDataTourList, listTourReservation, postUpdateTourReservation, useDataTourType, deleteTourReservation } from '../../helpers/connections/tour';
import { useUserContext } from '../../context/UserContext';
import { useDataUserList } from '../../helpers/connections/user';
import showNotification from '../../components/extras/showNotification';
import { listTransfer } from '../../helpers/connections/transfer';
import { useRouter } from 'next/router';
import Spinner from '../../components/bootstrap/Spinner';
import ReactToPrint from 'react-to-print';
import { PiWhatsappLogoBold } from "react-icons/pi";


interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const List: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const newFormRef = useRef<HTMLFormElement>(null);
	const editFormRef = useRef<HTMLFormElement>(null);
	
	const [incomingTourData, setIncomingTourData] = useState<any>({content:[]});
	const { register, handleSubmit, reset, formState: { errors }, getValues, setValue, control, watch, trigger } = useForm();
	const { user } = useUserContext();
	const componentRef = useRef<HTMLDivElement>(null);

	const [fragments, setFragments] = useState([{ id: 0}]); // Initial fragment

	const { data:hotelData, isLoading:hotelIsLoading, isError:hotelIsError } = useDataHotelList();
	const { data:tourData, isLoading:tourIsLoading, isError:tourIsError } = useDataTourList();
	const { data:userListData, isLoading:userListIsLoading, isError:userListIsError } = useDataUserList();
	const { data:paymentMethodsData, isLoading:paymentMethodsIsLoading, isError:paymentMethodIsError } = useDataPaymentMethods();
	const { data: agencyData, isLoading: agencyIsLoading, isError: agencyIsError } = useDataAgency();
	const { data: tourTypeData, isLoading: tourTypeIsLoading, isError: tourTypeIsError } = useDataTourType();
	const [incomingIsLoading, setIncomingIsLoading] = useState(true);
	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);
	const [tourDate, setTourDate] = useState<any>(null);
	const [transferData, setTransferData] = useState<any>(null);
	const [postType, setPostType] = useState<any>(null);
	const [filteredTourData, setFilteredTourData] = useState({content:[]});
	const router = useRouter();
	
	 // Filter tour data on change of tourTypeId
	 useEffect(() => {
		const selectedTourTypeId = getValues('tourTypeId');
		console.log('selectedTourTypeId', selectedTourTypeId);

		if (tourData && selectedTourTypeId) {
		console.log('tourData', tourData);

		  const filteredTours = tourData.content.filter((tour:any) => tour.type.id == selectedTourTypeId);
		  console.log('filteredTours', filteredTours);

		  setFilteredTourData({content:filteredTours});
		} else {
		  setFilteredTourData(tourData); // Reset filter if tourTypeId is not selected
		}
	  }, [watch('tourTypeId'), tourData]);
	useEffect(() => {
	listTourReservation({ data : {reservationType:['gelen']} }, user.token!).then((res:any) => {
		 			console.log('bilet gelen', res);
		 								setIncomingTourData(res);
		 								setIncomingIsLoading(false)
		}
		);
	}, [newItemOffcanvas])
	useEffect(() => {
	listTransfer({ data : {} }, user.token!).then((res:any) => {
	 		// console.log('listTransfer', res);
	setTransferData(res);
	console.log('transferData', transferData);
	}
	);
	}, [tourDate]);

	const handleUpcomingEdit = (itm:any) => {
		console.log('handleUpcomingEdit', itm);
		setPostType('update');
					  setFragments(itm.customers.length>0?itm.customers:[{ id: 0 }]);

			   let itemm : { [key: string]: any }=	{
						        id: itm.id,
						        reservationUUID: itm.reservationUUID,
						        type: 'gelen',
							 tourId: itm.tourId,
							  tourTypeId: itm.tour.typeId,
							  sellingType: itm.sellingType,
							  sellerAgencyId: itm.sellerAgencyId.toString(),
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
							  singleCount:itm.singleCount,
							  doubleCount:itm.doubleCount,
							  transferNumber: itm.transferNumber,
							  note: itm.note,
							  needsTransfer: itm.needsTransfer,
							  // media
							  mediaType : itm.mediaPayment?  itm.mediaPayment?.type: '',
							  mediaPrice   : itm.mediaPayment?  itm.mediaPayment?.price: '',
							  mediaPaid   : itm.mediaPayment? itm.mediaPayment?.paid: '',
							  isSold  :  itm.mediaPayment ? itm.mediaPayment?.isSold: '',
							  soldDate : itm.mediaPayment ? new Date(itm.mediaPayment?.soldDate).toISOString().split('T')[0]: '' ,
							  soldTime : itm.mediaPayment?.soldTime,

					   }
					   for (let i = 0; i < itm.customers.length; i++) {
						   console.log('itm.customers[i]', itm.customers[i]);

						   let id: number = itm.customers[i]['id'];

						   itemm[`customerName${i+1}`] = itm.customers[i]['customerName'];
						   itemm[`customerId${i+1}`] = id;
						   itemm[`customerSurname${i+1}`] = itm.customers[i]['customerSurname'];
						   itemm[`customerIdentityNumber${i+1}`] = itm.customers[i]['customerIdentityNumber'];
						   itemm[`customerPhoneNumber${i+1}`]= itm.customers[i]['customerPhoneNumber'];
						   itemm[`customerAddress${i+1}`] = itm.customers[i]['customerAddress'];
						   itemm[`customerDateOfBirth${i+1}`] = itm.customers[i]['customerDateOfBirth'] ? itm.customers[i]['customerDateOfBirth'].split('T')[0]:'';
						   itemm[`customerEmail${i+1}`] = itm.customers[i]['customerEmail'];
						   }
						   reset(itemm);
						   setNewItemOffcanvas(!newItemOffcanvas);
   };

	const handleUpcomingPrint = (itm:any) => {
		console.log('handleUpcomingPrint', itm);
		// open a route in new window
		//window.open(`/bilet/belge/${itm.reservationUUID}`, '_blank');
		//console.log( `${process.env.NEXT_PUBLIC_API_HOST}/ticket/${itm.reservationUUID}`);

		window.open(`${process.env.NEXT_PUBLIC_API_HOST}/ticket/${itm.reservationUUID}`, '_blank');
	}
	const handleNewItem = () => {
		setPostType('create');
		setNewItemOffcanvas(!newItemOffcanvas);
		 // set form to default empty values
		reset({
		    id: '',
		    reservationUUID:'',
		    type : 'gelen',
		    tourId: '',
			tourTypeId: '',
			sellingType: 'office',
			sellerAgencyId: sellerCompany[0].id,
			tourDate: '',
			tourTime: '',
			extraLocation: '',
			hotelName: '',
			roomNumber: '',
			timeToPickUp: '',
			salesmanId: '',
			price: '',
			paid: '',
			paymentMethodId: 1,
			currency: '',
			ticketNumber: '',
			adult: 1,
			child: '',
			baby: '',
			singleCount:'',
			doubleCount:'',
			transferNumber: '',
			note: '',
			needsTransfer: false,
			mediaType :  mediaPaymentTypes[0].name ,
			mediaPrice   :  "",
			mediaPaid   : "",
			isSold  :  false,
			soldDate : "",
			soldTime : "",
			customerPhoneNumber1:'+'
		});
		setFragments([{ id: 0 }]);
	};
	const handleAction = (post_data: any) => {
		if (postType === 'create') {
			handleSaveAction(post_data);
		}else if (postType === 'update') {
			handleUpdateAction(post_data);
		}



	};
	
	const handleUpdateAction = (post_data: any) => {
		let postData = post_data;


	postUpdateTourReservation({ tour: postData }, user.token!)
			.then((res) => {
			// 	toast.success(`Tur kaydı güncelleştirildi`);


			setNewItemOffcanvas(false);

			})
			.catch((err) => {
				console.log("error");
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleSaveAction = (data: any) => {


	postAddTourReservation({ data : data }, user.token!)
			.then((res) => {
				//toast.success(`Yeni tour rezervasyon kaydı oluşturuldu`);
				setNewItemOffcanvas(false)
			})
			.catch((err) => {
				console.log("error");
				// toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};

	const handleWhatsapp = (itm:any, e:any) => {
        e.preventDefault();

		console.log('itm', itm);
		
        // Telefon numarası ve mesaj içeriğini oluşturun
        //const phoneNumber = '+90533 580 8682';
        let phoneNumber = itm.customers[0].customerPhoneNumber;
   // Todo tüm müşterilere gönder
	     
        const message = `${process.env.NEXT_PUBLIC_API_HOST}/ticket/${itm.reservationUUID}`

if (phoneNumber) {
	  // WhatsApp linkini oluşturun
	  const whatsappLink = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

	  // WhatsApp linkine yönlendirme yapın
	  window.open(whatsappLink);
}else {
 	//showNotification('error', 'Hata', 'Telefon numarası bulunamadı');
	 showNotification(
		'Hata', // String, HTML or Component
		'İlk müşteri telefon numarası girilmelidir.', // String, HTML or Component
		'danger' // 'default' || 'info' || 'warning' || 'success' || 'danger',
	);
}
      
    };


	const handleDeleteAction = (postData: any) => {
		const isConfirmed = window.confirm("Silmek istediğinizden emin misiniz?");
		if (!isConfirmed) {
		  return; // Kullanıcı onay vermezse işlemi iptal et
		}
		//(Number(user.roleId) === 1 || Number(user.roleId) === 6) && 
		deleteTourReservation({ data : {reservationType:['gelen','giden'], reservationId: postData.id } }, user.token!)
		  .then((res:any) => {
			setIncomingTourData(res);

			showNotification(
			  'Başarılı', // String, HTML or Component
			  'Tour rezervasyon kaydı silindi', // String, HTML or Component
			  'success' // 'default' || 'info' || 'warning' || 'success' || 'danger',
			);
		  })
		  .catch((err:any) => {
		// 	console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		  });
	  }
	  
	  const handleExternalButtonClick = () => {
		if (newFormRef.current) {
			newFormRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
		}
	  };
	  const handleEditButtonClick = () => {
		if (editFormRef.current) {
			editFormRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
		}
	  };
    
    const mediaPaymentTypes =[{id : 1, name : 'Standart'}, {id : 2, name : 'Ekstra 360'}]


	const currency = [
		{ value: 'TRY', label: 'TL' },
		{ value: 'USD', label: 'Dolar' },
		{ value: 'EUR', label: 'Euro' },
		{ value: 'GBP', label: 'Sterlin' },

		]
		const sellingType = [
			{ value: 'office', label: 'Ofis' },
			{ value: 'online', label: 'Online' }
			]
			let sellerCompany: { value: string, label: string, id?: number }[] = [];
	 	const sellerCompanyBigbrothers = [
			{ value: 'bigbrothersTravel', label: 'Bigbrothers Travel', id: 1 },
			{ value: 'oludenizTravel', label: 'Ölüdeniz Travel', id:14 },
			{ value: 'fethiyeTatilTurlari', label: 'Fethiye Tatil Turları', id: 42 }
			] 
			
			const sellerCompanyTigersson = [
				{ value: 'tigersson', label: 'Tigersson Travel', id: 1 }
				]
				sellerCompany=	process.env.NEXT_PUBLIC_COMPANY_NAME==='Bigbrothers'?sellerCompanyBigbrothers: sellerCompanyTigersson;
//console.log(process.env.NEXT_PUBLIC_COMPANY_NAME);



	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	// const { items, requestSort, getClassNamesFor } = useSortableData(data);
	if (tourIsLoading || hotelIsLoading || userListIsLoading || paymentMethodsIsLoading || agencyIsLoading || incomingIsLoading || tourTypeIsLoading) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if (tourIsError || hotelIsError || userListIsError || paymentMethodIsError || agencyIsError || tourTypeIsError ) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	// console.log('userListData', userListData);
	// console.log('tourData', tourData);
/* 	const handleDeleteAction = (postData: any) => {
		deleteTicketSelling({ data: postData}, user.token!)
			.then((res) => {
				setListData(res);
		})
		.catch((err:any) => {
			console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		});
	} */

	let items = incomingTourData.content;
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Bilet Satışı</CardTitle>
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
								<th>Satış Tipi</th>
								<th>Satıcı Acente</th>
								<th
									onClick={() => null}
									className='cursor-pointer text-decoration-underline'>
									Tur Tarih / Saat{' '}
								</th>
								<th>Tur Adı</th>
								<th>Y</th>
								<th>Ç</th>
								<th>B</th>
								<th>D</th>
								<th>S</th>
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
											onClick={()=> handleDeleteAction(item)}
											aria-label='Detailed information'
										/>
									</td>
									<td>{item.sellingType}</td>
									<td>{item.sellerAgency?.name}</td>
									<td>{item.tourDate.split('T')[0] + item.tourTime}</td>
									<td>
										<div>
											<div>{item.tour.type.name}</div>
										</div>
									</td>
									<td>{item.adult}</td>
									<td>{item.child}</td>
									<td>{item.baby}</td>
									<td>{item.doubleCount}</td>
									<td>{item.singleCount}</td>
									<td>{item.ticketNumber}</td>
									<td>{paymentMethodsData.content.filter((el:any)=>el.id==item.paymentMethodId)[0].name} - {item.currency}</td>
									<td>{item.price}</td>
									<td>{item.paid}</td>
									<td>{(item.price - item.paid)}</td>
									<td>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											icon='Print'
											onClick={()=>handleUpcomingPrint(item)}>
											
										</Button>
									</td>
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
										</Button>
									</td>
									<td>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											onClick={(event)=>handleWhatsapp(item, event)}>
											<PiWhatsappLogoBold/>
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


			{/* New Record Modal */}
			<Modal
					setIsOpen={setNewItemOffcanvas}
					isOpen={newItemOffcanvas}
					titleId='newRecordIncomingModal'
					isCentered
					isScrollable
					size='xl'>
					<ModalHeader setIsOpen={setNewItemOffcanvas}>
						<OffCanvasTitle id='newRecordIncomingTitle'> {postType=== 'update' ? 'Düzenle' : 'Yeni' } </OffCanvasTitle>
					</ModalHeader>
					<ModalBody>
					<form ref={newFormRef}  onSubmit={handleSubmit((data) => handleAction(data))}>
						<div className='row g-4'>
							<div className='col-6 col-md-4'>
						    <FormGroup id='sellingType' label='Satış Tipi' isFloating>
						        <Controller name="sellingType"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={sellingType.map((el) => ({
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
							 {errors.typeId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6 col-md-4'>
						    <FormGroup id='sellerAgencyId' label='Satıcı Acente' isFloating>
						        <Controller name="sellerAgencyId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={(watch('sellingType')=='office'? 
																		sellerCompany.filter((el: any) => el.id === 1):sellerCompany)
																		.map((el: any) => ({
																			value: el.id.toString(),
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
							 {errors.typeId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6 col-md-4'>
						    <FormGroup id='tourTypeId' label='Tur Adı' isFloating>
						        <Controller name="tourTypeId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={tourTypeData.content.map((el: any) => ({
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
							 {errors.typeId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6 col-md-4'>
						    <FormGroup id='tourId' label='Düzenleyen Acente' isFloating>
						        <Controller name="tourId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={filteredTourData.content.map((el: any) => ({
																			value: el.id,
																			text: el.agency.name,
																			label: el.agency.name,
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
							<div className='col-6 col-md-4'>
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
							</div>
							<div className='col-6 col-md-4'>
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
						 {errors.salesman && <span>Bu alan gerekli</span>}
						</div>
						<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
						    <FormGroup id='salesmanId' label='Satış Personeli' isFloating>
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
							 {errors.salesman && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-6 col-md-4'>
								<FormGroup id='currency' label='Birim' isFloating>
								<Controller name="currency"
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
								{errors.currency && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
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
							{watch('tourTypeId')!='6' && 	
							<div className='col-6 col-md-4'>
							<FormGroup  id='adult' label='Yetişkin'>
							<Controller name="adult"
	                                            control={control}
	                                            rules={{ required: true }}
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
							</div>}
							{watch('tourTypeId')!='6' && 	
							<div className='col-6 col-md-4'>
							<FormGroup  id='child' label='Çocuk'>
							<Controller name="child"
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
							</div>}
							{watch('tourTypeId')!='6' && 	
							<div className='col-6 col-md-4'>
							<FormGroup  id='baby' label='Bebek'>
							<Controller name="baby"
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
							</div>}
							{watch('tourTypeId')=='6' && 	
							<div className='col-6 col-md-4'>
							<FormGroup  id='singleCount' label='Atv Single'>
							<Controller name="singleCount"
	                                            control={control}
	                                            render={({ field }) => (
													<Input
													type='number'
													placeholder='Giriniz'
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div> }
							{	watch('tourTypeId')=='6' &&
							<div className='col-6 col-md-4'>
							<FormGroup  id='doubleCount' label='Atv Double'>
							<Controller name="doubleCount"
	                                            control={control}
	                                            render={({ field }) => (
													<Input
													type='number'
													placeholder='Giriniz'
													{...field}
												/>
                                                         )}
								/>
							</FormGroup>
							</div>}

							<DynamicFragments  control={control} errors={errors} fragments={fragments} setFragments={setFragments} setValue={setValue}  />

							<div className='col-6'>
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
							<div className='col-6 col-md-4'>
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
							{/* Media */}
							<div className='col-6 col-md-4'>
								<FormGroup id='isSold' isFloating>
								<Controller name="isSold"
                                            rules={{ required: false }}
                                             control={ control}
                                            render={({ field }) => (
												<Checks
												id='isSold'
												type='switch'
												label='Media istiyor'
												onChange={(e:any) => field.onChange(e.target.checked)} // Manually handle onChange
												checked={field.value} // Use field.value instead of {...field}
											/>
                                             )}
                                    />


								</FormGroup>
							</div>
							<div className='col-6 col-md-4'>
						    <FormGroup id='mediaType' label='Tipi' isFloating>
						        <Controller name="mediaType"
	                                            control={control}
	                                            rules={{ required: false }}
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
							
							<div className='col-6 col-md-4'>
							<FormGroup id='mediaPrice' label='Media Ücret' isFloating>
						        <Controller name="mediaPrice"
	                                            control={control}
	                                            rules={{ required: false }}
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
							<div className='col-6 col-md-4'>
							<FormGroup id='mediaPaid' label='Media Ödenen' isFloating>
						        <Controller name="mediaPaid"
	                                            control={control}
	                                            rules={{ required: false }}
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
							

						
							<div className='col-12'>
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
						</form>
					</ModalBody>
					<ModalFooter className='bg-transparent'>
						<Button
							color='info'
							type='button'
//							onClick={handleSubmit((data) => handleSaveAction(data))}
							onClick={handleExternalButtonClick}
 						className='w-100'
							>
							Kaydet
						</Button>
					</ModalFooter>
					
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
							<div className='col-5 col-md-4'>
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
							<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
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
							<div className='col-6 col-md-4'>
							<FormGroup id={`customerPhoneNumber${index +1}`} label='Müşteri Telefon' isFloating>
						        <Controller name={`customerPhoneNumber${index +1}`}
	                                            control={control}
	                                            rules={{ required: false }}
	                                            render={({ field }) => (
													<Input
													type='tel'
													/* mask='+90 (999) 999-9999' */
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
							</div>
							<div className='col-6 col-md-4'>
							<FormGroup id={`customerDateOfBirth${index +1}`} label='Müşteri Doğum Tarihi' isFloating>
						        <Controller name={`customerDateOfBirth${index +1}`}
	                                            control={control}
	                                            rules={{ required: false }}
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
