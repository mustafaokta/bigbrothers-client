import React, { useCallback } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import useDarkMode from '../../hooks/useDarkMode';
import { demoPagesMenu } from '../../menu';
import USERS from '../data/userDummyData';
import { useRouter } from 'next/router';

const CommonDashboardMarketingTeam = () => {
	const { darkModeStatus } = useDarkMode();

	const router = useRouter();
	const handleOnClickToEmployeeListPage = useCallback(
		() => router.push(`../${demoPagesMenu.appointment.subMenu.employeeList.path}`),
		[router],
	);

	return (
		<Card stretch>
			<CardHeader className='bg-transparent'>
				<CardLabel>
					<CardTitle tag='h4' className='h5'>
						Marketing Team
					</CardTitle>
					<CardSubTitle tag='h5' className='h6 text-muted'>
						There is a meeting at 12 o'clock.
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Button
						icon='ArrowForwardIos'
						aria-label='Read More'
						hoverShadow='default'
						color={darkModeStatus ? 'dark' : undefined}
						onClick={handleOnClickToEmployeeListPage}
					/>
				</CardActions>
			</CardHeader>
			<CardBody>
				<AvatarGroup>
					<Avatar
						src={USERS.GRACE.src}
						userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
						color={USERS.GRACE.color}
					/>
					<Avatar
						src={USERS.SAM.src}
						userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
						color={USERS.SAM.color}
					/>
					<Avatar
						src={USERS.CHLOE.src}
						userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
						color={USERS.CHLOE.color}
					/>

					<Avatar
						src={USERS.JANE.src}
						userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
						color={USERS.JANE.color}
					/>
					<Avatar
						src={USERS.JOHN.src}
						userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
						color={USERS.JOHN.color}
					/>
					<Avatar
						src={USERS.RYAN.src}
						userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
						color={USERS.RYAN.color}
					/>
				</AvatarGroup>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardMarketingTeam;
