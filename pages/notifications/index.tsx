import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { componentPagesMenu } from '../../menu';
import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Page from '../../layout/Page/Page';
import showNotification from '../../components/extras/showNotification';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import { AlertLink } from '../../components/bootstrap/Alert';
import CommonDesc from '../../common/partial/other/CommonDesc';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Icon from '../../components/icon/Icon';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Button from '../../components/bootstrap/Button';

const Index: NextPage = () => {
	const GENERAL_USAGE = `
() => {
	showNotification(
		'title', // String, HTML or Component
		'message', // String, HTML or Component
		'type' // 'default' || 'info' || 'warning' || 'success' || 'danger',
	);
}`;

	const TITLE = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>This is a Title</span>
		</span>
	);
	const MESSAGE = (
		<div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum dapibus orci,
				non consectetur sem aliquam nec.
			</p>
		</div>
	);

	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.notification.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb list={[{ title: 'Notification', to: '/notifications' }]} />
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
								<CardCodeView className='mb-4'>{GENERAL_USAGE}</CardCodeView>
								<CommonDesc>
									We preferred <strong>react-notifications-component</strong> for
									notification and ensured compatibility with the theme.If you
									want to make changes, path{' '}
									<code>src/components/extras/showNotification</code>. For more
									information,{' '}
									<AlertLink
										href='https://github.com/teodosii/react-notifications-component#api'
										target='blank'
										rel='noreferrer'>
										react-notifications-component API
									</AlertLink>
									.
								</CommonDesc>
							</CardBody>
						</Card>
					</div>

					<div className='col-xl-6'>
						<Card>
							<CardHeader>
								<CardLabel icon='FormatSize'>
									<CardTitle>'message'</CardTitle>
									<CardSubTitle>showNotification</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<Button
									color='primary'
									isLight
									icon='Notifications'
									onClick={() => {
										showNotification('', MESSAGE);
									}}>
									Click
								</Button>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-6'>
						<Card>
							<CardHeader>
								<CardLabel icon='AnchorCenterDown'>
									<CardTitle>'title'</CardTitle>
									<CardSubTitle>showNotification</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<Button
									color='primary'
									isLight
									icon='Notifications'
									onClick={() => {
										showNotification(TITLE, MESSAGE);
									}}>
									Click
								</Button>
							</CardBody>
						</Card>
					</div>

					<div className='col-xl-6'>
						<Card>
							<CardHeader>
								<CardLabel icon='Color'>
									<CardTitle>'type'</CardTitle>
									<CardSubTitle>showNotification</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-3'>
									<div className='col-auto'>
										<Button
											color='dark'
											isLight
											icon='Notifications'
											onClick={() => {
												showNotification(TITLE, MESSAGE);
											}}>
											Default
										</Button>
									</div>
									<div className='col-auto'>
										<Button
											color='info'
											isLight
											icon='Notifications'
											onClick={() => {
												showNotification(TITLE, MESSAGE, 'info');
											}}>
											Info
										</Button>
									</div>
									<div className='col-auto'>
										<Button
											color='success'
											isLight
											icon='Notifications'
											onClick={() => {
												showNotification(TITLE, MESSAGE, 'success');
											}}>
											Success
										</Button>
									</div>
									<div className='col-auto'>
										<Button
											color='warning'
											isLight
											icon='Notifications'
											onClick={() => {
												showNotification(TITLE, MESSAGE, 'warning');
											}}>
											Warning
										</Button>
									</div>

									<div className='col-auto'>
										<Button
											color='danger'
											isLight
											icon='Notifications'
											onClick={() => {
												showNotification(TITLE, MESSAGE, 'danger');
											}}>
											Danger
										</Button>
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
