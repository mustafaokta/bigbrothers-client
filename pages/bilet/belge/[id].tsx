import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTourStep from '../../../hooks/useTourStep';
import useDarkMode from '../../../hooks/useDarkMode';
import { getUserDataWithId } from '../../../common/data/userDummyData';
import Chart, { IChartOptions } from '../../../components/extras/Chart';
import COLORS from '../../../common/data/enumColors';
import dummyEventsData from '../../../common/data/dummyEventsData';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import { demoPagesMenu } from '../../../menu';
import CommonAvatarTeam from '../../../common/partial/other/CommonAvatarTeam';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import Badge from '../../../components/bootstrap/Badge';
import Alert from '../../../components/bootstrap/Alert';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import EVENT_STATUS from '../../../common/data/enumEventStatus';
import { priceFormat } from '../../../helpers/helpers';
import { ticketGenerate } from '../../../helpers/connections/admin';
import { useUserContext } from '../../../context/UserContext';

const Id: NextPage = () => {
	useTourStep(19);
	const { darkModeStatus } = useDarkMode();
	const { user } = useUserContext();

	const router = useRouter();
	const { id } = router.query;
	console.log('id', id);
	const [pdfBuffer, setPdfBuffer] = useState<Buffer | null>(null);
	const [isLoading, setIsLoading] = useState<any>(true);

	useEffect(() => {
		if (id) {
			ticketGenerate({ data: id })
				.then((res: any) => {
					setPdfBuffer(res.data);
					setIsLoading(false);
				})
				.catch((error: any) => {
					console.error('Error in ticketGenerate', error);
					setIsLoading(false);
				});
		}
	}, [id, user?.token]);
	
	  const handleDownloadPdf = () => {
		if (pdfBuffer) {
		  const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
		  const url = URL.createObjectURL(blob);
		  window.open(url, '_blank');
		}
	  };
	
	  if (isLoading) return <div className="flex flex-col w-full">Loading...</div>;
	
	  return (
		<PageWrapper>
		  <Head>
			<title>Belge</title>
		  </Head>
		  <SubHeader>
			<SubHeaderLeft>
			  <h2 className='subheader-title'>Belge</h2>
			</SubHeaderLeft>
			<SubHeaderRight>
			  {pdfBuffer && (
				<Button color='primary' className='me-2' onClick={handleDownloadPdf}>
				  <Icon icon='Download' className='me-1' />
				  İndir
				</Button>
			  )}
			</SubHeaderRight>
		  </SubHeader>
		  <Page>
			<Card>
			  <CardHeader>
				<CardTitle>Belge</CardTitle>
			  </CardHeader>
			  <CardBody>
				{pdfBuffer ? (
				  <iframe src={`data:application/pdf;base64,${pdfBuffer.toString('base64')}`} width="100%" height="500px">
					This browser does not support PDFs. Please download the PDF to view it.
				  </iframe>
				) : (
				  <Alert color='info'>
					<Icon icon='Info' className='me-1' />
					Belge yükleniyor...
				  </Alert>
				)}
			  </CardBody>
			</Card>
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

export async function getStaticPaths() {
	return {
		paths: [
			// String variant:
			'/bilet/belge/1',
			// Object variant:
			{ params: { id: '1' } },
		],
		fallback: true,
	};
}

export default Id;
