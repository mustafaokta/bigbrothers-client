import React, { FC, HTMLAttributes, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
import Mounted from '../Mounted';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

interface IChartProps extends HTMLAttributes<HTMLDivElement> {
	series: ApexOptions['series'];
	options: ApexOptions;
	type?: ApexChart['type'];
	width?: string | number;
	height?: string | number;
	className?: string;
}
const Chart: FC<IChartProps> = ({ series, options, type, width, height, className, ...props }) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('apex-chart', className)} {...props}>
			<Mounted>
				<ReactApexChart
					options={{
						colors: [
							String(process.env.NEXT_PUBLIC_PRIMARY_COLOR),
							String(process.env.NEXT_PUBLIC_SECONDARY_COLOR),
							String(process.env.NEXT_PUBLIC_SUCCESS_COLOR),
							String(process.env.NEXT_PUBLIC_INFO_COLOR),
							String(process.env.NEXT_PUBLIC_WARNING_COLOR),
							String(process.env.NEXT_PUBLIC_DANGER_COLOR),
						],
						plotOptions: {
							candlestick: {
								colors: {
									upward: String(process.env.NEXT_PUBLIC_SUCCESS_COLOR),
									downward: String(process.env.NEXT_PUBLIC_DANGER_COLOR),
								},
							},
							boxPlot: {
								colors: {
									upper: String(process.env.NEXT_PUBLIC_SUCCESS_COLOR),
									lower: String(process.env.NEXT_PUBLIC_DANGER_COLOR),
								},
							},
						},
						...options,
					}}
					series={series}
					// @ts-ignore
					type={type}
					width={width}
					height={height}
				/>
			</Mounted>
		</div>
	);
};
Chart.propTypes = {
	// @ts-ignore
	series: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.shape({
				name: PropTypes.string,
				data: PropTypes.arrayOf(
					PropTypes.oneOfType([
						PropTypes.string,
						PropTypes.number,
						PropTypes.arrayOf(
							PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
						),
						PropTypes.shape({
							x: PropTypes.oneOfType([
								PropTypes.string,
								PropTypes.number,
								PropTypes.arrayOf(
									PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
								),
								PropTypes.object,
							]),
							y: PropTypes.oneOfType([
								PropTypes.string,
								PropTypes.number,
								PropTypes.arrayOf(
									PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
								),
								PropTypes.object,
							]),
						}),
					]),
				),
			}),
		]),
	).isRequired,
	// @ts-ignore
	options: PropTypes.shape({
		// eslint-disable-next-line react/forbid-prop-types
		annotations: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		chart: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		colors: PropTypes.array,
		// eslint-disable-next-line react/forbid-prop-types
		dataLabels: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		fill: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		grid: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		labels: PropTypes.array,
		// eslint-disable-next-line react/forbid-prop-types
		legend: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		markers: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		noData: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		plotOptions: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		responsive: PropTypes.array,
		// eslint-disable-next-line react/forbid-prop-types
		series: PropTypes.array,
		// eslint-disable-next-line react/forbid-prop-types
		states: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		stroke: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		subtitle: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		theme: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		title: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		tooltip: PropTypes.object,
		// eslint-disable-next-line react/forbid-prop-types
		xaxis: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		// eslint-disable-next-line react/forbid-prop-types
		yaxis: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	}).isRequired,
	type: PropTypes.oneOf([
		'line',
		'area',
		'bar',
		'pie',
		'donut',
		'scatter',
		'bubble',
		'heatmap',
		'radialBar',
		'rangeBar',
		'candlestick',
		'boxPlot',
		'radar',
		'polarArea',
	]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
};
Chart.defaultProps = {
	type: 'line',
	width: '100%',
	height: 'auto',
	className: undefined,
};

/**
 * For use useState
 */
export interface IChartOptions extends Record<string, any> {
	series: ApexOptions['series'];
	options: ApexOptions;
}

export default memo(Chart);
