// used for SSR (getServerSideProps)
// const path = require('path')
// const localePath = path.resolve('./public/locales')

module.exports = {
	// https://www.i18next.com/overview/configuration-options#logging
	/* debug: process.env.NODE_ENV === 'development', */
	i18n: {
		defaultLocale: 'en-US',
		locales: ['en-US', 'de-DE', 'fr-FR', 'tr-TR'],
		localeDetection: false,
	},
	nonExplicitSupportedLngs: true,
	// localePath,
	reloadOnPrerender: process.env.NODE_ENV === 'development',
};
