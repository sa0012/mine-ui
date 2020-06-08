module.exports = function (content) {
  const markdown = require('../markdown')({})
  const html = markdown.render(content)
  return (
    `<template>\n` +
    `<div class="content">${html}</div>\n` +
    `</template>`
  )
}
