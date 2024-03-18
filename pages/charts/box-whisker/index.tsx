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
import BoxWhiskerBoxPlotScatter from '../_examples/chart-boxWhisker/BoxWhiskerBoxPlotScatter';
import BoxWhiskerBasic from '../_examples/chart-boxWhisker/BoxWhiskerBasic';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsBoxWhisker.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Box Whisker', to: '/charts/box-whisker' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-box-whisker--box-whisker-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<BoxWhiskerBasic />
					<BoxWhiskerBoxPlotScatter />
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
