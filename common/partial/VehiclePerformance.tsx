import React, { FC, useEffect, useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import dayjs from 'dayjs';
import Icon from '../../components/icon/Icon';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import { ApexOptions } from 'apexcharts';
import useDarkMode from '../../hooks/useDarkMode';
import { demoPagesMenu } from '../../menu';
import classNames from 'classnames';
import Chart from '../../components/extras/Chart';
import Badge from '../../components/bootstrap/Badge';
import data from '../data/dummyProductData';
import Link from 'next/link';
import { postVehiclePerformance } from '../../helpers/connections/transfer';
import { useUserContext } from '../../context/UserContext';
import Spinner from '../../components/bootstrap/Spinner';

interface ITableRowProps {
	id: string;
	image: string;
	name: string;
	category: string;
	series: ApexOptions['series'];
	color: string;
	stock: string;
	price: string;
	store: string;
}
const TableRow: FC<any> = ({
	id,
capacity ,
model,
plate, 
transfer,
type, 
totalDistance
}) => {
	const { darkModeStatus } = useDarkMode();
	const dummyOptions: ApexOptions = {
		colors: ['#fff'],
		chart: {
			type: 'line',
			width: 100,
			height: 35,
			sparkline: {
				enabled: true,
			},
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false,
			},
			x: {
				show: false,
			},
			y: {
				title: {
					formatter(seriesName: string) {
						return '';
					},
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
	};
	return (
		<tr>
			<th scope='row'>{plate}</th>
	{/* 		<td>
					<img src={image} alt='' width={54} height={54} />
			</td> */}
			<td>
					<div
						className={classNames('fw-bold', {
							'link-dark': !darkModeStatus,
							'link-light': darkModeStatus,
						})}>
						{model}
					</div>
					<div className='text-muted'>
						<small>{type}</small>
					</div>
			</td>
			<td>
			{totalDistance}
				{/* <Chart
					series={series}
					options={dummyOptions}
					type={dummyOptions.chart?.type}
					height={dummyOptions.chart?.height}
					width={dummyOptions.chart?.width}
				/> */}
			</td>
			<td>
				<span>{capacity}</span>
			</td>
			<td>
				<span>
					{
						// @ts-ignore
				/* 		price.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						}) */
						transfer[0].driver.user.name+ ' '+ transfer[0].driver.user.surname
					}
				</span>
			</td>
			<td className='h5'>
				<Badge
					color={
						'info'
					}>
					{transfer.length}
				</Badge>
			</td>
		</tr>
	);
};


const VehiclePerformance = () => {



	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['3']);
	const { user } = useUserContext();
 const [listData, setListData] = useState<any>({content:[]});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<null|string>(null);
useEffect(() => {
	postVehiclePerformance({ data: {} }, user.token!).then((res: any) => {
	console.log('res', res);
	
		setListData(res);
		setIsLoading(false);
	});
}
, [listData.length, user.token]);
	
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
	let items = listData.content.filter((i:any) => i.transfer.length > 0);
	return (
		<Card>
			<CardHeader>
				<CardLabel icon='Storefront' iconColor='info'>
					<CardTitle tag='h4' className='h5'>
						Araç Performans 
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='table-responsive'>
				<table className='table table-modern table-hover'>
					<thead>
						<tr>
							<th scope='col'>Plaka</th>
							<th scope='col'>Cins</th>
							<th scope='col'>Toplam Mesafe</th>
							<th scope='col'>Kapasite</th>
							<th scope='col'>Şoför</th>
							<th scope='col'>Transfer Sayısı</th>
							
						</tr>
					</thead>
					<tbody>
						{dataPagination(items, currentPage, perPage).map((i) => (
							// eslint-disable-next-line react/jsx-props-no-spreading
							<TableRow key={i.id} {...i} />
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
	);
};

export default VehiclePerformance;
