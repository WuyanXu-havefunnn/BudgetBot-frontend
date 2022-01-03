import { createGlobalStyle } from 'styled-components'
import { COLORS, WEIGHTS } from '../lib/constants'

const GlobalStyles = createGlobalStyle`
	/* CSS RESET
  http://meyerweb.com/eric/tools/css/reset/
	v2.0 | 20110126
	License: none (public domain)
	*/
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed,
	figure, figcaption, footer, header, hgroup,
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	/* FONTS */
	@font-face {
    font-family: 'OpenDyslexic';
    src: url('/fonts/OpenDyslexic-Regular.otf');
	}

	/* GLOBAL STYLES */
	*,
	*:before,
	*:after {
    box-sizing: border-box;
    line-height: 1.5;
    font-family: var(--font-sans);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
	}

	#__next {
    /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
    */
    isolation: isolate;
	}

	html {
    --color-white: hsl(${COLORS.white});
    --color-black: hsl(${COLORS.black});
    --color-primary: hsl(${COLORS.primary});
    --color-secondary: hsl(${COLORS.secondary});
    --color-gray-100: hsl(${COLORS.gray[100]});
    --color-gray-200: hsl(${COLORS.gray[200]});
    --color-gray-300: hsl(${COLORS.gray[300]});
    --color-gray-500: hsl(${COLORS.gray[500]});
    --color-gray-700: hsl(${COLORS.gray[700]});
    --color-gray-900: hsl(${COLORS.gray[900]});
    --color-text: var(--color-gray-900);
    --font-weight-thin: ${WEIGHTS.thin};
    --font-weight-normal: ${WEIGHTS.normal};
    --font-weight-medium: ${WEIGHTS.medium};
    --font-weight-bold: ${WEIGHTS.bold};
    --font-sans-serif: 'Rubik', sans-serif;
    --font-cursive: 'Shizuru', cursive;
    --font-dyslexic: 'OpenDyslexic', sans-serif;
	}

	html, body, #__next {
    height: 100%;
    color: var(--color-text);
    /* background-color:#fefae0; */
	}
`

export default GlobalStyles
