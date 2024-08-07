import React, { FC, useEffect, useState, useRef } from 'react';
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
import { listAgency, addAgency, updateAgency, deleteAgency } from '../../helpers/connections/admin';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import Spinner from '../../components/bootstrap/Spinner';
import ReactToPrint from 'react-to-print';



interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const Tours: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const componentRef = useRef<HTMLDivElement>(null);

	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const { user } = useUserContext();

	const [listData, setListData] = useState<any>({content:[]});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<null|string>(null);
	
	const [newItemOffcanvas, setNewItemOffcanvas] = useState<boolean>(false);
	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
	


	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	useEffect(() => {
		listAgency({ data : {} }, user.token!).then((res:any) => {
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
			}



reset(itemm);

setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);


	};

	const handleNewItem = () => {
	
		let itemm: { [key: string]: any }=	{
			"id":  0,
			"name": ""
					}
					reset(itemm);
		setNewItemOffcanvas(!newItemOffcanvas);
		
	};
	const handleNewAction = (post_data: any) => {
		let postData = post_data;

	addAgency ({ data: postData }, user.token!)
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


		updateAgency({ data: postData }, user.token!)
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
	/* 	deleteAgency({ data: postData}, user.token!)
			.then((res) => {
				setListData(res);
		})
		.catch((err:any) => {
			// console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		}); */
	}



	//let { items, requestSort, getClassNamesFor } = useSortableData(dataDummy);


	if (  isLoading   ) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if ( isError  ) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	let items= listData.content;
	return (
		<>
			{/* Page List */}
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Acente Listesi</CardTitle>
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
								<th>Acente Adı</th>
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
					<OffCanvasBody>
					<div className='row g-4'>
					
						    <div className='col-12'>
								<FormGroup id='name' label='Tur Adı' isFloating>
								<Controller name="name"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Tur Adı'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.name && <span>Bu alan gerekli</span>}
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
								<FormGroup id='name' label='Tur Adı' isFloating>
								<Controller name="name"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												placeholder='Tur Adı'
												{...field}
											/>
                                             )}
                                    />
								</FormGroup>
								{errors.name && <span>Bu alan gerekli</span>}
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
