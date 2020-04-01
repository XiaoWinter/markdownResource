# express

## 基本路由

#### app.METHOD(PATH, HANDLER)

- `app` is an instance of `express`.
- `METHOD` is an [HTTP request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), in lowercase.
- `PATH` is a path on the server.
- `HANDLER` is the function executed when the route is matched.

#### express.Router([options])

```js
var router = express.Router([options])
```

#### express.static(root, [options])

```js
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))
```



### Application

```js
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000)
```

The `app` object has methods for

- Routing HTTP requests; see for example, [app.METHOD](http://expressjs.com/en/4x/api.html#app.METHOD) and [app.param](http://expressjs.com/en/4x/api.html#app.param).
- Configuring middleware; see [app.route](http://expressjs.com/en/4x/api.html#app.route).
- Rendering HTML views; see [app.render](http://expressjs.com/en/4x/api.html#app.render).
- Registering a template engine; see [app.engine](http://expressjs.com/en/4x/api.html#app.engine).

It also has settings (properties) that affect how the application behaves; for more information, see [Application settings](http://expressjs.com/en/4x/api.html#app.settings.table).

#### app.render(view, [locals], callback)

Locals = renderData

 Returns the rendered HTML of a view via the `callback` function. It accepts an optional parameter that is an object containing local variables for the view. It is like [res.render()](http://expressjs.com/en/4x/api.html#res.render), except it cannot send the rendered view to the client on its own. 

#### app.route(path)

 **Returns an instance of a single route,** which you can then use to handle HTTP verbs with optional middleware. Use `app.route()` to avoid duplicate route names (and thus typo errors). 

```js
var app = express()

app.route('/events')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
  })
  .get(function (req, res, next) {
    res.json({})
  })
  .post(function (req, res, next) {
    // maybe add a new event...
  })
```

#### app.use([path,] callback [, callback...])

 Mounts the specified [middleware](http://expressjs.com/guide/using-middleware.html) function or functions at the specified path: the middleware function is executed when the base of the requested path matches `path`. 

```js
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now())
  next()
})
```

```js
// this middleware will not allow the request to go beyond it
app.use(function (req, res, next) {
  res.send('Hello World')
})

// requests will never reach this route
app.get('/', function (req, res) {
  res.send('Welcome')
})
```

```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

#### path

 This will match paths starting with `/abcd`: 

```js
app.use('/abcd', function (req, res, next) {
  next();
});
```

 This will match paths starting with `/abcd` and `/abd`: 

```js
app.use('/abc?d', function (req, res, next) {
  next();
})
```

 This will match paths starting with `/abcd`, `/abbcd`, `/abbbbbcd`, and so on: 

```js
app.use('/ab+cd', function (req, res, next) {
  next();
});
```

 This will match paths starting with `/abcd`, `/abxcd`, `/abFOOcd`, `/abbArcd`, and so on: 

```js
app.use('/ab\*cd', function (req, res, next) {
  next();
});
```

 This will match paths starting with `/ad` and `/abcd`: 

```js
app.use('/a(bc)?d', function (req, res, next) {
  next();
});
```

 This will match paths starting with `/abc` and `/xyz`: 

```js
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
});
```

 This will match paths starting with `/abcd`, `/xyza`, `/lmn`, and `/pqr`: 

```js
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();
});
```

#### Middleware

 You can define and mount a middleware function locally. 

```js
app.use(function (req, res, next) {
  next();
});
```

 A router is valid middleware. 

```js
var router = express.Router();
router.get('/', function (req, res, next) {
  next();
});
app.use(router);
```

 An Express app is valid middleware. 

```js
var subApp = express();
subApp.get('/', function (req, res, next) {
  next();
});
app.use(subApp);
```

 You can specify more than one middleware function at the same mount path. 

```js
var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
});

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
});

app.use(r1, r2);
```

 Use an array to group middleware logically. If you pass an array of middleware as the first or only middleware parameters, then you *must* specify the mount path. 

```js
var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
});

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
});

app.use('/', [r1, r2]);
```

 You can combine all the above ways of mounting middleware. 

```js
function mw1(req, res, next) { next(); }
function mw2(req, res, next) { next(); }

var r1 = express.Router();
r1.get('/', function (req, res, next) { next(); });

var r2 = express.Router();
r2.get('/', function (req, res, next) { next(); });

var subApp = express();
subApp.get('/', function (req, res, next) { next(); });

app.use(mw1, [mw2, r1, r2], subApp);
```

### Router

A `router` object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

A router behaves like middleware itself, so you can use it as an argument to [app.use()](http://expressjs.com/en/4x/api.html#app.use) or as the argument to another router’s [use()](http://expressjs.com/en/4x/api.html#router.use) method.

The top-level `express` object has a [Router()](http://expressjs.com/en/4x/api.html#express.router) method that creates a new `router` object.

Once you’ve created a router object, you can add middleware and HTTP method routes (such as `get`, `put`, `post`, and so on) to it just like an application. For example:

```js
// invoked for any requests passed to this router
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  next()
})

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function (req, res, next) {
  // ..
})
```

#### router.route(path)

```js
var router = express.Router()

router.param('user_id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  }
  next()
})

router.route('/users/:user_id')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
  })
  .get(function (req, res, next) {
    res.json(req.user)
  })
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name
    // save user ... etc
    res.json(req.user)
  })
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  })
```

### Response

 The `res` object is an enhanced version of Node’s own response object and supports all [built-in fields and methods](https://nodejs.org/api/http.html#http_class_http_serverresponse). 

#### res.render(view [, locals] [, callback])

```js
// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function (err, html) {
  res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function (err, html) {
  // ...
})
```

#### res.sendFile(path [, options] [, fn])

```js
app.get('/file/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})
```

#### res.cookie(name, value [, options])

 Sets cookie `name` to `value`. The `value` parameter may be a string or object converted to JSON. 

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>domain</code></td>
<td>String</td>
<td>Domain name for the cookie. Defaults to the domain name of the app.</td>
</tr>
<tr>
<td><code>encode</code></td>
<td>Function</td>
<td>A synchronous function used for cookie value encoding. Defaults to <code>encodeURIComponent</code>.</td>
</tr>
<tr>
<td><code>expires</code></td>
<td>Date</td>
<td>Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.</td>
</tr>
<tr>
<td><code>httpOnly</code></td>
<td>Boolean</td>
<td>Flags the cookie to be accessible only by the web server.</td>
</tr>
<tr>
<td><code>maxAge</code></td>
<td>Number</td>
<td>Convenient option for setting the expiry time relative to the current time in milliseconds.</td>
</tr>
<tr>
<td><code>path</code></td>
<td>String</td>
<td>Path for the cookie. Defaults to “/”.</td>
</tr>
<tr>
<td><code>secure</code></td>
<td>Boolean</td>
<td>Marks the cookie to be used with HTTPS only.</td>
</tr>
<tr>
<td><code>signed</code></td>
<td>Boolean</td>
<td>Indicates if the cookie should be signed.</td>
</tr>
<tr>
<td><code>sameSite</code></td>
<td>Boolean or String</td>
<td>Value of the “SameSite” <strong>Set-Cookie</strong> attribute. More information at <a href="https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1">https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1</a>.</td>
</tr>
</tbody>
</table>

```js
res
  .status(201)
  .cookie('access_token', 'Bearer ' + token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
  .cookie('test', 'test')
  .redirect(301, '/admin')
```

#### res.clearCookie(name [, options])

 Clears the cookie specified by `name`. For details about the `options` object, see [res.cookie()](http://expressjs.com/en/4x/api.html#res.cookie). 

```js
res.cookie('name', 'tobi', { path: '/admin' })
res.clearCookie('name', { path: '/admin' })
```



#### res.download(path [, filename] [, options] [, fn])

Transfers the file at `path` as an “attachment”. Typically, browsers will prompt the user for download. By default, the `Content-Disposition` header “filename=” parameter is `path` (this typically appears in the browser dialog). Override this default with the `filename` parameter.

When an error occurs or transfer is complete, the method calls the optional callback function `fn`. This method uses [res.sendFile()](http://expressjs.com/en/4x/api.html#res.sendFile) to transfer the file.

```js
res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
  if (err) {
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit, etc.
  }
})
```



#### res.end([data] [, encoding])

Ends the response process. This method actually comes from Node core, specifically the [response.end() method of http.ServerResponse](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback).

Use to quickly end the response without any data. If you need to respond with data, instead use methods such as [res.send()](http://expressjs.com/en/4x/api.html#res.send) and [res.json()](http://expressjs.com/en/4x/api.html#res.json).

```js
res.end()
res.status(404).end()
```

#### res.format(object)安排

```js
res.format({
  'text/plain': function () {
    res.send('hey')
  },

  'text/html': function () {
    res.send('<p>hey</p>')
  },

  'application/json': function () {
    res.send({ message: 'hey' })
  },

  default: function () {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable')
  }
})
```

#### res.get(field)

 Returns the HTTP response header specified by `field`. The match is case-insensitive. 

```js
res.get('Content-Type')
// => "text/plain"
```

#### res.set(field [, value])

```js
res.set('Content-Type', 'text/plain')

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  ETag: '12345'
})
```

#### res.json([body])

Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.

```js
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
```

#### res.jsonp([body])

 Sends a JSON response with JSONP support. This method is identical to `res.json()`, except that it opts-in to JSONP callback support. 

```js
res.jsonp(null)
// => callback(null)

res.jsonp({ user: 'tobi' })
// => callback({ "user": "tobi" })

res.status(500).jsonp({ error: 'message' })
// => callback({ "error": "message" })
```



#### res.location(path)

Sets the response `Location` HTTP header to the specified `path` parameter.

```js
res.location('/foo/bar')
res.location('http://example.com')
res.location('back')
```

#### res.redirect([status,] path)

Redirects to the URL derived from the specified `path`, with specified `status`, a positive integer that corresponds to an [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) . If not specified, `status` defaults to “302 “Found”.

```js
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')
```

#### res.send([body])

Sends the HTTP response.

The `body` parameter can be a `Buffer` object, a `String`, an object, or an `Array`. For example:

```js
res.send(Buffer.from('whoop'))
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(404).send('Sorry, we cannot find that!')
res.status(500).send({ error: 'something blew up' })
```



#### res.sendStatus(statusCode)

Sets the response HTTP status code to `statusCode` and send its string representation as the response body.

```js
res.sendStatus(200) // equivalent to res.status(200).send('OK')
res.sendStatus(403) // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404) // equivalent to res.status(404).send('Not Found')
res.sendStatus(500) // equivalent to res.status(500).send('Internal Server Error')
```

#### res.status(code)

Sets the HTTP status for the response. It is a chainable alias of Node’s [response.statusCode](http://nodejs.org/api/http.html#http_response_statuscode).

```js
res.status(403).end()
res.status(400).send('Bad Request')
res.status(404).sendFile('/absolute/path/to/404.png')
```

#### res.type(type)

Sets the `Content-Type` HTTP header to the MIME type as determined by [mime.lookup()](https://github.com/broofa/node-mime#mimelookuppath) for the specified `type`. If `type` contains the “/” character, then it sets the `Content-Type` to `type`.

```js
res.type('.html')
// => 'text/html'
res.type('html')
// => 'text/html'
res.type('json')
// => 'application/json'
res.type('application/json')
// => 'application/json'
res.type('png')
// => 'image/png'
```



#### res.vary(field)

Adds the field to the `Vary` response header, if it is not there already.

```js
res.vary('User-Agent').render('docs')
```
#### Node.Response

<img src="http://47.103.65.182/markdown/101.png">

### Request

 The `req` object is an enhanced version of Node’s own request object and supports all [built-in fields and methods](https://nodejs.org/api/http.html#http_class_http_incomingmessage). 

#### req.app

 This property holds a reference to the instance of the Express application that is using the middleware. 

#### req.baseUrl

 The URL path on which a router instance was mounted. 

#### req.body

 Contains key-value pairs of data submitted in the request body. By default, it is `undefined`, and is populated when you use body-parsing middleware such as [`express.json()`](http://expressjs.com/en/4x/api.html#express.json) or [`express.urlencoded()`](http://expressjs.com/en/4x/api.html#express.urlencoded). 

#### req.cookies

 When using [cookie-parser](https://www.npmjs.com/package/cookie-parser) middleware, this property is an object that contains cookies sent by the request. If the request contains no cookies, it defaults to `{}`. 

#### req.fresh

缓存是否新鲜

#### req.hostname

 Contains the hostname derived from the `Host` HTTP header. 

#### req.ip

 Contains the remote IP address of the request. 

#### req.ips

#### req.method

 Contains a string corresponding to the HTTP method of the request: `GET`, `POST`, `PUT`, and so on. 

#### req.originalUrl

 This property is much like `req.url`; however, it retains the original request URL, allowing you to rewrite `req.url` freely for internal routing purposes. For example, the “mounting” feature of [app.use()](http://expressjs.com/en/4x/api.html#app.use) will rewrite `req.url` to strip the mount point. 

#### req.params

 This property is an object containing properties mapped to the [named route “parameters”](http://expressjs.com/en/guide/routing.html#route-parameters). For example, if you have the route `/user/:name`, then the “name” property is available as `req.params.name`. This object defaults to `{}`. 

```js
// GET /user/tj
console.dir(req.params.name)
// => 'tj'
```

#### req.path

 Contains the path part of the request URL. 

```js
// example.com/users?sort=desc
console.dir(req.path)
// => '/users'
```

#### req.protocol

 Contains the request protocol string: either `http` or (for TLS requests) `https`. 

#### req.query

 This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, `{}`. 

```js
// GET /search?q=tobi+ferret
console.dir(req.query.q)
// => 'tobi ferret'

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
console.dir(req.query.order)
// => 'desc'

console.dir(req.query.shoe.color)
// => 'blue'

console.dir(req.query.shoe.type)
// => 'converse'

// GET /shoes?color[]=blue&color[]=black&color[]=red
console.dir(req.query.color)
// => ['blue', 'black', 'red']
```

#### req.route

 Contains the currently-matched route, a string. For example: 

```js
app.get('/user/:id?', function userIdHandler (req, res) {
  console.log(req.route)
  res.send('GET')
})
```

 Example output from the previous snippet: 

```
{ path: '/user/:id?',
  stack:
   [ { handle: [Function: userIdHandler],
       name: 'userIdHandler',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?$/i,
       method: 'get' } ],
  methods: { get: true } }
```



#### req.secure

 A Boolean property that is true if a TLS connection is established. Equivalent to: 

```js
console.dir(req.protocol === 'https')
// => true
```

#### req.signedCookies

When using [cookie-parser](https://www.npmjs.com/package/cookie-parser) middleware, this property contains signed cookies sent by the request, unsigned and ready for use. Signed cookies reside in a different object to show developer intent; otherwise, a malicious attack could be placed on `req.cookie` values (which are easy to spoof). Note that signing a cookie does not make it “hidden” or encrypted; but simply prevents tampering (because the secret used to sign is private).

If no signed cookies are sent, the property defaults to `{}`.

```js
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
console.dir(req.signedCookies.user)
// => 'tobi'
```



#### req.stale

#### req.subdomains

 An array of subdomains in the domain name of the request. 

```js
// Host: "tobi.ferrets.example.com"
console.dir(req.subdomains)
// => ['ferrets', 'tobi']
```

#### req.xhr

 A Boolean property that is `true` if the request’s `X-Requested-With` header field is “XMLHttpRequest”, indicating that the request was issued by a client library such as jQuery. 

```js
console.dir(req.xhr)
// => true
```



#### req.accepts(types)

#### Node.Request

<img src="http://47.103.65.182/markdown/100.png">