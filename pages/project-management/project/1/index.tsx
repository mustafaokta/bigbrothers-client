import React, { useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import useDarkMode from '../../../../hooks/useDarkMode';
import COLORS from '../../../../common/data/enumColors';
import USERS from '../../../../common/data/userDummyData';
import TAGS from '../../../../common/data/boardTagsData';
import Slide2 from '../../../../assets/img/wanna/slide/scene-2.png';
import Slide4 from '../../../../assets/img/wanna/slide/scene-4.png';
import Slide6 from '../../../../assets/img/wanna/slide/scene-6.png';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Button from '../../../../components/bootstrap/Button';
import Badge from '../../../../components/bootstrap/Badge';
import CommonAvatarTeam from '../../../../common/partial/other/CommonAvatarTeam';
import Page from '../../../../layout/Page/Page';
import { TCards, TColumnsData } from '../../../../common/partial/ProjectManagement/type/types';
import { move, reorder } from '../../../../common/partial/ProjectManagement/helper/helper';
import Board from '../../../../common/partial/ProjectManagement/component/Board';
import Columns from '../../../../common/partial/ProjectManagement/component/Columns';

const Index: NextPage = () => {
	const router = useRouter();

	const { darkModeStatus } = useDarkMode();
	const columnsData: TColumnsData = {
		column1: {
			id: 'column1',
			title: 'Backlog',
			color: darkModeStatus ? COLORS.LIGHT.name : COLORS.DARK.name,
			icon: 'RateReview',
		},
		column2: { id: 'column2', title: 'To Do', color: COLORS.INFO.name, icon: 'DoneOutline' },
		column3: {
			id: 'column3',
			title: 'Pending',
			color: COLORS.INFO.name,
			icon: 'PendingActions',
		},
		column4: { id: 'column4', title: 'Run', color: COLORS.INFO.name, icon: 'DirectionsRun' },
		column5: { id: 'column5', title: 'Done', color: COLORS.SUCCESS.name, icon: 'Verified' },
	};

	const [state, setState] = useState<TCards>({
		column1: [
			{
				id: 'Card1',
				title: 'Mail App',
				subtitle: 'Facit Themes',
				description: 'Mail application and screens will be added',
				label: '7 day left',
				user: USERS.JOHN,
				img: Slide2,
				tags: [TAGS.critical, TAGS.design, TAGS.code],
				tasks: [
					{ id: 1, text: 'Page UI & UX design', status: true },
					{ id: 2, text: 'HTML & SCSS coding', status: true },
					{ id: 3, text: 'React Components to do', status: false },
				],
				attachments: [
					{ id: 1, path: 'somefile.txt', file: 'TXT' },
					{ id: 2, path: 'somefile.txt', file: 'WORD' },
					{ id: 3, path: 'somefile.txt', file: 'PSD' },
				],
			},
			{
				id: 'Card2',
				title: 'Invoice',
				subtitle: 'Facit Themes',
				description: 'Invoice preview and new creation screens will be added',
				user: USERS.ELLA,
				label: '5 day left',
				tags: [TAGS.revise, TAGS.design],
				tasks: [
					{ id: 1, text: 'Lorem ipsum dolor', status: true },
					{ id: 2, text: 'Sit amet.', status: false },
				],
			},
		],
		column2: [
			{
				id: 'Card3',
				title: 'Landing Page Update',
				subtitle: 'Omtanke Team',
				description: 'Will be redesigned',
				label: '5 day left',
				user: USERS.GRACE,
				tags: [TAGS.design, TAGS.code],
				tasks: [
					{ id: 1, text: 'Draft drawings will be made', status: true },
					{ id: 2, text: 'Page will be updated', status: false },
					{ id: 3, text: 'Will be sent for review.', status: false },
				],
				attachments: [{ id: 2, path: 'somefile.txt', file: 'WORD' }],
			},
			{
				id: 'Card4',
				title: 'Write Blog',
				subtitle: 'Facit Themes',
				description: 'Explain why it should be chosen',
				label: '7 day left',
				user: USERS.JOHN,
				img: Slide4,
				tags: [TAGS.design],
				tasks: [{ id: 1, text: 'Lorem ipsum dolor', status: true }],
				attachments: [{ id: 1, path: 'somefile.txt', file: 'TXT' }],
			},
		],
		column3: [],
		column4: [
			{
				id: 'Card5',
				title: 'Bug Fix',
				subtitle: 'Facit Themes',
				description: 'Minor bugs will be fixed',
				label: '5 day left',
				user: USERS.GRACE,
				tags: [TAGS.review, TAGS.design, TAGS.code],
				tasks: [
					{ id: 1, text: 'Lorem ipsum dolor', status: true },
					{ id: 2, text: 'Sit amet.', status: false },
					{ id: 3, text: 'Aliquam quis varius turpis.', status: false },
				],
				attachments: [
					{ id: 1, path: 'somefile.txt', file: 'TXT' },
					{ id: 2, path: 'somefile.txt', file: 'WORD' },
					{ id: 3, path: 'somefile.txt', file: 'PSD' },
				],
			},
		],
		column5: [
			{
				id: 'Card6',
				title: 'Project App',
				subtitle: 'Facit Themes',
				description: 'Project tracking screen will be added',
				label: '1 day ago',
				user: USERS.JOHN,
				img: Slide6,
				tags: [TAGS.critical, TAGS.design],
				tasks: [
					{ id: 1, text: 'Lorem ipsum dolor', status: true },
					{ id: 2, text: 'Sit amet.', status: false },
					{ id: 3, text: 'Aliquam quis varius turpis.', status: false },
				],
				attachments: [
					{ id: 1, path: 'somefile.txt', file: 'TXT' },
					{ id: 2, path: 'somefile.txt', file: 'WORD' },
					{ id: 3, path: 'somefile.txt', file: 'PSD' },
				],
			},
		],
	});

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const ITEMS = reorder(state[source.droppableId], source.index, destination.index);

			const sourceList = source.droppableId;
			setState({ ...state, [sourceList]: ITEMS });
		} else {
			const RESULT = move(
				state[source.droppableId],
				state[destination.droppableId],
				source,
				destination,
			);

			setState({
				...state,
				...RESULT,
			});
		}
	};

	return (
		<PageWrapper>
			<Head>
				<title>{demoPagesMenu.projectManagement.subMenu.item.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => router.back()}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<span>
						There are{' '}
						<Badge color='info' isLight>
							2 teams
						</Badge>{' '}
						you are in and{' '}
						<Badge color='success' isLight>
							5 projects
						</Badge>
						.
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Facit</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<DragDropContext onDragEnd={onDragEnd}>
					<Board>
						<Columns
							columnsData={columnsData}
							cardsData={state}
							setCardsData={setState}
						/>
					</Board>
				</DragDropContext>
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
