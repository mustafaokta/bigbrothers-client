import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { componentPagesMenu } from '../../../menu';
import { TIconsSize } from '../../../type/icons-type';
import { TColor } from '../../../type/color-type';
import CommonDesc from '../../../common/partial/other/CommonDesc';
import Icon from '../../../components/icon/Icon';
import CommonHowToUse from '../../../common/partial/other/CommonHowToUse';

const GENERAL_USAGE = `<Icon
	icon={ String }
	className={ String }
	color={ String } // null || 'primary' || 'secondary' || 'success' || 'info' || 'warning' || 'danger' || 'light' || 'dark'
	size={ String } // null || 'sm' || 'md' || 'lg' || '2x' || '3x' || '4x' || '5x' || '6x' || '7x' || '8x' || '9x' || '10x'
	forceFamily={ String } // null || 'custom' || 'material'
	{...props} />`;
const COLORS: (TColor | undefined)[] = [
	undefined,
	'primary',
	'secondary',
	'success',
	'info',
	'warning',
	'danger',
	'light',
	'dark',
];
const SIZES: TIconsSize[] = [
	null,
	'sm',
	'md',
	'lg',
	'2x',
	'3x',
	'4x',
	'5x',
	'6x',
	'7x',
	'8x',
	'9x',
	'10x',
];

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.icons.subMenu.iconPage.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Icons', to: '/icons' },
							{ title: 'Icon', to: '/icons/icon' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>General Usage</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<CardCodeView>{GENERAL_USAGE}</CardCodeView>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Lightbulb' iconColor='warning'>
									<CardTitle>icon</CardTitle>
									<CardSubTitle>Icon</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>
									<div>
										icon: PropTypes.oneOfType([ PropTypes.string,
										PropTypes.oneOf(...)])
									</div>
									{/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
									<div>
										// <Link href='/icons/material'>Material</Link> or{' '}
										<Link href='/icons/bootstrap-icon'>Bootstrap</Link> to see
										the icon names and previews.
									</div>
								</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<div className='row g-4 d-flex align-items-center'>
									<div className='col-auto'>
										<Icon icon='Save' size='3x' />
									</div>
									<div className='col-auto'>
										<Icon icon='Edit' size='3x' />
									</div>
									<div className='col-auto'>
										<Icon icon='Delete' size='3x' />
									</div>
									<div className='col-auto'>
										<Icon icon='Person' size='3x' />
									</div>
									<div className='col-auto'>
										<Icon icon='Favorite' size='3x' />
									</div>
									<div className='col-auto'>
										<Icon icon='AreaChart' size='3x' />
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Palette' iconColor='info'>
									<CardTitle>color</CardTitle>
									<CardSubTitle>Icon</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>
									color: PropTypes.oneOf([ null, 'primary', 'secondary',
									'success', 'info', 'warning', 'danger', 'light', 'dark', ]),
								</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									{COLORS.map((item) => (
										<div key={item} className='col d-flex align-items-center'>
											<div className='row '>
												<div className='col-12 d-flex justify-content-center'>
													<Icon icon='Save' color={item} size='3x' />
												</div>
												<div className='col-12 d-flex justify-content-center'>
													<b>{item}</b>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Straighten'>
									<CardTitle>size</CardTitle>
									<CardSubTitle>Icon</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>
									size: PropTypes.oneOf([ null, 'sm', 'md', 'lg', '2x', '3x',
									'4x', '5x', '6x', '7x', '8x', '9x', '10x', ]),
								</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									{SIZES.map((item) => (
										<div key={item} className='col d-flex align-items-center'>
											<div className='row'>
												<div className='col-12 d-flex justify-content-center'>
													<Icon icon='Save' color='primary' size={item} />
												</div>
												<div className='col-12 d-flex justify-content-center'>
													<b>{item}</b>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Healing' iconColor='danger'>
									<CardTitle>forceFamily</CardTitle>
									<CardSubTitle>Icon</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<CommonHowToUse>
									forceFamily: PropTypes.oneOf([null, 'custom', 'material']),
								</CommonHowToUse>
								<CommonDesc>
									In case of icon name conflict of icon packs, forceFamily can be
									used to use the icon pack you want. By default priority is
									custom &gt; material.
								</CommonDesc>
							</CardBody>
							<CardBody>
								<div className='row g-4'>
									<div className='col-auto'>
										<div className='row'>
											<div className='col-12 d-flex justify-content-center'>
												<Icon icon='Alarm' color='primary' size='3x' />
											</div>
											<div className='col-12 d-flex justify-content-center'>
												<code>icon='Alarm'</code>
											</div>
										</div>
									</div>
								</div>
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
