import React from 'react';
import Alert, { AlertHeading } from '../../components/bootstrap/Alert';

const CommonDashboardAlert = () => {
	return (
		<Alert
			icon='Verified'
			isLight
			color='primary'
			borderWidth={0}
			className='shadow-3d-primary'
			isDismissible>
			<AlertHeading tag='h2' className='h4'>
				Dikkat! 🎉
			</AlertHeading>
			<span>Yaklaşan ödemeniz bulunmaktadır.</span>
		</Alert>
	);
};

export default CommonDashboardAlert;
