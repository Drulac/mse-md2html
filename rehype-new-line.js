const toText = require('hast-util-to-text')
const visit = require('unist-util-visit')
const unified = require('unified')
const parse = require('rehype-parse')

const assign = Object.assign

const parseHtml = unified().use(parse, {
	fragment: true,
	position: false,
})

const source = 'rehype-clean'

module.exports = function rehypeClean(options) {
	const settings = options || {}
	const throwOnError = settings.throwOnError || false

	return transformMath

	function transformMath(tree, file) {
		const bannedTagNames = [
			'meta',
			'title',
			'doctype',
			'head',
		] //, div[title="header"], div[title="footer"]'

		visit(tree, 'element', onelement)

		function onelement(element) {
			const classes = element.properties.className || []

			if (
				element.tagName === 'img' &&
				!element.properties.hasOwnProperty('alt') &&
				element.properties.hasOwnProperty('src') &&
				element.properties.src === ''
			) {
				//console.log(element)
				delete element.properties.src
				element.tagName = 'br'
				//console.log(element)
			}

			//element.children = parseHtml.parse(result).children
		}
	}
}
