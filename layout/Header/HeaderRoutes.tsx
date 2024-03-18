import React from 'react';
import { useRouter } from 'next/router';
import headers from '../../routes/headerRoutes';
import { pathToRoute } from '../../helpers/helpers';
import Mounted from '../../components/Mounted';

const HeaderRoutes = () => {
	const router = useRouter();

	const PAGE = headers.find((key) => {
		// eslint-disable-next-line no-unsafe-optional-chaining
		return key.path.substring(key.path?.length - 2) === '/*'
			? // eslint-disable-next-line no-unsafe-optional-chaining
				router.pathname.includes(key.path.substring(0, key.path?.length - 2))
			: key.path === pathToRoute(router.pathname);
	});

	if (PAGE) return <Mounted>{PAGE?.element}</Mounted>;
	return null;
};

export default HeaderRoutes;
