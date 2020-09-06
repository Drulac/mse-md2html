const fs = require('fs')
const md2html = require('./index.js')()
//
//
//
//
//
;(async () => {
	console.log(
		await md2html(`
a

![]()

![normal with alt](normal_with_alt.png =50%)

<------------------>

![descrition aaaaaaaaa](weeeeeeee.png =40%)
![bbbbbbbbb](normal.png =30%)

b`)
	)

	return

	console.log(
		await md2html(
			fs
				.readFileSync(
					'/home/epakompri/Documents/cours paces/S1-2.0/01 UE3a états de la matière/markdown.md',
					'utf-8'
				)
				.toString()
		)
	)
})()
