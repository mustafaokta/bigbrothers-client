import React, { FC } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import { priceFormat } from '../../../helpers/helpers';
import useDarkMode from '../../../hooks/useDarkMode';
import { demoPagesMenu } from '../../../menu';

type TStatus = 'Paid' | 'Pending' | 'Failed';
interface ITransactionsItemProps {
	id: number;
	date: string;
	status: TStatus;
	email: string;
	price: number;
	tax: number;
}
const TransactionsItem: FC<ITransactionsItemProps> = ({ date, status, email, price, tax }) => {
	const { darkModeStatus } = useDarkMode();

	const STATUS =
		(status === 'Paid' && 'success') ||
		(status === 'Pending' && 'warning') ||
		(status === 'Failed' && 'danger');
	return (
		<div className='col-12'>
			<div className='row'>
				<div className='col d-flex align-items-center'>
					<div className='flex-shrink-0'>
						<div
							style={{ width: 100 }}
							className={classNames(
								`bg-l${
									darkModeStatus ? 'o25' : '10'
								}-${STATUS} text-${STATUS} fw-bold py-2 rounded-pill me-3 text-center`,
							)}>
							{status}
						</div>
					</div>
					<div className='flex-grow-1'>
						<div className='fs-6'>{date}</div>
						<div className='text-muted'>
							<small>{email}</small>
						</div>
					</div>
				</div>
				<div className='col-auto text-end'>
					<div>
						<strong>{priceFormat(price)}</strong>
					</div>
					<div className='text-muted'>
						<small>Tax {priceFormat(tax)}</small>
					</div>
				</div>
			</div>
		</div>
	);
};

const CommonLatestTransActions = () => {
	const transactionsData: ITransactionsItemProps[] = [
		{
			id: 1,
			date: dayjs().format('ll'),
			status: 'Paid',
			email: 'john@facit.com',
			price: 34,
			tax: 7.6,
		},
		{
			id: 2,
			date: dayjs().add(-1, 'day').format('ll'),
			status: 'Pending',
			email: 'grace@facit.com',
			price: 24,
			tax: 5.4,
		},
		{
			id: 3,
			date: dayjs().add(-2, 'day').format('ll'),
			status: 'Paid',
			email: 'jane@facit.com',
			price: 75,
			tax: 18,
		},
		{
			id: 4,
			date: dayjs().add(-2, 'day').format('ll'),
			status: 'Paid',
			email: 'grace@facit.com',
			price: 43,
			tax: 9.2,
		},
		{
			id: 5,
			date: dayjs().add(-3, 'day').format('ll'),
			status: 'Failed',
			email: 'ryan@facit.com',
			price: 48,
			tax: 11,
		},
		{
			id: 6,
			date: dayjs().add(-3, 'day').format('ll'),
			status: 'Paid',
			email: 'sam@facit.com',
			price: 64,
			tax: 15.4,
		},
		{
			id: 7,
			date: dayjs().add(-3, 'day').format('ll'),
			status: 'Pending',
			email: 'ella@facit.com',
			price: 78,
			tax: 18,
		},
	];
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle>Latest Transactions</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						isLink
						icon='Summarize'
						tag='a'
						to={`../${demoPagesMenu.sales.subMenu.transactions.path}`}>
						All Transactions
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody isScrollable>
				<div className='row g-4'>
					{transactionsData.map((i) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<TransactionsItem key={i.id} {...i} />
					))}
				</div>
			</CardBody>
		</Card>
	);
};

export default CommonLatestTransActions;
