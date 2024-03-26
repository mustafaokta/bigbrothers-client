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
import { deleteHotel, updateHotel, addHotel, listHotel } from '../../helpers/connections/admin';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useDataRegions } from '../../helpers/connections/tour';
import Select from '../../components/bootstrap/forms/Select';



interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const Tours: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const { user } = useUserContext();

	const [listData, setListData] = useState<any>({content:[]});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<null|string>(null);
	const { data: regionData, isLoading: regionIsLoading, isError: regionIsError } = useDataRegions();
	
	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);
	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
	


	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	useEffect(() => {
		console.log('tekrar çalıştı');

		listHotel({ data : {} }, user.token!).then((res:any) => {
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
    "name": itm.name,
    "address": itm.address,
    "regionId": itm.region.id,
	"contactPhone": itm.contactInformation.emergencyContactPhone,
	"contactEmail": itm.contactInformation.emergencyContactEmail,
	"contactPerson": itm.contactInformation.emergencyContactFullName,
			}



reset(itemm);

setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);


	};

	const handleNewItem = () => {
	
		let itemm: { [key: string]: any }=	{
			"id":  0,
			"name": "",
			"address": "",
			"regionId": "",
			"contactPhone": "",
			"contactEmail": "",
			"contactPerson": "",
			 
					}
					reset(itemm);
		setNewItemOffcanvas(!newItemOffcanvas);
		
	};
	const handleNewAction = (post_data: any) => {
		let postData = post_data;
	console.log('post_data', postData);

	addHotel ({ data: postData }, user.token!)
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


		updateHotel({ data: postData }, user.token!)
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
		deleteHotel({ data: postData}, user.token!)
			.then((res) => {
				setListData(res);
		})
		.catch((err:any) => {
			console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		});
	}



	//let { items, requestSort, getClassNamesFor } = useSortableData(dataDummy);


	if (  isLoading   ) return <div className="flex flex-col w-full">YÜKLENİYOR....</div>;
	if ( isError  ) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	let items= listData.content;
	return (
		<>
			{/* Page List */}
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Otel Listesi</CardTitle>
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
								<th>Otel Adı</th>
								<th>Adres</th>
								<th>Bölge</th>
								<th>İletişim Telefonu</th>
								<th>İletişim E-posta</th>
								<th>İletişim Personel</th>
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
									<td>{item.name}</td>
									<td>{item.address}</td>
									<td>{item.region.name}</td>
									<td>{item.contactInformation.emergencyContactPhone}</td>
									<td>{item.contactInformation.emergencyContactEmail}</td>
									<td>{item.contactInformation.emergencyContactFullName}</td>
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
					
						    <div className='col-12'>
								<FormGroup id='name' label='Otel Adı' isFloating>
								<Controller name="name"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Otel Adı'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.name && <span>Bu alan gerekli</span>}
							</div>
							<div>
							<FormGroup id='address' label='Adres' isFloating>
								<Controller name="address"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Adres'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.address && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-4'>
						    <FormGroup id='regionId' label='Bölge' isFloating>
						        <Controller name="regionId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={regionData.content.map((el: any) => ({
																			value: el.id.toString(),
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
							 {errors.regionId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
								<FormGroup id='contactPhone' label='İletişim Telefonu' isFloating>
								<Controller name="contactPhone"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												type='tel'
												mask='+90 (999) 999-9999'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.name && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
								<FormGroup id='contactEmail' label='İletişim E-posta' isFloating>
								<Controller name="contactEmail"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='İletişim E-posta'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.contactEmail && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
								<FormGroup id='contactPerson' label='İletişim Personel' isFloating>
								<Controller name="contactPerson"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='İletişim Personel'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.contactPerson && <span>Bu alan gerekli</span>}
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
					
						    <div className='col-12'>
								<FormGroup id='name' label='Otel Adı' isFloating>
								<Controller name="name"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Otel Adı'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.name && <span>Bu alan gerekli</span>}
							</div>
							<div>
							<FormGroup id='address' label='Adres' isFloating>
								<Controller name="address"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Adres'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.address && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-4'>
						    <FormGroup id='regionId' label='Bölge' isFloating>
						        <Controller name="regionId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Seçiniz'
																		ariaLabel='Seçiniz'
																		list={regionData.content.map((el: any) => ({
																			value: el.id.toString(),
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
							 {errors.regionId && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
								<FormGroup id='contactPhone' label='İletişim Telefonu' isFloating>
								<Controller name="contactPhone"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												type='tel'
												mask='+90 (999) 999-9999'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.name && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
								<FormGroup id='contactEmail' label='İletişim E-posta' isFloating>
								<Controller name="contactEmail"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='İletişim E-posta'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.contactEmail && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-12'>
								<FormGroup id='contactPerson' label='İletişim Personel' isFloating>
								<Controller name="contactPerson"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='İletişim Personel'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.contactPerson && <span>Bu alan gerekli</span>}
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







export default Tours;
