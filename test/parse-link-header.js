'use strict';
/*jshint asi: true */

var test = require('tape').test
var parse = require('..')

test('parsing a proper link header with next and last', function (t) {
  var link = 
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100>; rel="next", ' + 
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100>; rel="last"'

  var res = parse(link)
  t.deepEqual(
      parse(link)
    , { next:
        { client_id: '1',
          client_secret: '2',
          page: '2',
          per_page: '100',
          rel: 'next',
          url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100' },
        last:
        { client_id: '1',
          client_secret: '2',
          page: '3',
          per_page: '100',
          rel: 'last',
          url: ' https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100' } }
    , 'parses out link, page and perPage for next and last'
  )
  t.end()
})

test('parsing a proper link header with next, prev and last', function (t) {
  var linkHeader = 
    '<https://api.github.com/user/9287/repos?page=3&per_page=100>; rel="next", ' + 
    '<https://api.github.com/user/9287/repos?page=1&per_page=100>; rel="prev", ' + 
    '<https://api.github.com/user/9287/repos?page=5&per_page=100>; rel="last"'

  var res = parse(linkHeader)
  
  t.deepEqual(
      parse(linkHeader)
    , { next:
        { page: '3',
          per_page: '100',
          rel: 'next',
          url: 'https://api.github.com/user/9287/repos?page=3&per_page=100' },
        prev:
        { page: '1',
          per_page: '100',
          rel: 'prev',
          url: ' https://api.github.com/user/9287/repos?page=1&per_page=100' },
        last:
        { page: '5',
          per_page: '100',
          rel: 'last',
          url: ' https://api.github.com/user/9287/repos?page=5&per_page=100' } }
    , 'parses out link, page and perPage for next, prev and last'
  )
  t.end()
})

test('parsing an empty link header', function (t) {
  var linkHeader = '' 
  var res = parse(linkHeader)
  
  t.equal( parse(linkHeader) , null , 'returns null')
  t.end()
})

test('parsing a proper link header with next and a link without rel', function (t) {
  var linkHeader = 
    '<https://api.github.com/user/9287/repos?page=3&per_page=100>; rel="next", ' + 
    '<https://api.github.com/user/9287/repos?page=1&per_page=100>; pet="cat", '

  var res = parse(linkHeader)
  
  t.deepEqual(
      parse(linkHeader)
    , { next:
        { page: '3',
          per_page: '100',
          rel: 'next',
          url: 'https://api.github.com/user/9287/repos?page=3&per_page=100' } }
    , 'parses out link, page and perPage for next only'
  )
  t.end()
})

test('parsing a proper link header with next and properties besides rel', function (t) {
  var linkHeader = 
    '<https://api.github.com/user/9287/repos?page=3&per_page=100>; rel="next"; hello="world"; pet="cat"'

  var res = parse(linkHeader)
  
  t.deepEqual(
      parse(linkHeader)
    , { next:
        { page: '3',
          per_page: '100',
          rel: 'next',
          hello: 'world',
          pet: 'cat',
          url: 'https://api.github.com/user/9287/repos?page=3&per_page=100' } }
    , 'parses out link, page and perPage for next and all other properties'
  )
  t.end()
})