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
import MixedLineColumnArea from '../_examples/chart-mixed/MixedLineColumnArea';
import MixedLineArea from '../_examples/chart-mixed/MixedLineArea';
import MixedMultipleYAxis from '../_examples/chart-mixed/MixedMultipleYAxis';
import MixedLineScatter from '../_examples/chart-mixed/MixedLineScatter';
import MixedLineColumn from '../_examples/chart-mixed/MixedLineColumn';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsMixed.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Mixed', to: '/charts/mixed' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-mixed--mixed-line-column' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<MixedLineColumn />
					<MixedMultipleYAxis />

					<MixedLineArea />
					<MixedLineColumnArea />

					<MixedLineScatter />
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
