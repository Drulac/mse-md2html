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
		visit(tree, 'element', onelement)

		function onelement(element) {
			if (
				element.type === 'element' &&
				element.tagName === 'p' &&
				element.children.length === 1 &&
				element.children[0].type === 'text' &&
				element.children[0].value.match(/<—{5,}>/)
			) {
				element.children = []
				element.tagName = 'div'
				element.properties.className = ['break']
			}
		}
	}
}
