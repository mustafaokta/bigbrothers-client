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
import TimelineMultipleSeries from '../_examples/chart-timeline/TimelineMultipleSeries';
import TimelineBasic from '../_examples/chart-timeline/TimelineBasic';
import TimelineAdvanced from '../_examples/chart-timeline/TimelineAdvanced';
import TimelineDistributed from '../_examples/chart-timeline/TimelineDistributed';
import TimelineMultiSeries from '../_examples/chart-timeline/TimelineMultiSeries';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsTimeline.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Timeline', to: '/charts/timeline' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-timeline--timeline-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<TimelineBasic />
					<TimelineDistributed />

					<TimelineMultiSeries />
					<TimelineAdvanced />

					<TimelineMultipleSeries />
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
