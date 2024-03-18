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
import CommonDesc from '../../../common/partial/other/CommonDesc';

const Index: NextPage = () => {
	const VISIBILITY = `
<div class="visible">...</div>
<div class="invisible">...</div>`;
	const VISIBILITY_2 = `
// Class
.visible {
	visibility: visible !important;
}
.invisible {
	visibility: hidden !important;
}`;

	const UTILITIES_API = `
"visibility": (
	property: visibility,
	class: null,
	values: (
		visible: visible,
		invisible: hidden,
	)
)`;

	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.utilities.subMenu.visibility.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Utilities', to: '/utilities' },
							{ title: 'Visibility', to: '/utilities/visibility' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12 my-4'>
						<h1>Visibility</h1>
						<p className='lead'>
							Control the visibility of elements, without modifying their display,
							with visibility utilities.
						</p>
					</div>

					<div className='col-12'>
						<Card>
							<CardBody>
								<p>
									Set the <code>visibility</code> of elements with our visibility
									utilities. These utility classes do not modify the{' '}
									<code>display</code> value at all and do not affect layout –{' '}
									<code>.invisible</code> elements still take up space in the
									page.
								</p>
								<CommonDesc className='mb-4'>
									Elements with the <code>.invisible</code> class will be hidden{' '}
									<em>both</em> visually and for assistive technology/screen
									reader users.
								</CommonDesc>
								<p>
									Apply <code>.visible</code> or <code>.invisible</code> as
									needed.
								</p>
								<CommonCodePreview code={VISIBILITY} className='mb-4' />
								<CommonCodePreview code={VISIBILITY_2} language='scss' />
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
											Visibility utilities are declared in our utilities API
											in{' '}
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
