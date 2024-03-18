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
import BarReserved from '../_examples/chart-bar/BarReserved';
import BarCustomLabel from '../_examples/chart-bar/BarCustomLabel';
import BarGrouped from '../_examples/chart-bar/BarGrouped';
import BarStacked100 from '../_examples/chart-bar/BarStacked100';
import BarStacked from '../_examples/chart-bar/BarStacked';
import BarWithImages from '../_examples/chart-bar/BarWithImages';
import BarWithNegativeValues from '../_examples/chart-bar/BarWithNegativeValues';
import BarBasic from '../_examples/chart-bar/BarBasic';
import BarPatterned from '../_examples/chart-bar/BarPatterned';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsBar.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Bar', to: '/charts/bar' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-bar--bar-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<BarBasic />
					<BarGrouped />

					<BarStacked />
					<BarStacked100 />

					<BarWithNegativeValues />
					<BarReserved />

					<BarCustomLabel />
					<BarPatterned />

					<BarWithImages />
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
