const filters = {
  concat: (array, value) => {
    return value
      ? array.concat(value)
      : array
  }
}

const init = (env) => {
  Object.keys(filters).forEach((key) => {
    env.addFilter(key, filters[key])
  })
}

module.exports = init
