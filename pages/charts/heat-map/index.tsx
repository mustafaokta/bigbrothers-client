import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { componentPagesMenu } from '../../../menu';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import CommonStoryBtn from '../../../common/partial/other/CommonStoryBtn';
import HeatMapMultipleColors from '../_examples/chart-heat-map/HeatMapMultipleColors';
import HeatMapRounded from '../_examples/chart-heat-map/HeatMapRounded';
import HeatMapMultipleSeries from '../_examples/chart-heat-map/HeatMapMultipleSeries';
import HeatMapColorRange from '../_examples/chart-heat-map/HeatMapColorRange';
import HeatMapBasic from '../_examples/chart-heat-map/HeatMapBasic';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsHeatMap.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Heat Map', to: '/charts/heat-map' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-heatmap--heat-map-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<HeatMapBasic />
					<HeatMapMultipleColors />

					<HeatMapMultipleSeries />
					<HeatMapColorRange />

					<HeatMapRounded />
				</div>
			</Page>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Index;
