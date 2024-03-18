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
import AreaBasic from '../_examples/chart-area/AreaBasic';
import AreaMissing from '../_examples/chart-area/AreaMissing';
import AreaGithub from '../_examples/chart-area/AreaGithub';
import CommonStoryBtn from '../../../common/partial/other/CommonStoryBtn';
import AreaNegative from '../_examples/chart-area/AreaNegative';
import AreaIrregular from '../_examples/chart-area/AreaIrregular';
import AreaStacked from '../_examples/chart-area/AreaStacked';
import AreaSpline from '../_examples/chart-area/AreaSpline';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.charts.subMenu.chartsArea.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'Area', to: '/charts/area' },
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/story/extra-chart-area--area-basic' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<AreaBasic />
					<AreaSpline />

					{/* TODO */}
					{/* <AreaXAxis /> */}
					<AreaNegative />

					<AreaGithub />
					<AreaStacked />

					<AreaIrregular />
					<AreaMissing />
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
