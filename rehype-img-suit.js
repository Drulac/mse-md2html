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
				element.tagName === 'p' &&
				element.children.length > 1
			) {
				if (
					element.children.length ===
					element.children.filter((child) => {
						return (
							(child.type === 'text' &&
								child.value === '\n') ||
							(child.type === 'element' &&
								child.tagName === 'img')
						)
					}).length
				) {
					element.tagName = 'div'
					element.properties.className =
						element.properties.className || []
					element.properties.className.push('image-rows')

					element.children = element.children
						.map((child) => {
							if (
								child.type === 'element' &&
								child.tagName === 'img'
							) {
								return {
									type: 'element',
									tagName: 'figure',
									properties: {},
									children: [
										{
											type: 'element',
											tagName: 'img',
											properties: child.properties,
											children: [],
										},
										{
											type: 'element',
											tagName: 'figcaption',
											properties: {},
											children: parseHtml.parse(
												child.properties.alt
											).children,
										},
									],
									position: child.position,
								}
							} else {
								return child
							}
						})
						.filter((child) => child !== undefined)
						.flat()
				}
			}
		}
	}
}
