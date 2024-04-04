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
import {
	OffCanvasBody,
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/bootstrap/Modal';
import { useUserContext } from '../../context/UserContext';
import { deleteHotel, updateHotel, addHotel, listHotel, addPayments, updatePayments, deletePayments, listPayments } from '../../helpers/connections/admin';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useDataAgency, useDataCurrency, useDataPaymentMethods, useDataRegions } from '../../helpers/connections/tour';
import Select from '../../components/bootstrap/forms/Select';
import Checks from '../../components/bootstrap/forms/Checks';
import Spinner from '../../components/bootstrap/Spinner';



interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const Payments: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const { user } = useUserContext();

	const [listData, setListData] = useState<any>({content:[]});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<null|string>(null);
	//const { data: regionData, isLoading: regionIsLoading, isError: regionIsError } = useDataRegions();
	const { data:paymentMethodsData, isLoading:paymentMethodsIsLoading, isError:paymentMethodIsError } = useDataPaymentMethods();
	const { data: agencyData, isLoading: agencyIsLoading, isError: agencyIsError } = useDataAgency();
	const { data: currencyData, isLoading: currencyIsLoading, isError: currencyIsError } = useDataCurrency();




	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);
	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);



	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	useEffect(() => {
		console.log('tekrar çalıştı');

		listPayments({ data : {} }, user.token!).then((res:any) => {
				setListData(res);
				setIsLoading(false);
				setIsError(null);
			}
			).catch((err) => {
			 				setIsError(err?.response?.data?.content);
				setIsLoading(false);
			});

		}, [newItemOffcanvas, upcomingEventsEditOffcanvas])



	const handleUpcomingEdit = (itm:any) => {

	let itemm: { [key: string]: any }=	{
	"id": itm.id,
    "paymentDate": itm.date.split('T')[0],
    "amount": itm.amount,
    "currencyId": itm.currency.id,
	"paymentMethodId": itm.paymentMethod.id,
	"paidToAgencyId": itm.paidToAgency.id,
	"status": itm.status,
	"note": itm.note,
			}



reset(itemm);

setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);


	};

	const handleNewItem = () => {
		let itemm: { [key: string]: any }=	{
			"id": 0,
			"paymentDate": "",
			"amount": "",
			"currencyId": "",
			"paymentMethodId": "",
			"paidToAgencyId": "",
			"status": false,
			"note": ""
					}
					reset(itemm);
		setNewItemOffcanvas(!newItemOffcanvas);

	};
	const handleNewAction = (post_data: any) => {
		let postData = post_data;
	console.log('post_data', postData);

	addPayments ({ data: postData }, user.token!)
			.then((res) => {
			//	toast.success(`Yeni tour kaydı oluşturuldu`);
				setNewItemOffcanvas(false)
			})
			.catch((err) => {
				console.log("error");
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleEditAction = (post_data: any) => {
		let postData = post_data;


		updatePayments({ data: postData }, user.token!)
			.then((res) => {
			// 	toast.success(`Tur kaydı güncelleştirildi`);
				setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
			})
			.catch((err) => {
				console.log("error");
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};
	const handleDeleteAction = (postData: any) => {
		deletePayments({ data: postData}, user.token!)
			.then((res) => {
				setListData(res);
		})
		.catch((err:any) => {
			console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		});
	}



	//let { items, requestSort, getClassNamesFor } = useSortableData(dataDummy);


	if (  isLoading || paymentMethodsIsLoading || currencyIsLoading  ) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if ( isError || paymentMethodIsError || currencyIsError  ) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	let items= listData.content;
	if(paymentMethodsData.content.length==4){
		paymentMethodsData.content.push({id:5, name:'Çek'});

	}


	return (
		<>
			{/* Page List */}
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Ödemelerim</CardTitle>
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
								<th>Tarih</th>
								<th>Miktar</th>
								<th>Birim</th>
								<th>Ödeme Tipi</th>
								<th>Ödenen Firma</th>
								<th>Durum</th>
								<th>Not</th>
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

											aria-label='Detailed information'
										/>
									</td>
									<td>{item.date}</td>
									<td>{item.amount}</td>
									<td>{item.currency.label}</td>
									<td>{item.paymentMethod.name}</td>
									<td>{item.paidToAgency.name}</td>
									<td>{item.status? 'Ödendi':'Ödenmedi'}</td>
									<td>{item.note}</td>
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
											Düzenle
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


			{/* Edit Modal */}
			<Modal
					setIsOpen={setUpcomingEventsEditOffcanvas}
					isOpen={upcomingEventsEditOffcanvas}
					titleId='newRecordIncomingModal'
					isCentered
					isScrollable
					size='xl'>
					<ModalHeader setIsOpen={setUpcomingEventsEditOffcanvas}>
						<OffCanvasTitle id='newRecordIncomingTitle'>Kayıt Düzenle</OffCanvasTitle>
					</ModalHeader>
				<form onSubmit={handleSubmit((data) => handleEditAction(data))}>
					<ModalBody>
					<div className='row g-4'>
							<div className='col-2'>
								<FormGroup id='paymentDate' label='Ödeme Tarihi' isFloating>
									<Controller name="paymentDate"
													control={control}
													rules={{ required: true }}
													render={({ field }) => (
														<Input
													placeholder='Ödeme Tarihi'
													type='date'
													{...field}
												/>
															 )}
									/>
								</FormGroup>
							</div>
							<div className='col-2'>
								<FormGroup id='status' isFloating>
								<Controller name="status"
                                            rules={{ required: false }}
                                             control={ control}
                                            render={({ field }) => (
												<Checks
												id='status'
												type='switch'
												label='Ödeme Durumu'
												onChange={(e:any) => field.onChange(e.target.checked)} // Manually handle onChange
												checked={field.value} // Use field.value instead of {...field}
											/>
                                             )}
                                    />
								</FormGroup>
							</div>
						    <div className='col-4'>
								<FormGroup id='amount' label='Miktarı' isFloating>
								<Controller name="amount"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Miktarı'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.amount && <span>Bu alan gerekli</span>}
							</div>
							<div>
							<FormGroup id='currencyId' label='Birim' isFloating>
								<Controller name="currencyId"
                                            rules={{ required: true }}
                                             control={ control}
											 render={({ field }) => (
												<Select
												size='sm'
												placeholder='Seçiniz'
												ariaLabel='Seçiniz'
												list={currencyData.content.map((el: any) => ({
													value: el.id,
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
								{errors.currencyId && <span>Bu alan gerekli</span>}
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
							<div className='col-3'>
						    <FormGroup id='paidToAgencyId' label='Ödemeyi Alan' isFloating>
						        <Controller name="paidToAgencyId"
	                                            control={control}
	                                            rules={{ required: true }}
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
							 {errors.paidToAgencyId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-2'>
							<FormGroup id='note' label='Not' isFloating>
						        <Controller name="note"
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
						</div>
					</ModalBody>
					<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							type='submit'
							 >
							Kaydet
						</Button>
					</div>
				</div>
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
					<form onSubmit={handleSubmit((data) => handleNewAction(data))}>
					<ModalBody>
					<div className='row g-4'>
							<div className='col-2'>
								<FormGroup id='paymentDate' label='Ödeme Tarihi' isFloating>
									<Controller name="paymentDate"
													control={control}
													rules={{ required: true }}
													render={({ field }) => (
														<Input
													placeholder='Ödeme Tarihi'
													type='date'
													{...field}
												/>
															 )}
									/>
								</FormGroup>
							</div>
							<div className='col-2'>
								<FormGroup id='status' isFloating>
								<Controller name="status"
                                            rules={{ required: false }}
                                             control={ control}
                                            render={({ field }) => (
												<Checks
												id='status'
												type='switch'
												label='Ödeme Durumu'
												onChange={(e:any) => field.onChange(e.target.checked)} // Manually handle onChange
												checked={field.value} // Use field.value instead of {...field}
											/>
                                             )}
                                    />
								</FormGroup>
							</div>
						    <div className='col-4'>
								<FormGroup id='amount' label='Miktarı' isFloating>
								<Controller name="amount"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Miktarı'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.amount && <span>Bu alan gerekli</span>}
							</div>
							<div>
							<FormGroup id='currencyId' label='Birim' isFloating>
								<Controller name="currencyId"
                                            rules={{ required: true }}
                                             control={ control}
											 render={({ field }) => (
												<Select
												size='sm'
												placeholder='Seçiniz'
												ariaLabel='Seçiniz'
												list={currencyData.content.map((el: any) => ({
													value: el.id,
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
								{errors.currencyId && <span>Bu alan gerekli</span>}
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
							<div className='col-3'>
						    <FormGroup id='paidToAgencyId' label='Ödemeyi Alan' isFloating>
						        <Controller name="paidToAgencyId"
	                                            control={control}
	                                            rules={{ required: true }}
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
							 {errors.paidToAgencyId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-2'>
							<FormGroup id='note' label='Not' isFloating>
						        <Controller name="note"
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
						</div>
					</ModalBody>
					<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							type='submit'
							 >
							Kaydet
						</Button>
					</div>
				</div>
					</form>
			</Modal>
		</>
	);
};







export default Payments;
