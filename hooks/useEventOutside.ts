import useEventListener from './useEventListener';
import React from 'react';

export default function useEventOutside(
	ref: React.MutableRefObject<null>,
	eventName: string,
	handler: () => void,
) {
	const checkIt = (event: { target: any }) => {
		// @ts-ignore
		if (ref.current && !ref.current.contains(event.target)) {
			handler();
		}
	};
	useEventListener(eventName, checkIt);
}
