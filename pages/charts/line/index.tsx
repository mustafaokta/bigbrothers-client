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
import LineZoomableTimeSeries from '../_examples/chart-line/LineZoomableTimeSeries';
import LineStep from '../_examples/chart-line/LineStep';
import LineRealtime from '../_examples/chart-line/LineRealtime';
import LineWithMissingData from '../_examples/chart-line/LineWithMissingData';
import LineWithAnnotations from '../_examples/chart-line/LineWithAnnotations';
import LineBasic from '../_examples/chart-line/LineBasic';
import LineDashed from '../_examples/chart-line/LineDashed';
import LineBrush from '../_examples/chart-line/LineBrush';
import LineSyncingOptions from '../_examples/chart-line/LineSyncingOptions';
import LineWithLabel from '../_examples/chart-line/LineWithLabel';
import LineGradient from '../_examples/chart-line/LineGradient';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsLine.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Line', to: '/charts/line' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-line--line-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<LineBasic />
					<LineWithLabel />

					<LineZoomableTimeSeries />
					<LineWithAnnotations />

					<LineSyncingOptions />
					<LineBrush />

					<LineStep />
					<LineGradient />

					<LineRealtime />
					<LineDashed />

					<LineWithMissingData />
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
