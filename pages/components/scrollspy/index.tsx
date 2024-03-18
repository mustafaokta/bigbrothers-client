import React, { useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { componentPagesMenu } from '../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import CommonStoryBtn from '../../../common/partial/other/CommonStoryBtn';
import ScrollspyNav from '../../../components/bootstrap/ScrollspyNav';
import Button from '../../../components/bootstrap/Button';
import Humans from '../../../assets/img/scene1.png';
import Humans2 from '../../../assets/img/scene2.png';

const Index: NextPage = () => {
	const GENERAL_USAGE = `
<ScrollspyNav
	tag={ String } // Example: 'div'
	items={ Array } // Example: ['first', 'second', 'third']
	setActiveId={ Function } // NOT REQUIRED
	offset={ Number } // -500
	{...props}>
	<Button
		tag='a' // * Required
		to={ String } // Example: #first
		{...props}>
		... {// Button text}
	</Button>
	...
</ScrollspyNav>
...
<Component
	id={ String} // Example: first
	{...props}>
	...
</Component>
<div
	id={ String} // Example: second
	>
	...
</div>
...`;

	const GENERAL_USAGE_2 = `
const [state, setState] = useState(null);`;
	const GENERAL_USAGE3 = `
<ScrollspyNav
	items={ Array } // Example: ['first', 'second', 'third']
	setActiveId={ Function } // Example: setState
	offset={ Number } // -500
/>
<Button
	tag='a'
	to={ String } // Example: #first
	isActive={ Boolean } // Example: state === 'first'
	{...props}>
	... {// Button text}
</Button>
<HashLink
	to={ String } // Example: #second
	className={ String } // Example: state === 'second' && 'active-item'
	style={ Object } // Example: {color: state === 'second' ? 'green' : 'red'}
	{...props}>
</HashLink>
...
<Component
	id={ String} // Example: first
	{...props}>
	...
</Component>
<div
	id={ String} // Example: second
	>
	...
</div>
...`;

	const [activeElementId, setActiveElementId] = useState(null);
	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.components.subMenu.scrollspy.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{
								title: componentPagesMenu.components.text,
								to: `/${componentPagesMenu.components.path}`,
							},
							{
								title: componentPagesMenu.components.subMenu.scrollspy.text,
								to: `/${componentPagesMenu.components.subMenu.scrollspy.path}`,
							},
						]}
					/>
					<SubheaderSeparator />
					<ScrollspyNav
						items={['general-usage', 'second', 'third']}
						setActiveId={setActiveElementId}
						offset={-500}
					/>
					<Button
						tag='a'
						to='#general-usage'
						color='primary'
						isLight
						isActive={activeElementId === 'general-usage'}>
						General Usage
					</Button>
					<Button
						tag='a'
						to='#second'
						color='primary'
						isLight
						isActive={activeElementId === 'second'}>
						Second
					</Button>
					<Button
						tag='a'
						to='#third'
						color='primary'
						isLight
						isActive={activeElementId === 'third'}>
						Third
					</Button>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/docs/components-scrollspynav--default' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card id='general-usage' className='scroll-margin'>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>General Usage</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-xl-6'>
										<h4>1. Way (with children)</h4>
										<CardCodeView>{GENERAL_USAGE}</CardCodeView>
									</div>
									<div className='col-xl-6'>
										<h4>2. Way (with state)</h4>
										<CardCodeView className='mb-4'>
											{GENERAL_USAGE_2}
										</CardCodeView>
										<CardCodeView>{GENERAL_USAGE3}</CardCodeView>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-12'>
						<Card id='second' className='scroll-margin'>
							<CardHeader>
								<CardLabel>
									<CardTitle>Second</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row d-flex align-items-center'>
									<div className='col-12 d-flex align-items-baseline justify-content-center'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img src={Humans} alt='Humans' style={{ height: '50vh' }} />
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-12'>
						<Card id='third' className='scroll-margin'>
							<CardHeader>
								<CardLabel>
									<CardTitle>Third</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row d-flex align-items-center'>
									<div className='col-12 d-flex align-items-baseline justify-content-center'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={Humans2}
											alt='Humans'
											style={{ height: '50vh' }}
										/>
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
