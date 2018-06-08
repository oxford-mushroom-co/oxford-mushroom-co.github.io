let globals = new Map()

globals.set('siteName', 'Oxford Mushroom Co.')
globals.set('currentYear', (new Date()).getFullYear())
globals.set('twitterUserName', '@OxfordMushrooms')

const init = (env) => globals.forEach((value, key) => env.addGlobal(key, value))

module.exports = init
