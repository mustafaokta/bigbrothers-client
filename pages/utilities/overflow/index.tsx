import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { componentPagesMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import CommonCodePreview from '../../../common/partial/other/CommonCodePreview';

const Index: NextPage = () => {
	const OVERFLOW = `
<div className='overflow-auto'>...</div>
<div className='overflow-hidden'>...</div>
<div className='overflow-visible'>...</div>
<div className='overflow-scroll'>...</div>`;

	const UTILITIES_API = `
"overflow": (
 	property: overflow,
	values: auto hidden visible scroll,
),`;

	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.utilities.subMenu.overflow.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Utilities', to: '/utilities' },
							{ title: 'Overflow', to: '/utilities/overflow' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12 my-4'>
						<h1>Overflow</h1>
						<p className='lead'>
							Use these shorthand utilities for quickly configuring how content
							overflows an element.
						</p>
					</div>

					<div className='col-12'>
						<Card>
							<CardBody>
								<p>
									Adjust the <code>overflow</code> property on the fly with four
									default values and classes. These classes are not responsive by
									default.
								</p>
								<CommonCodePreview code={OVERFLOW}>
									<div className='d-md-flex'>
										<div
											className='overflow-auto p-3 mb-3 mb-md-0 me-md-3 bg-light'
											style={{
												maxWidth: 260,
												maxHeight: 80,
											}}>
											This is an example of using <code>.overflow-auto</code>{' '}
											on an element with set width and height dimensions. By
											design, this content will vertically scroll.
										</div>
										<div
											className='overflow-hidden p-3 mb-3 mb-md-0 me-md-3 bg-light'
											style={{
												maxWidth: 260,
												maxHeight: 80,
											}}>
											This is an example of using{' '}
											<code>.overflow-hidden</code> on an element with set
											width and height dimensions.
										</div>
										<div
											className='overflow-visible p-3 mb-3 mb-md-0 me-md-3 bg-light'
											style={{
												maxWidth: 260,
												maxHeight: 80,
											}}>
											This is an example of using{' '}
											<code>.overflow-visible</code> on an element with set
											width and height dimensions.
										</div>
										<div
											className='overflow-scroll p-3 bg-light'
											style={{
												maxWidth: 260,
												maxHeight: 80,
											}}>
											This is an example of using{' '}
											<code>.overflow-scroll</code> on an element with set
											width and height dimensions.
										</div>
									</div>
								</CommonCodePreview>
								<p>
									Using Sass variables, you may customize the overflow utilities
									by changing the <code>$overflows</code> variable in{' '}
									<code>node_modules/bootstrap/scss/_variables.scss</code>.
								</p>
							</CardBody>
						</Card>
					</div>

					<div className='col-12'>
						<Card id='sass' className='scroll-margin'>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='h3'>Sass</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<Card id='utilities-api' className='scroll-margin rounded-2'>
									<CardHeader>
										<CardLabel>
											<CardTitle>Utilities API</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<p>
											Overflow utilities are declared in our utilities API in{' '}
											<code>node_modules/bootstrap/scss/_utilities.scss</code>
											.{' '}
											<Link href='../utilities/api#using-the-api'>
												Learn how to use the utilities API.
											</Link>
										</p>
										<CommonCodePreview code={UTILITIES_API} language='scss' />
									</CardBody>
								</Card>
							</CardBody>
						</Card>
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
