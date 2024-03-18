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
	const VERTICAL = `
<span className='align-baseline'>baseline</span>
<span className='align-top'>top</span>
<span className='align-middle'>middle</span>
<span className='align-bottom'>bottom</span>
<span className='align-text-top'>text-top</span>
<span className='align-text-bottom'>text-bottom</span>`;
	const VERTICAL_2 = `
<table style={{ height: 100 }}>
	<tbody>
		<tr>
			<td className='align-baseline'>baseline</td>
			<td className='align-top'>top</td>
			<td className='align-middle'>middle</td>
			<td className='align-bottom'>bottom</td>
			<td className='align-text-top'>text-top</td>
			<td className='align-text-bottom'>text-bottom</td>
		</tr>
	</tbody>
</table>`;

	const UTILITIES_API = `
"align": (
	property: vertical-align,
	class: align,
	values: baseline top middle bottom text-bottom text-top
),`;

	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.utilities.subMenu.verticalAlign.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Utilities', to: '/utilities' },
							{ title: 'Vertical Align', to: '/utilities/vertical-align' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12 my-4'>
						<h1>Vertical alignment</h1>
						<p className='lead'>
							Easily change the vertical alignment of inline, inline-block,
							inline-table, and table cell elements.
						</p>
					</div>

					<div className='col-12'>
						<Card>
							<CardBody>
								<p>
									Change the alignment of elements with the{' '}
									<a
										href='https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align'
										target='_blank'
										rel='noreferrer'>
										<code>vertical-alignment</code>
									</a>{' '}
									utilities. Please note that vertical-align only affects inline,
									inline-block, inline-table, and table cell elements.
								</p>
								<p>
									Choose from <code>.align-baseline</code>,{' '}
									<code>.align-top</code>, <code>.align-middle</code>,{' '}
									<code>.align-bottom</code>, <code>.align-text-bottom</code>, and{' '}
									<code>.align-text-top</code> as needed.
								</p>
								<p>
									To vertically center non-inline content (like{' '}
									<code>{`<div>`}</code>s and more), use our{' '}
									<Link href='../utilities/flex/#align-items'>
										flex box utilities
									</Link>
									.
								</p>
								<p>With inline elements:</p>
								<CommonCodePreview code={VERTICAL}>
									<span className='align-baseline'>baseline</span>{' '}
									<span className='align-top'>top</span>{' '}
									<span className='align-middle'>middle</span>{' '}
									<span className='align-bottom'>bottom</span>{' '}
									<span className='align-text-top'>text-top</span>{' '}
									<span className='align-text-bottom'>text-bottom</span>
								</CommonCodePreview>
								<p>With table cells:</p>
								<CommonCodePreview code={VERTICAL_2}>
									<table style={{ height: 100 }}>
										<tbody>
											<tr>
												<td className='align-baseline'>baseline</td>
												<td className='align-top'>top</td>
												<td className='align-middle'>middle</td>
												<td className='align-bottom'>bottom</td>
												<td className='align-text-top'>text-top</td>
												<td className='align-text-bottom'>text-bottom</td>
											</tr>
										</tbody>
									</table>
								</CommonCodePreview>
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
											Vertical align utilities are declared in our utilities
											API in{' '}
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
