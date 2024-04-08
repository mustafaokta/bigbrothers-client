import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { componentPagesMenu, pageLayoutTypesPagesMenu } from '../../../menu';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import CommonHeaderRight from './CommonHeaderRight';
import Avatar from '../../../components/Avatar';
import UserImage2 from '../../../assets/img/wanna/wanna1.png';
import { useUserContext } from '../../../context/UserContext';
import { useDataUserRoleList } from '../../../helpers/connections/tour';
import Button from '../../../components/bootstrap/Button';
import Spinner from '../../../components/bootstrap/Spinner';


const DefaultHeader = () => {
	const deviceScreen = useDeviceScreen();
	const {user}= useUserContext();
	
   const { data: userRoleData, isLoading: userRoleIsLoading, isError: userRoleIsError } = useDataUserRoleList();
      if (userRoleIsLoading ) 	return (
			<div className="d-flex h-100 w-100 justify-content-center align-items-center">
				<div className="">
					<Button color="primary" isLight>
						<Spinner isSmall={false} size={18} inButton />
						Yükleniyor...
					</Button>
				</div>
			</div>
		);
      if (userRoleIsError ) return <div className="flex flex-col w-full">BİR HATA MEYDANA GELDİ....</div>;
	return (
		<Header>
			<HeaderLeft>
			<div className='col d-flex align-items-center'>
					<div className='me-3'>
						<Avatar src={user.src?user.src:UserImage2} size={48} color='primary' />
					</div>
					<div>
						<div className='fw-bold fs-6 mb-0'>{user.name + ' ' + user.surname}</div>
						<div className='text-muted'>
							<small>{userRoleData.content.filter((el:any)=>el.id==user.roleId)[0]?.name  }</small>
						</div>
					</div>
				</div>
		{/* 		<Navigation
					menu={{ ...pageLayoutTypesPagesMenu, ...componentPagesMenu }}
					id='header-top-menu'
					horizontal={
						!!deviceScreen?.width &&
						deviceScreen.width >= Number(process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT_SIZE)
					}
				/> */}
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default DefaultHeader;
