import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { componentPagesMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import CommonStoryBtn from '../../../common/partial/other/CommonStoryBtn';
import CommonHowToUse from '../../../common/partial/other/CommonHowToUse';
import CommonDesc from '../../../common/partial/other/CommonDesc';
import Nav, { NavItem, NavLinkDropdown } from '../../../components/bootstrap/Nav';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';

const Index: NextPage = () => {
	const GENERAL_USAGE = `
<Nav
	tag={ String } // 'ul' || 'nav'
	className={ String }
	design={ String } // 'tabs' || 'pills'
	isFill={ Boolean }
	isJustified={ Boolean }
	isVertical={ Boolean }
	verticalBreakpoint={ String } // 'sm' || 'md' || 'lg' || 'xl' || 'xxl'
	{...props}>
	
	{ // HTML example }
	<NavItem 
		className={ String }
		isActive={ Boolean }
		isDisable={ Boolean }
		{...props}>
		<a 
			href={ String }>
			{ String }
		</a>
	</NavItem>
	
	{ // NavLink example }
	<NavItem {...props}>
		<NavLink
			to={ String }
			{...props}>
			{ String }
		</NavLink>
	</NavItem>
	
	{ // HashLink example }
	<NavItem {...props}>
		<HashLink
			to={ String }
			{...props}>
			{ String }
		</NavLink>
	</NavItem>
	
	{ // Dropdown example }
	<NavItem {...props}>
		<Dropdown {...props}>
			<DropdownToggle {...props}>
				<NavLinkDropdown 
					className={ String }
					{...props}>
					Drop
				</NavLinkDropdown>
			</DropdownToggle>
			<DropdownMenu {...props}>
				<DropdownItem {...props}>
					... {// a, NavLink, HashLink }
				</DropdownItem>
				...
			</DropdownMenu>
		</Dropdown>
	</NavItem>
	...
</Nav>`;

	return (
		<PageWrapper>
			<Head>
				<title>{componentPagesMenu.components.subMenu.navsTabs.text}</title>
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
								title: componentPagesMenu.components.subMenu.navsTabs.text,
								to: `/${componentPagesMenu.components.subMenu.navsTabs.path}`,
							},
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonStoryBtn to='/docs/components-nav--default' />
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					{/* General Usage */}
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

					<div className='col-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='DesignServices'>
									<CardTitle>design</CardTitle>
									<CardSubTitle>Nav</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav--default&args=design:pills' />
								</CardActions>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>
									design: PropTypes.oneOf(['tabs', 'pills']),
								</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<div className='row g-3'>
									<div className='col-xl-6'>
										<Nav design='tabs'>
											<NavItem>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Tabs
												</a>
											</NavItem>
											<NavItem>
												<Link href='/components/modal'>Active</Link>
											</NavItem>
											<NavItem>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Link
												</a>
											</NavItem>
											<NavItem>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Link
												</a>
											</NavItem>
											<NavItem isDisable>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Disabled
												</a>
											</NavItem>
											<NavItem>
												<Dropdown>
													<DropdownToggle>
														<NavLinkDropdown>Drop</NavLinkDropdown>
													</DropdownToggle>
													<DropdownMenu>
														<DropdownItem>
															<Link href='component'>nav link 2</Link>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</NavItem>
										</Nav>
									</div>
									<div className='col-xl-6'>
										<Nav>
											<NavItem>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Pills
												</a>
											</NavItem>
											<NavItem>
												<Link href='/components/modal'>Active</Link>
											</NavItem>
											<NavItem>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Link
												</a>
											</NavItem>
											<NavItem>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Link
												</a>
											</NavItem>
											<NavItem isDisable>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a href='pages/components/navs-and-tabs/index#'>
													Disabled
												</a>
											</NavItem>
											<NavItem>
												<Dropdown>
													<DropdownToggle>
														<NavLinkDropdown>Drop</NavLinkDropdown>
													</DropdownToggle>
													<DropdownMenu>
														<DropdownItem>
															<Link href='component'>nav link 2</Link>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</NavItem>
										</Nav>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-xl-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='SwitchRight' iconColor='danger'>
									<CardTitle>isFill</CardTitle>
									<CardSubTitle>Nav</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav--default&args=isFill:true' />
								</CardActions>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>isFill: PropTypes.bool,</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<Nav isFill>
									<NavItem>
										<Link href='/components/modal'>Active</Link>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>
											Much longer nav link
										</a>
									</NavItem>
									<NavItem isDisable>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Disabled</a>
									</NavItem>
									<NavItem>
										<Dropdown>
											<DropdownToggle>
												<NavLinkDropdown>Drop</NavLinkDropdown>
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem>
													<Link href='component'>nav link 2</Link>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</NavItem>
								</Nav>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='BurstMode' iconColor='secondary'>
									<CardTitle>isJustified</CardTitle>
									<CardSubTitle>Nav</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav--default&args=isJustified:true' />
								</CardActions>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>isJustified: PropTypes.bool,</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<Nav isJustified>
									<NavItem>
										<Link href='/components/modal'>Active</Link>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>
											Much longer nav link
										</a>
									</NavItem>
									<NavItem isDisable>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Disabled</a>
									</NavItem>
									<NavItem>
										<Dropdown>
											<DropdownToggle>
												<NavLinkDropdown>Drop</NavLinkDropdown>
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem>
													<Link href='component'>nav link 2</Link>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</NavItem>
								</Nav>
							</CardBody>
						</Card>
					</div>

					<div className='col-xl-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='TextRotateVertical' iconColor='info'>
									<CardTitle>isVertical</CardTitle>
									<CardSubTitle>Nav</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav--default&args=isVertical:true' />
								</CardActions>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>isVertical: PropTypes.bool,</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<Nav isVertical>
									<NavItem>
										<Link href='/components/modal'>Active</Link>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem isDisable>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Disabled</a>
									</NavItem>
								</Nav>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='ContentCut' iconColor='warning'>
									<CardTitle>verticalBreakpoint</CardTitle>
									<CardSubTitle>Nav</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav--default&args=verticalBreakpoint:xxl' />
								</CardActions>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>isVertical: PropTypes.bool,</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<Nav isVertical verticalBreakpoint='xxl'>
									<NavItem>
										<Link href='/components/modal'>Active</Link>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem isDisable>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Disabled</a>
									</NavItem>
								</Nav>
							</CardBody>
						</Card>
					</div>

					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='HotelClass' iconColor='danger'>
									<CardTitle>
										className <small>Example: Horizontal alignment</small>
									</CardTitle>
									<CardSubTitle>Nav</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav--default&args=className:justify-content-center' />
								</CardActions>
							</CardHeader>
							<CardHeader className='pb-0'>
								<CommonHowToUse>className: PropTypes.string,</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<CommonDesc className='mb-4'>
									<p>
										Change the horizontal alignment of your nav with{' '}
										<Link href='utilities/flex'>flexbox utilities</Link>. By
										default, navs are left-aligned, but you can easily change
										them to center or right aligned.
									</p>
									<p>
										Centered with <code>.justify-content-center</code>:
									</p>
								</CommonDesc>
								<Nav className='justify-content-center'>
									<NavItem>
										<Link href='/components/modal'>Active</Link>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem isDisable>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Disabled</a>
									</NavItem>
								</Nav>
								<CommonDesc className='mb-4 mt-4'>
									Right-aligned with <code>.justify-content-end</code>:
								</CommonDesc>
								<Nav className='justify-content-end'>
									<NavItem>
										<Link href='/components/modal'>Active</Link>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem isDisable>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Disabled</a>
									</NavItem>
								</Nav>
							</CardBody>
						</Card>
					</div>

					<div className='col-xl-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='ToggleOn' iconColor='success'>
									<CardTitle>isActive</CardTitle>
									<CardSubTitle>NavItem</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav-sub-components-navitem--default&args=isActive:true' />
								</CardActions>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>isActive: PropTypes.bool,</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<Nav>
									<NavItem isActive>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Active</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
								</Nav>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='DoNotDisturbOn' iconColor='danger'>
									<CardTitle>isDisable</CardTitle>
									<CardSubTitle>NavItem</CardSubTitle>
								</CardLabel>
								<CardActions>
									<CommonStoryBtn to='/story/components-nav-sub-components-navitem--default&args=isDisable:true' />
								</CardActions>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse>isDisable: PropTypes.bool,</CommonHowToUse>
							</CardHeader>
							<CardBody>
								<Nav>
									<NavItem isDisable>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Disabled</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
									<NavItem>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href='pages/components/navs-and-tabs/index#'>Link</a>
									</NavItem>
								</Nav>
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
