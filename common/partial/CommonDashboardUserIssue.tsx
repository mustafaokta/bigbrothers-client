import React, { useEffect, useState } from 'react';
import { Calendar as DatePicker } from 'react-date-range';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Todo, { ITodoListItem } from '../../components/extras/Todo';
import Label from '../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../components/bootstrap/forms/Checks';
import Badge from '../../components/bootstrap/Badge';
import Progress from '../../components/bootstrap/Progress';
import { TColor } from '../../type/color-type';
import { listPayments } from '../../helpers/connections/admin';
import { useUserContext } from '../../context/UserContext';
import Spinner from '../../components/bootstrap/Spinner';

const CommonDashboardUserIssue = () => {
	const TODO_BADGES: {
		[key: string]: {
			text: string;
			color?: TColor;
		};
	} = {
		ODENDI: { text: 'Ödendi', color: 'success' },
		GELECEK: { text: 'Gelecek', color: 'info' },
		YAKLASAN: { text: 'Yaklaşan', color: 'warning' },
		BILGI: { text: 'Bilgi', color: 'info' },
		GECMIS: { text: 'Geçmiş', color: 'danger' },
		KONTROL: { text: 'Kontrol', color: 'primary' },
		ODENMEDI: { text: 'Ödenmedi', color: 'secondary' },
	};
	const getBadgeWithText = (text: string): string => {
		return TODO_BADGES[
			// @ts-ignore
			Object.keys(TODO_BADGES).filter((key) => TODO_BADGES[key].text === text)
		];
	};



	/**
	 * Ann New To/Do func
	 * @param title
	 * @param date
	 * @param badge
	 */


	/**
	 * New To/Do Day
	 */
	const [date, setDate] = useState(new Date());
	const [listData, setListData] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<null|string>(null);
	const { user } = useUserContext();
	//const listLength = list.length;
	//const completeTaskLength = list.filter((i) => i.status).length;
	useEffect(() => {
	console.log('listPayments', user);
	if(user.token)
		listPayments({ data : {} }, user.token!).then((res:any) => {

				setListData(res.content.map((item:any) => {
				 					return {
						id: item.id,
						status: item.status,
						title: item.amount + ' ' + item.currency.label + '-' +item.paidToAgency.name + (item.note?(' ('+item.note+')'):''),
						date: new Date(item.date),
						badge: item.status ? TODO_BADGES.ODENDI: TODO_BADGES.ODENMEDI,
						payment:item.paymentMethod.name
					}
				}) );

				setIsLoading(false);
				setIsError(null);
			}
			).catch((err) => {
			 				setIsError(err?.response?.data?.content);
				setIsLoading(false);
			});

		}, [listData.length, user.token])




	if (  isLoading ) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
	if ( isError ) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;

	let items= listData.content;
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='AssignmentTurnedIn' iconColor='danger'>
					<CardTitle tag='h4' className='h5'>
						Ödemeler
					</CardTitle>
					<CardSubTitle>
						<Progress
							height={8}
							max={listData.length}
							value={listData.filter((i:any) => i.status).length}
							color={listData.filter((i:any) => i.status).length === listData.length ? 'success' : 'primary'}
						/>
					</CardSubTitle>
				</CardLabel>
			</CardHeader>
			<CardBody isScrollable>
				<Todo list={listData} setList={setListData} />
			</CardBody>
		</Card>
	);
};

export default CommonDashboardUserIssue;
