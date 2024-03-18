import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { componentPagesMenu } from '../../../menu';
import MaterialIcons from '../../../components/icon/material-icons/iconList';
import CommonIconPreview from '../../../common/partial/other/CommonIconPreview';
import Input from '../../../components/bootstrap/forms/Input';

const Index: NextPage = () => {
	const formik = useFormik({
		initialValues: {
			filterIcon: '',
		},
		onSubmit: () => {},
	});
	const FILTERED_ICONS = MaterialIcons.filter((name) =>
		name.toLowerCase().includes(formik.values.filterIcon.toLowerCase()),
	);
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.icons.subMenu.material.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Icons', to: '/icons' },
							{ title: 'Material', to: '/icons/material' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Lightbulb'>
									<CardTitle>
										icon{' '}
										{MaterialIcons.length > FILTERED_ICONS.length && (
											<small>
												including "{formik.values.filterIcon.toLowerCase()}"
												:{FILTERED_ICONS.length}
											</small>
										)}
									</CardTitle>
									<CardSubTitle>Icon</CardSubTitle>
								</CardLabel>
								<CardActions>
									<Input
										name='filterIcon'
										placeholder='Filter icon...'
										aria-label='.form-control-lg example'
										onChange={formik.handleChange}
										value={formik.values.filterIcon}
									/>
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									{FILTERED_ICONS.map((icon) => (
										<CommonIconPreview
											key={icon}
											icon={icon}
											forceFamily='material'
										/>
									))}
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
