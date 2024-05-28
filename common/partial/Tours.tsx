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
	OffCanvasBody,
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/bootstrap/Modal';
import { useUserContext } from '../../context/UserContext';
import { postAddTour,deleteTours, useDataTourType,useDataAgency, postUpdateTour, listTour } from '../../helpers/connections/tour';
import Select from '../../components/bootstrap/forms/Select';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import showNotification from '../../components/extras/showNotification';
import Spinner from '../../components/bootstrap/Spinner';
import ReactToPrint from 'react-to-print';




interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const Tours: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const { user } = useUserContext();
	const componentRef = useRef<HTMLDivElement>(null);


	const [tourData, setTourData] = useState<any>({content:[]});
	const [fragments, setFragments] = useState([{ id: 0 }]); // Initial fragment


	//const { data: regionData, isLoading: regionIsLoading, isError: regionIsError } = useDataRegions();
	const { data: agencyData, isLoading: agencyIsLoading, isError: agencyIsError } = useDataAgency();
	const { data : typeData, isLoading: typeIsLoading, isError: typeIsError } = useDataTourType();
	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);
	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
	const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
	const [displayPeriodQuantity, setDisplayPeriodQuantity] = useState(0);

	useEffect(() => {

			listTour({ data : {} }, user.token!).then((res:any) => {
						 setTourData(res);
			}
			);
		}, [newItemOffcanvas, upcomingEventsEditOffcanvas])



if (!typeIsLoading || !typeIsError) {
}



if (!agencyIsLoading || !agencyIsError) {
}



	const handleUpcomingEdit = (itm:any) => {
		setFragments(itm.tourPeriodPrices.length>0?itm.tourPeriodPrices:[{ id: 0 }]);

	let itemm: { [key: string]: any }=	{
	"id": itm.id,
    "typeId":itm.typeId.toString(),
    "price": itm.price,
	"halfPrice": itm.halfPrice,
    "unit": itm.unit,
    "note": itm.note,
    "agencyId": itm.agencyId.toString(),
			}

for (let i = 0; i < itm.tourPeriodPrices.length; i++) {

let id=itm.tourPeriodPrices[i][`id`];

 	itemm[`name${id}`] =  itm.tourPeriodPrices[i].periodName;
 	itemm[`periodId${id}`] =  id;
 	itemm[`periodStart${id}`] = itm.tourPeriodPrices[i].periodStart.split('T')[0];
 	itemm[`periodEnd${id}`] = itm.tourPeriodPrices[i].periodEnd.split('T')[0];
 	itemm[`priceAdult${id}`] = itm.tourPeriodPrices[i].price;
 	itemm[`priceChild${id}`] = itm.tourPeriodPrices[i].halfPrice;

}


reset(itemm);

setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);


	};

	const handleNewItem = () => {

		let itemm: { [key: string]: any }=	{
			"id":  0,
			"typeId": "",
			"price": "",
			"halfPrice": "",
			"unit": "",
			"note": "",
			"agencyId": "",
					}
					reset(itemm);
					setFragments([{ id: 0 }]);
		setNewItemOffcanvas(!newItemOffcanvas);

	};


	const handleDeleteAction = (postData: any) => {
		deleteTours({ data: postData}, user.token!)
	   .then((res) => {
		listTour({ data : {} }, user.token!).then((res:any) => {
			setTourData(res);
}
);

	})
		.catch((err:any) => {
			console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		});
	}


	const handleNewAction = (post_data: any) => {
		let postData = post_data;

		postAddTour({ tour: postData }, user.token!)
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
		console.clear()
	console.log('post_data', postData);

		postUpdateTour({ tour: postData }, user.token!)
			.then((res) => {
			// 	toast.success(`Tur kaydı güncelleştirildi`);
				setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
			})
			.catch((err) => {
				console.log("error");
			//	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
			});
	};

    const currency = [
    		 		{ value: 'TRY', label: 'TL' },
    		 		{ value: 'USD', label: 'Dolar' },
			 		{ value: 'EUR', label: 'Euro' },
			 		{ value: 'GBP', label: 'Sterlin' },

	]


	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	//let { items, requestSort, getClassNamesFor } = useSortableData(dataDummy);


	if (  typeIsLoading  || agencyIsLoading  ) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if ( typeIsError  || agencyIsError) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	let items= tourData.content;
	return (
		<>
			{/* Page List */}
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Tur Listesi</CardTitle>
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
								<th>Tur Adı</th>
								<th>Düzenleyen Acenta</th>
								<th>Fiyat (Çocuk)</th>
								<th>Fiyat (Yetişkin)</th>
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

									<td>{typeData.content.filter((el:any)=>el.id==item.typeId)[0].name }</td>
									<td>{agencyData.content.filter((el:any)=>el.id===item.agencyId)[0].name }</td>
									<td>{item.halfPrice} {item.unit}</td>
									<td>{item.price} {item.unit}</td>
									<td></td>

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
					<OffCanvasBody>
					<div className='row g-4'>
						    <div className='col-6'>
						    <FormGroup id='typeId' label='Tur Adı' isFloating>
						        <Controller name="typeId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Tur Adı'
																		ariaLabel='Tur Adı'
																		list={typeData.content.map((el: any) => ({
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
							<div className='col-6'>
								<FormGroup id='agencyId' label='Düzenleyen Acenta' isFloating>
									<Controller name="agencyId"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Select
												size='sm'
												placeholder='Acenta'
												ariaLabel='Acenta'
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
								{errors.agencyId && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-6'>
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

							<div className='col-5'>
								<FormGroup id='price' label='Fiyat (Yetişkin)' isFloating>
								<Controller name="price"
                                            rules={{ required: true}}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												type='number'
												placeholder='Fiyat (Yetişkin)'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.price && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-5'>
								<FormGroup id='halfPrice' label='Fiyat (Çocuk)' isFloating>
								<Controller name="halfPrice"
                                            rules={{ required: true}}
											control={ control}
                                            render={({ field }) => (
												<Input
												type='number'
												placeholder='Fiyat (Çocuk)'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.price && <span>Bu alan gerekli</span>}
							</div>


							<DynamicFragments  control={control} errors={errors} fragments={fragments} setFragments={setFragments}  />


							<div className='col-12'>
								<FormGroup id='note' label='Not' isFloating>
								<Controller name="note"
                                            rules={{maxLength: 100}}
                                             control={ control}
                                            render={({ field }) => (
												<Input
													placeholder='Not'
												{...field}
												/>
                                             )}
                                    />
								</FormGroup>
								{errors.note && <span>Bu alan gerekli</span>}
							</div>
						</div>
					</OffCanvasBody>
					<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							type='submit'
							 >
							Save
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
						    <div className='col-6'>
						    <FormGroup id='typeId' label='Tur Adı' isFloating>
						        <Controller name="typeId"
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
						                                                <Select
																		size='sm'
																		placeholder='Tur Adı'
																		ariaLabel='Tur Adı'
																		list={typeData.content.map((el: any) => ({
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
							<div className='col-6'>
								<FormGroup id='agencyId' label='Düzenleyen Acenta' isFloating>
									<Controller name="agencyId"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Select
												size='sm'
												placeholder='Acenta'
												ariaLabel='Acenta'
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
								{errors.agencyId && <span>Bu alan gerekli</span>}

							</div>
							<div className='col-6'>
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

							<div className='col-5'>
								<FormGroup id='price' label='Fiyat (Yetişkin)' isFloating>
								<Controller name="price"
                                            rules={{ required: true}}
											control={ control}
                                            render={({ field }) => (
												<Input
												type='number'
												placeholder='Fiyat (Yetişkin)'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.price && <span>Bu alan gerekli</span>}
							</div>
							<div className='col-5'>
								<FormGroup id='halfPrice' label='Fiyat (Çocuk)' isFloating>
								<Controller name="halfPrice"
                                            rules={{ required: true}}
											control={ control}
                                            render={({ field }) => (
												<Input
												type='number'
												placeholder='Fiyat (Çocuk)'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.price && <span>Bu alan gerekli</span>}
							</div>


							<DynamicFragments  control={control} errors={errors} fragments={fragments} setFragments={setFragments}  />


							<div className='col-12'>
								<FormGroup id='note' label='Not' isFloating>
								<Controller name="note"
                                            rules={{maxLength: 100}}
                                             control={ control}
                                            render={({ field }) => (
												<Input
													placeholder='Not'
												{...field}
												/>
                                             )}
                                    />
								</FormGroup>
								{errors.note && <span>Bu alan gerekli</span>}
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


const DynamicFragments = ({ control, errors, isDisabled=false, fragments, setFragments} :any ) => {

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
			//console.log(fragments.length, 'fragments', fragments);
			const confirmation = window.confirm('Silmek istediğinizden emin misiniz?'); // Tarayıcı standart onay kutusu

			if (confirmation) {
			    setFragments((prev:any[]) => prev.filter(fragment => fragment.id !== id));
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

	{!isDisabled &&<div className='col-2'><Icon icon='DataSaverOn' className='me-2' size='2x' onClick={addFragment} />Dönem Ekle</div>}

		{fragments.map((fragment: any, index: number) => (
			fragment.id !== 0 &&
		  <React.Fragment key={fragment.id} >
			<div className='col-2'>
								<FormGroup id={`name${fragment.id}`} label='Dönem Adı' isFloating>
								<Controller name={`name${fragment.id}`}
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												disabled={isDisabled}
												placeholder='Dönem Adı'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors[`name${fragment.id}`] && <span>Bu alan gerekli</span>}
							</div>
			<div className='col-2'>
							<FormGroup id={`periodStart${fragment.id}`} label='Başlangıç Tarih' isFloating>
						        <Controller name={`periodStart${fragment.id}`}
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
													disabled={isDisabled}
												placeholder='Başlangıç Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
			</div>
			<div className='col-2'>
							<FormGroup id={`periodEnd${fragment.id}`} label='Bitiş Tarih' isFloating>
						        <Controller name={`periodEnd${fragment.id}`}
	                                            control={control}
	                                            rules={{ required: true }}
	                                            render={({ field }) => (
													<Input
													disabled={isDisabled}
												placeholder='Bitiş Tarihi'
												type='date'
												{...field}
											/>
                                                         )}
								/>
							</FormGroup>
			</div>
			  <div className='col-2'>
				<FormGroup id={`priceAdult${fragment.id}`} label='Fiyat (Yetişkin)' isFloating>
				  <Controller name={`priceAdult${fragment.id}`}
                                            rules={{ required: true}}
											control={control}
							  render={({ field }) => (
								<Input
								type='number'
								disabled={isDisabled}
								placeholder='Fiyat (Yetişkin)'
								{...field}
							  />
							  )}
				  />
				  {errors[`priceAdult${fragment.id}`] && <span>Bu alan gerekli</span>}
				</FormGroup>
			  </div>
			  <div className='col-2'>
				<FormGroup id={`priceChild${fragment.id}`} label='Fiyat (Çocuk)' isFloating>
				  <Controller name={`priceChild${fragment.id}`}
                                            rules={{ required: true}}
											control={control}
							  render={({ field }) => (
								<Input
								type='number'
								disabled={isDisabled}
								placeholder='Fiyat (Yetişkin)'
								{...field}
							  />
							  )}
				  />
				  {errors[`priceChild${fragment.id}`] && <span>Bu alan gerekli</span>}
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





export default Tours;
