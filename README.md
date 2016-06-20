# Chat

Developed using [WebCompiler](https://thealjey.github.io/webcompiler/).

In order to complete the task on time I had to cut down on everything not directly related to rapid prototyping:

* tests
* documentation
* CI
* automatic changelog generation and release automation
* production builds
* a production server with server-side rendering
* etc.

### Included

* an almost (see [Notes](#notes) below) fully functioning application
* responsive, optimized for a variety of screen sizes
* linted with [ESLint](http://eslint.org/) (a recent regression [#6450](https://github.com/eslint/eslint/issues/6450) in ESLint could prevent it from linting properly)
* typechecked with [Flow](https://flowtype.org)
* a development server with hot updates (LiveReload is only used for CSS, everything else is hot updated without the need for a page refresh)
* [Immutable](https://facebook.github.io/immutable-js/) data
* single store [Redux](http://redux.js.org) architecture
* [Redux DevTools](https://github.com/gaearon/redux-devtools) with undo/redo functionality (can be hidden/shown with `Ctrl+H` and moved to a different side of the window with `Ctrl+Q`)

### Prerequisites

* [Git](https://git-scm.com/)
* [Ruby](https://www.ruby-lang.org/en/)
* [Node.js](https://nodejs.org/en/)
* [Facebook Flow](http://flowtype.org/)
* [SCSS-Lint](https://github.com/brigade/scss-lint)
* [Watchman](https://facebook.github.io/watchman/)

### Instructions

1. clone the project onto your computer with `git clone https://github.com/thealjey/chat.git`
2. enter the new directory with `cd chat`
3. run the app with `npm run dev-server`, wait until it is fully initialized (you should see a green colored text that says `1. Compiled <path to your local>chat/src/components/_index.scss`)
4. in your browser visit the following url:
  * [http://localhost:3000/](http://localhost:3000/)
  * or [http://localhost:3000/?debug_session=anything](http://localhost:3000/?debug_session=anything) (state persisted in localStorage, try doing something and then refreshing the page. Cool, right :))

### Notes

* http://lorempixel.com/ is often unresponsive, slow, unreliable, and unstable. So in order for the carousel to actually load and work I was forced to opt into using local image files instead.
* the way of setting the "user" name in the application was not specified, so I assumed that Nickname = Username
* "chatBot2000" should instead have been called "spamBot2000", as it is not only useless, but is also quite annoying
* "echoBot2000" is also useless; first of all the message is not sent back from the server to acknowledge the fact that is was received and inform ALL of the subscribers; and second, "{user} sended a message with content: {message}", is not what I expect to see when I send a message. Instead of the "echoBot2000" message event, the server must emit a message event with the same contents, as it has just received.
