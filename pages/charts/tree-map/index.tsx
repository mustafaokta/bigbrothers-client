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
import TreeMapBasic from '../_examples/chart-tree-map/TreeMapBasic';
import TreeMapColorRange from '../_examples/chart-tree-map/TreeMapColorRange';
import TreeMapMultipleSeries from '../_examples/chart-tree-map/TreeMapMultipleSeries';
import TreeMapDistributed from '../_examples/chart-tree-map/TreeMapDistributed';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsTreeMap.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Tree Map', to: '/charts/tree-map' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-treemap--tree-map-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<TreeMapBasic />
					<TreeMapMultipleSeries />

					<TreeMapColorRange />
					<TreeMapDistributed />
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
