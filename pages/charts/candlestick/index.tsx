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
import CandlestickBasic from '../_examples/chart-candlestick/CandlestickBasic';
import CandlestickCategoryXAxis from '../_examples/chart-candlestick/CandlestickCategoryXAxis';
import CandlestickCombo from '../_examples/chart-candlestick/CandlestickCombo';
import CandlestickLine from '../_examples/chart-candlestick/CandlestickLine';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsCandleStick.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Candlestick', to: '/charts/candlestick' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-candlestick--candlestick-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<CandlestickBasic />
					<CandlestickCombo />

					<CandlestickCategoryXAxis />
					<CandlestickLine />
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
