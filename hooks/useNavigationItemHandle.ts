import { useContext } from 'react';
import { useWindowSize } from 'react-use';
import ThemeContext from '../context/themeContext';

const useNavigationItemHandle = () => {
	const { setAsideStatus, setLeftMenuStatus, setRightMenuStatus } = useContext(ThemeContext);
	const { width } = useWindowSize();

	return () => {
		if (width < Number(process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT_SIZE)) setAsideStatus(false);
		setLeftMenuStatus(false);
		setRightMenuStatus(false);
	};
};
export default useNavigationItemHandle;
