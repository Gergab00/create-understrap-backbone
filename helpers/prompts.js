/**
 * Capitalizes the first letter in a string.
 *
 * @param {string} str The string whose first letter the function will capitalize.
 *
 * @return {string} Capitalized string.
 */
 const upperFirst = ( [ firstLetter, ...rest ] ) =>
    firstLetter.toUpperCase() + rest.join('');

const name = {
    type: 'input',
    name: 'theme_name',
    default: 'Understrap Framework Theme',
	message: 'The display title for your Theme:',
	filter( input ) {
		return input && upperFirst( input );
	},
}

const namespace = {
	type: 'input',
    name: 'namespace',
    default: 'understrap-framework-theme',
	message:
		'The internal namespace for your project (something unique for your products):',
	validate( input ) {
		if ( ! /^[a-z][a-z0-9\-]*$/.test( input ) ) {
			return 'Invalid namespace specified. Namespace can contain only lowercase alphanumeric characters or dashes, and start with a letter.';
		}

		return true;
	},
};
 
const version = {
    type: 'input',
    name: 'version',
    default: '0.9.0',
    message: 'The current version number of the theme:',
    validate( input ) {
        // Regular expression was copied from https://semver.org.
        const validSemVerPattern =
            /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
        if ( ! validSemVerPattern.test( input ) ) {
            return 'Invalid Semantic Version provided. Visit https://regex101.com/r/vkijKf/1/ to discover all valid patterns.';
        }

        return true;
    },
};

const themeURI = {
	type: 'input',
    name: 'pluginURI',
    default: 'https://understrap.com',
	message: 'The home page of the theme (optional). Unique URL outside of WordPress.org:',
};

/*-----------------------------------*/

const title = {
	type: 'input',
    name: 'title',
    default: 'Example Block',
	message: 'The display title for your block:',
	filter( input ) {
		return input && upperFirst( input );
	},
};

const slug = {
	type: 'input',
    name: 'slug',
    default: 'example-block',
	message:
		'The block slug used for identification (also the output folder name):',
	validate( input ) {
		if ( ! /^[a-z][a-z0-9\-]*$/.test( input ) ) {
			return 'Invalid block slug specified. Block slug can contain only lowercase alphanumeric characters or dashes, and start with a letter.';
		}

		return true;
	},
};

const description = {
	type: 'input',
    name: 'description',
    default: 'Block scaffolded with Create Understrap Backbone tool.',
	message: 'The short description for your block (optional):',
	filter( input ) {
		return input && upperFirst( input );
	},
};

const dashicon = {
	type: 'input',
    name: 'dashicon',
    default: 'block-default',
	message:
		'The dashicon to make it easier to identify your block (optional):',
	validate( input ) {
		if ( input.length && ! /^[a-z][a-z0-9\-]*$/.test( input ) ) {
			return 'Invalid dashicon name specified. Visit https://developer.wordpress.org/resource/dashicons/ to discover available names.';
		}

		return true;
	},
	filter( input ) {
		return input && input.replace( /dashicon(s)?-/, '' );
	},
};

const category = {
	type: 'list',
	name: 'category',
	message: 'The category name to help users browse and discover your block:',
	choices: [ 'text', 'media', 'design', 'widgets', 'theme', 'embed' ],
};

module.exports = {
    name,
    version,
    themeURI,
    title,
    slug,
    description,
    dashicon,
    category
}