let globals = new Map()

globals.set('siteName', 'The Oxford Mushroom Co.')
globals.set('currentYear', (new Date()).getFullYear())

const init = (env) => globals.forEach((value, key) => env.addGlobal(key, value))

module.exports = init
