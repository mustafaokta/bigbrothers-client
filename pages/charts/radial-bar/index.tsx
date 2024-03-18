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
import RadialBarStroked from '../_examples/chart-radial-bar/RadialBarStroked';
import RadialBarWithImage from '../_examples/chart-radial-bar/RadialBarWithImage';
import RadialBarGradient from '../_examples/chart-radial-bar/RadialBarGradient';
import RadialBarBasic from '../_examples/chart-radial-bar/RadialBarBasic';
import RadialBarMultiple from '../_examples/chart-radial-bar/RadialBarMultiple';
import RadialBarCustom from '../_examples/chart-radial-bar/RadialBarCustom';
import RadialBarSemiCircleGauge from '../_examples/chart-radial-bar/RadialBarSemiCircleGauge';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsRadialBar.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Radial Bar', to: '/charts/radial-bar' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-radial-bar--radial-bar-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<RadialBarBasic />
					<RadialBarMultiple />

					<RadialBarCustom />
					<RadialBarGradient />

					<RadialBarWithImage />
					<RadialBarStroked />

					<RadialBarSemiCircleGauge />
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
