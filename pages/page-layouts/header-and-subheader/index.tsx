import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Humans from '../../../assets/img/scene1.png';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { pageLayoutTypesPagesMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import CommonLayoutRightSubheader from '../../_layout/_subheaders/CommonLayoutRightSubheader';
import Page from '../../../layout/Page/Page';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Page Layout', to: '/page-layouts' },
							{
								title: 'Header & Subheader',
								to: '/page-layouts/header-and-subheader',
							},
						]}
					/>
				</SubHeaderLeft>
				<CommonLayoutRightSubheader />
			</SubHeader>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center'
						style={{ fontSize: 'calc(3rem + 3vw)' }}>
						<p>
							Header <span className='text-primary fw-bold mx-1'>&</span> Subheader
						</p>
					</div>
					<div className='col-12 d-flex align-items-baseline justify-content-center'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={Humans} alt='Humans' style={{ height: '50vh' }} />
					</div>
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
