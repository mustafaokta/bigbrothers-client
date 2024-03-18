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
import PieWithImage from '../_examples/chart-pieDonut/PieWithImage';
import DonutBasic from '../_examples/chart-pieDonut/DonutBasic';
import DonutPattern from '../_examples/chart-pieDonut/DonutPattern';
import PieBasic from '../_examples/chart-pieDonut/PieBasic';
import PieMonochrome from '../_examples/chart-pieDonut/PieMonochrome';
import DonutUpdate from '../_examples/chart-pieDonut/DonutUpdate';
import DonutGradient from '../_examples/chart-pieDonut/DonutGradient';
import DonutSemi from '../_examples/chart-pieDonut/DonutSemi';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsPieDonut.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Pie & Donut', to: '/charts/pie-donut' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-pie-donut--pie-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<PieBasic />
					<DonutBasic />

					<DonutUpdate />
					<PieMonochrome />

					<DonutGradient />
					<DonutSemi />

					<DonutPattern />
					<PieWithImage />
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
