import React, { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Chart, { IChartOptions } from '../../../../components/extras/Chart';

const ColumnDistributed = () => {
	const colors: string[] = [
		String(process.env.NEXT_PUBLIC_PRIMARY_COLOR),
		String(process.env.NEXT_PUBLIC_SECONDARY_COLOR),
		String(process.env.NEXT_PUBLIC_SUCCESS_COLOR),
		String(process.env.NEXT_PUBLIC_INFO_COLOR),
		String(process.env.NEXT_PUBLIC_WARNING_COLOR),
		String(process.env.NEXT_PUBLIC_DANGER_COLOR),
		'#26a69a',
		'#D10CE8',
	];
	const [columnDistributed] = useState<IChartOptions>({
		series: [
			{
				data: [21, 22, 10, 28, 16, 21, 13, 30],
			},
		],
		options: {
			tooltip: { theme: 'dark' },
			chart: {
				height: 350,
				type: 'bar',
				events: {
					click() {
						// console.log(chart, w, e);
					},
				},
			},
			colors,
			plotOptions: {
				bar: {
					columnWidth: '45%',
					distributed: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			xaxis: {
				categories: [
					['John', 'Doe'],
					['Joe', 'Smith'],
					['Jake', 'Williams'],
					'Amber',
					['Peter', 'Brown'],
					['Mary', 'Evans'],
					['David', 'Wilson'],
					['Lily', 'Roberts'],
				],
				labels: {
					style: {
						colors,
						fontSize: '12px',
					},
				},
			},
		},
	});
	return (
		<div className='col-lg-6'>
			<Card stretch>
				<CardHeader>
					<CardLabel icon='BarChart'>
						<CardTitle>
							type <small>bar</small>
						</CardTitle>
						<CardSubTitle>Chart</CardSubTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<Chart
						series={columnDistributed.series}
						options={columnDistributed.options}
						type='bar'
						height={350}
					/>
				</CardBody>
			</Card>
		</div>
	);
};

export default ColumnDistributed;
