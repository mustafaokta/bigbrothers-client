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
import ColumnWithNegativeValues from '../_examples/chart-columns/ColumnWithNegativeValues';
import ColumnWithRotatedLabel from '../_examples/chart-columns/ColumnWithRotatedLabel';
import ColumnDistributed from '../_examples/chart-columns/ColumnDistributed';
import ColumnStacked100 from '../_examples/chart-columns/ColumnStacked100';
import ColumnWithDataLabels from '../_examples/chart-columns/ColumnWithDataLabels';
import ColumnBasic from '../_examples/chart-columns/ColumnBasic';
import ColumnStacked from '../_examples/chart-columns/ColumnStacked';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsColumn.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Column', to: '/charts/column' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-column--column-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<ColumnBasic />
					<ColumnWithDataLabels />

					<ColumnStacked />
					<ColumnStacked100 />

					<ColumnWithRotatedLabel />
					<ColumnWithNegativeValues />

					{/* TODO */}
					{/* <ColumnDynamicData /> */}
					<ColumnDistributed />
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
