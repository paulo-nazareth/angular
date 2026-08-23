Todas as dependências e respectivas versões instaladas através do comando:

```bash
npm install -g @angular/cli@1.0.0
```

Saída de Texto após a instalação.

```bash
`-- @angular/cli@1.0.0
  +-- @ngtools/json-schema@1.0.5
  +-- @ngtools/webpack@1.3.0
  | +-- enhanced-resolve@3.4.1
  | +-- loader-utils@1.4.2
  | | +-- big.js@5.2.2
  | | +-- emojis-list@3.0.0
  | | `-- json5@1.0.2
  | +-- magic-string@0.19.1
  | | `-- vlq@0.2.3
  | `-- source-map@0.5.7
  +-- autoprefixer@6.7.7
  | +-- browserslist@1.7.7
  | | `-- electron-to-chromium@1.5.412
  | +-- caniuse-db@1.0.30001809
  | +-- normalize-range@0.1.2
  | +-- num2fraction@1.2.2
  | +-- postcss@5.2.18
  | `-- postcss-value-parser@3.3.1
  +-- chalk@1.1.3
  | +-- ansi-styles@2.2.1
  | +-- escape-string-regexp@1.0.5
  | +-- has-ansi@2.0.0
  | | `-- ansi-regex@2.1.1
  | +-- strip-ansi@3.0.1
  | `-- supports-color@2.0.0
  +-- common-tags@1.8.2
  +-- css-loader@0.26.4
  | +-- babel-code-frame@6.26.0
  | | +-- esutils@2.0.3
  | | `-- js-tokens@3.0.2
  | +-- css-selector-tokenizer@0.7.3
  | | +-- cssesc@3.0.0
  | | `-- fastparse@1.1.2
  | +-- lodash.camelcase@4.3.0
  | +-- object-assign@4.1.1
  | +-- postcss-modules-extract-imports@1.2.1
  | | `-- postcss@6.0.23
  | |   +-- chalk@2.4.2
  | |   | `-- ansi-styles@3.2.1
  | |   +-- source-map@0.6.1
  | |   `-- supports-color@5.5.0
  | |     `-- has-flag@3.0.0
  | +-- postcss-modules-local-by-default@1.2.0
  | | `-- postcss@6.0.23
  | |   +-- chalk@2.4.2
  | |   | `-- ansi-styles@3.2.1
  | |   +-- source-map@0.6.1
  | |   `-- supports-color@5.5.0
  | |     `-- has-flag@3.0.0
  | +-- postcss-modules-scope@1.1.0
  | | `-- postcss@6.0.23
  | |   +-- chalk@2.4.2
  | |   | `-- ansi-styles@3.2.1
  | |   +-- source-map@0.6.1
  | |   `-- supports-color@5.5.0
  | |     `-- has-flag@3.0.0
  | +-- postcss-modules-values@1.3.0
  | | +-- icss-replace-symbols@1.1.0
  | | `-- postcss@6.0.23
  | |   +-- chalk@2.4.2
  | |   | `-- ansi-styles@3.2.1
  | |   +-- source-map@0.6.1
  | |   `-- supports-color@5.5.0
  | |     `-- has-flag@3.0.0
  | `-- source-list-map@0.1.8
  +-- cssnano@3.10.0
  | +-- decamelize@1.2.0
  | +-- defined@1.0.1
  | +-- has@1.0.4
  | +-- postcss-calc@5.3.1
  | | +-- postcss-message-helpers@2.0.0
  | | `-- reduce-css-calc@1.3.0
  | |   +-- balanced-match@0.4.2
  | |   +-- math-expression-evaluator@1.4.0
  | |   `-- reduce-function-call@1.0.3
  | |     `-- balanced-match@1.0.2
  | +-- postcss-colormin@2.2.2
  | | `-- colormin@1.1.2
  | |   +-- color@0.11.4
  | |   | +-- clone@1.0.4
  | |   | `-- color-string@0.3.0
  | |   `-- css-color-names@0.0.4
  | +-- postcss-convert-values@2.6.1
  | +-- postcss-discard-comments@2.0.4
  | +-- postcss-discard-duplicates@2.1.0
  | +-- postcss-discard-empty@2.1.0
  | +-- postcss-discard-overridden@0.1.1
  | +-- postcss-discard-unused@2.2.3
  | | `-- uniqs@2.0.0
  | +-- postcss-filter-plugins@2.0.3
  | +-- postcss-merge-idents@2.1.7
  | +-- postcss-merge-longhand@2.0.2
  | +-- postcss-merge-rules@2.1.2
  | | +-- caniuse-api@1.6.1
  | | | +-- lodash.memoize@4.1.2
  | | | `-- lodash.uniq@4.5.0
  | | +-- postcss-selector-parser@2.2.3
  | | | +-- flatten@1.0.3
  | | | +-- indexes-of@1.0.1
  | | | `-- uniq@1.0.1
  | | `-- vendors@1.0.4
  | +-- postcss-minify-font-values@1.0.5
  | +-- postcss-minify-gradients@1.0.5
  | +-- postcss-minify-params@1.2.2
  | | `-- alphanum-sort@1.0.2
  | +-- postcss-minify-selectors@2.1.1
  | +-- postcss-normalize-charset@1.1.1
  | +-- postcss-normalize-url@3.0.8
  | | +-- is-absolute-url@2.1.0
  | | `-- normalize-url@1.9.1
  | |   +-- prepend-http@1.0.4
  | |   +-- query-string@4.3.4
  | |   | `-- strict-uri-encode@1.1.0
  | |   `-- sort-keys@1.1.2
  | |     `-- is-plain-obj@1.1.0
  | +-- postcss-ordered-values@2.2.3
  | +-- postcss-reduce-idents@2.4.0
  | +-- postcss-reduce-initial@1.0.1
  | +-- postcss-reduce-transforms@1.0.4
  | +-- postcss-svgo@2.1.6
  | | +-- is-svg@2.1.0
  | | | `-- html-comment-regex@1.1.2
  | | `-- svgo@0.7.2
  | |   +-- coa@1.0.4
  | |   | `-- q@1.5.1
  | |   +-- colors@1.1.2
  | |   +-- csso@2.3.2
  | |   | `-- clap@1.2.3
  | |   +-- js-yaml@3.7.0
  | |   | +-- argparse@1.0.10
  | |   | | `-- sprintf-js@1.0.3
  | |   | `-- esprima@2.7.3
  | |   `-- whet.extend@0.9.9
  | +-- postcss-unique-selectors@2.0.2
  | `-- postcss-zindex@2.2.0
  +-- debug@2.6.9
  | `-- ms@2.0.0
  +-- denodeify@1.2.1
  +-- diff@3.5.1
  +-- ember-cli-normalize-entity-name@1.0.0
  +-- ember-cli-string-utils@1.1.0
  +-- exports-loader@0.6.4
  +-- extract-text-webpack-plugin@2.0.0
  | +-- ajv@4.11.8
  | | +-- co@4.6.0
  | | `-- json-stable-stringify@1.3.0
  | |   +-- call-bind@1.0.9
  | |   | +-- call-bind-apply-helpers@1.0.2
  | |   | +-- get-intrinsic@1.3.0
  | |   | | +-- get-proto@1.0.1
  | |   | | | `-- dunder-proto@1.0.1
  | |   | | +-- gopd@1.2.0
  | |   | | `-- math-intrinsics@1.1.0
  | |   | `-- set-function-length@1.2.2
  | |   |   +-- define-data-property@1.1.4
  | |   |   `-- has-property-descriptors@1.0.2
  | |   +-- call-bound@1.0.4
  | |   +-- isarray@2.0.5
  | |   +-- jsonify@0.0.1
  | |   `-- object-keys@1.1.1
  | +-- async@2.6.4
  | `-- webpack-sources@0.1.5
  +-- file-loader@0.10.1
  +-- fs-extra@2.1.2
  | +-- graceful-fs@4.2.11
  | `-- jsonfile@2.4.0
  +-- get-caller-file@1.0.3
  +-- glob@7.2.3
  | +-- fs.realpath@1.0.0
  | +-- inflight@1.0.6
  | | `-- wrappy@1.0.2
  | +-- inherits@2.0.4
  | +-- once@1.4.0
  | `-- path-is-absolute@1.0.1
  +-- html-webpack-plugin@2.30.1
  | +-- bluebird@3.7.2
  | +-- html-minifier@3.5.21
  | | +-- camel-case@3.0.0
  | | | +-- no-case@2.3.2
  | | | | `-- lower-case@1.1.4
  | | | `-- upper-case@1.1.3
  | | +-- clean-css@4.2.4
  | | | `-- source-map@0.6.1
  | | +-- commander@2.17.1
  | | +-- he@1.2.0
  | | +-- param-case@2.1.1
  | | +-- relateurl@0.2.7
  | | `-- uglify-js@3.4.10
  | |   +-- commander@2.19.0
  | |   `-- source-map@0.6.1
  | +-- loader-utils@0.2.17
  | | +-- big.js@3.2.0
  | | +-- emojis-list@2.1.0
  | | `-- json5@0.5.1
  | +-- pretty-error@2.1.2
  | | `-- renderkid@2.0.7
  | |   +-- css-select@4.3.0
  | |   | +-- boolbase@1.0.0
  | |   | +-- css-what@6.2.2
  | |   | +-- domhandler@4.3.1
  | |   | +-- domutils@2.8.0
  | |   | | `-- dom-serializer@1.4.1
  | |   | `-- nth-check@2.1.1
  | |   +-- dom-converter@0.2.0
  | |   | `-- utila@0.4.0
  | |   `-- htmlparser2@6.1.0
  | |     +-- domelementtype@2.3.0
  | |     `-- entities@2.2.0
  | `-- toposort@1.0.7
  +-- inflection@1.13.4
  +-- inquirer@3.3.0
  | +-- ansi-escapes@3.2.0
  | +-- chalk@2.4.2
  | | +-- ansi-styles@3.2.1
  | | | `-- color-convert@1.9.3
  | | |   `-- color-name@1.1.3
  | | `-- supports-color@5.5.0
  | |   `-- has-flag@3.0.0
  | +-- cli-cursor@2.1.0
  | | `-- restore-cursor@2.0.0
  | |   +-- onetime@2.0.1
  | |   | `-- mimic-fn@1.2.0
  | |   `-- signal-exit@3.0.7
  | +-- cli-width@2.2.1
  | +-- external-editor@2.2.0
  | | +-- chardet@0.4.2
  | | +-- iconv-lite@0.4.24
  | | `-- tmp@0.0.33
  | +-- figures@2.0.0
  | +-- mute-stream@0.0.7
  | +-- run-async@2.4.1
  | +-- rx-lite@4.0.8
  | +-- rx-lite-aggregates@4.0.8
  | +-- string-width@2.1.1
  | | +-- is-fullwidth-code-point@2.0.0
  | | `-- strip-ansi@4.0.0
  | |   `-- ansi-regex@3.0.1
  | +-- strip-ansi@4.0.0
  | | `-- ansi-regex@3.0.1
  | `-- through@2.3.8
  +-- isbinaryfile@3.0.3
  | `-- buffer-alloc@1.2.0
  |   +-- buffer-alloc-unsafe@1.1.0
  |   `-- buffer-fill@1.0.0
  +-- istanbul-instrumenter-loader@2.0.0
  | +-- convert-source-map@1.9.0
  | +-- istanbul-lib-instrument@1.10.2
  | | +-- babel-generator@6.26.1
  | | | +-- babel-messages@6.23.0
  | | | +-- detect-indent@4.0.0
  | | | | `-- repeating@2.0.1
  | | | |   `-- is-finite@1.1.0
  | | | +-- jsesc@1.3.0
  | | | `-- trim-right@1.0.1
  | | +-- babel-template@6.26.0
  | | +-- babel-traverse@6.26.0
  | | | +-- globals@9.18.0
  | | | `-- invariant@2.2.4
  | | |   `-- loose-envify@1.4.0
  | | +-- babel-types@6.26.0
  | | | `-- to-fast-properties@1.0.3
  | | +-- babylon@6.18.0
  | | `-- istanbul-lib-coverage@1.2.1
  | `-- loader-utils@0.2.17
  |   +-- big.js@3.2.0
  |   +-- emojis-list@2.1.0
  |   `-- json5@0.5.1
  +-- json-loader@0.5.7
  +-- karma-sourcemap-loader@0.3.8
  +-- karma-webpack@2.0.13
  | +-- babel-runtime@6.26.0
  | | +-- core-js@2.6.12
  | | `-- regenerator-runtime@0.11.1
  | `-- webpack-dev-middleware@1.12.2
  |   +-- range-parser@1.3.0
  |   `-- time-stamp@2.2.0
  +-- less@2.7.3
  | +-- errno@0.1.8
  | | `-- prr@1.0.1
  | +-- image-size@0.5.5
  | +-- mime@1.6.0
  | +-- mkdirp@0.5.6
  | | `-- minimist@1.2.8
  | +-- promise@7.3.1
  | | `-- asap@2.0.6
  | `-- request@2.81.0
  |   +-- aws-sign2@0.6.0
  |   +-- aws4@1.13.2
  |   +-- caseless@0.12.0
  |   +-- combined-stream@1.0.8
  |   | `-- delayed-stream@1.0.0
  |   +-- extend@3.0.2
  |   +-- forever-agent@0.6.1
  |   +-- form-data@2.1.4
  |   | `-- asynckit@0.4.0
  |   +-- har-validator@4.2.1
  |   | `-- har-schema@1.0.5
  |   +-- hawk@3.1.3
  |   | +-- boom@2.10.1
  |   | +-- cryptiles@2.0.5
  |   | +-- hoek@2.16.3
  |   | `-- sntp@1.0.9
  |   +-- http-signature@1.1.1
  |   | +-- assert-plus@0.2.0
  |   | +-- jsprim@1.4.2
  |   | | +-- assert-plus@1.0.0
  |   | | +-- extsprintf@1.3.0
  |   | | +-- json-schema@0.4.0
  |   | | `-- verror@1.10.0
  |   | |   +-- assert-plus@1.0.0
  |   | |   `-- core-util-is@1.0.2
  |   | `-- sshpk@1.18.0
  |   |   +-- asn1@0.2.6
  |   |   +-- assert-plus@1.0.0
  |   |   +-- bcrypt-pbkdf@1.0.2
  |   |   +-- dashdash@1.14.1
  |   |   | `-- assert-plus@1.0.0
  |   |   +-- ecc-jsbn@0.1.2
  |   |   +-- getpass@0.1.7
  |   |   | `-- assert-plus@1.0.0
  |   |   +-- jsbn@0.1.1
  |   |   `-- tweetnacl@0.14.5
  |   +-- is-typedarray@1.0.0
  |   +-- isstream@0.1.2
  |   +-- json-stringify-safe@5.0.1
  |   +-- mime-types@2.1.35
  |   | `-- mime-db@1.52.0
  |   +-- oauth-sign@0.8.2
  |   +-- performance-now@0.2.0
  |   +-- qs@6.4.3
  |   +-- safe-buffer@5.1.2
  |   +-- stringstream@0.0.6
  |   +-- tough-cookie@2.3.4
  |   +-- tunnel-agent@0.6.0
  |   `-- uuid@3.4.0
  +-- less-loader@2.2.3
  | `-- loader-utils@0.2.17
  |   +-- big.js@3.2.0
  |   +-- emojis-list@2.1.0
  |   `-- json5@0.5.1
  +-- lodash@4.18.1
  +-- minimatch@3.1.5
  | `-- brace-expansion@1.1.18
  |   +-- balanced-match@1.0.2
  |   `-- concat-map@0.0.1
  +-- node-modules-path@1.0.2
  +-- node-sass@4.14.1
  | +-- async-foreach@0.1.3
  | +-- cross-spawn@3.0.1
  | | +-- lru-cache@4.1.5
  | | | +-- pseudomap@1.0.2
  | | | `-- yallist@2.1.2
  | | `-- which@1.3.1
  | |   `-- isexe@2.0.0
  | +-- gaze@1.1.3
  | | `-- globule@1.3.4
  | |   +-- glob@7.1.7
  | |   `-- minimatch@3.0.8
  | +-- get-stdin@4.0.1
  | +-- in-publish@2.0.1
  | +-- meow@3.7.0
  | | +-- camelcase-keys@2.1.0
  | | | `-- camelcase@2.1.1
  | | +-- loud-rejection@1.6.0
  | | | `-- currently-unhandled@0.4.1
  | | |   `-- array-find-index@1.0.2
  | | +-- map-obj@1.0.1
  | | +-- normalize-package-data@2.5.0
  | | | +-- hosted-git-info@2.8.9
  | | | `-- validate-npm-package-license@3.0.4
  | | |   +-- spdx-correct@3.2.0
  | | |   | `-- spdx-license-ids@3.0.23
  | | |   `-- spdx-expression-parse@3.0.1
  | | |     `-- spdx-exceptions@2.5.0
  | | +-- read-pkg-up@1.0.1
  | | | +-- find-up@1.1.2
  | | | | `-- path-exists@2.1.0
  | | | `-- read-pkg@1.1.0
  | | |   +-- load-json-file@1.1.0
  | | |   | +-- parse-json@2.2.0
  | | |   | | `-- error-ex@1.3.4
  | | |   | |   `-- is-arrayish@0.2.1
  | | |   | +-- pify@2.3.0
  | | |   | `-- strip-bom@2.0.0
  | | |   |   `-- is-utf8@0.2.1
  | | |   `-- path-type@1.1.0
  | | +-- redent@1.0.0
  | | | +-- indent-string@2.1.0
  | | | `-- strip-indent@1.0.1
  | | `-- trim-newlines@1.0.0
  | +-- nan@2.28.0
  | +-- node-gyp@3.8.0
  | | +-- fstream@1.0.12
  | | +-- nopt@3.0.6
  | | +-- request@2.88.2
  | | | +-- aws-sign2@0.7.0
  | | | +-- form-data@2.3.3
  | | | +-- har-validator@5.1.5
  | | | | +-- ajv@6.15.0
  | | | | `-- har-schema@2.0.0
  | | | +-- http-signature@1.2.0
  | | | | `-- assert-plus@1.0.0
  | | | +-- oauth-sign@0.9.0
  | | | +-- performance-now@2.1.0
  | | | +-- qs@6.5.5
  | | | `-- tough-cookie@2.5.0
  | | |   `-- punycode@2.3.1
  | | +-- semver@5.3.0
  | | `-- tar@2.2.2
  | |   `-- block-stream@0.0.9
  | +-- npmlog@4.1.2
  | | +-- are-we-there-yet@1.1.7
  | | | `-- delegates@1.0.0
  | | +-- console-control-strings@1.1.0
  | | +-- gauge@2.7.4
  | | | +-- aproba@1.2.0
  | | | +-- has-unicode@2.0.1
  | | | +-- string-width@1.0.2
  | | | | `-- is-fullwidth-code-point@1.0.0
  | | | `-- wide-align@1.1.5
  | | `-- set-blocking@2.0.0
  | +-- request@2.88.2
  | | +-- aws-sign2@0.7.0
  | | +-- form-data@2.3.3
  | | +-- har-validator@5.1.5
  | | | +-- ajv@6.15.0
  | | | | +-- fast-deep-equal@3.1.3
  | | | | +-- fast-json-stable-stringify@2.1.0
  | | | | +-- json-schema-traverse@0.4.1
  | | | | `-- uri-js@4.4.1
  | | | |   `-- punycode@2.3.1
  | | | `-- har-schema@2.0.0
  | | +-- http-signature@1.2.0
  | | | `-- assert-plus@1.0.0
  | | +-- oauth-sign@0.9.0
  | | +-- performance-now@2.1.0
  | | +-- qs@6.5.5
  | | `-- tough-cookie@2.5.0
  | |   +-- psl@1.15.0
  | |   | `-- punycode@2.3.1
  | |   `-- punycode@2.3.1
  | +-- sass-graph@2.2.5
  | | +-- scss-tokenizer@0.2.3
  | | | `-- source-map@0.4.4
  | | `-- yargs@13.3.2
  | |   +-- cliui@5.0.0
  | |   | +-- string-width@3.1.0
  | |   | +-- strip-ansi@5.2.0
  | |   | | `-- ansi-regex@4.1.1
  | |   | `-- wrap-ansi@5.1.0
  | |   |   +-- ansi-styles@3.2.1
  | |   |   +-- string-width@3.1.0
  | |   |   `-- strip-ansi@5.2.0
  | |   |     `-- ansi-regex@4.1.1
  | |   +-- find-up@3.0.0
  | |   | `-- locate-path@3.0.0
  | |   |   +-- p-locate@3.0.0
  | |   |   | `-- p-limit@2.3.0
  | |   |   |   `-- p-try@2.2.0
  | |   |   `-- path-exists@3.0.0
  | |   +-- get-caller-file@2.0.5
  | |   +-- require-main-filename@2.0.0
  | |   +-- string-width@3.1.0
  | |   | +-- emoji-regex@7.0.3
  | |   | `-- strip-ansi@5.2.0
  | |   |   `-- ansi-regex@4.1.1
  | |   +-- which-module@2.0.1
  | |   +-- y18n@4.0.3
  | |   `-- yargs-parser@13.1.2
  | |     `-- camelcase@5.3.1
  | +-- stdout-stream@1.4.1
  | | `-- readable-stream@2.3.8
  | |   +-- core-util-is@1.0.3
  | |   +-- isarray@1.0.0
  | |   +-- process-nextick-args@2.0.1
  | |   `-- util-deprecate@1.0.2
  | `-- true-case-path@1.0.3
  +-- nopt@4.0.3
  | +-- abbrev@1.1.1
  | `-- osenv@0.1.5
  |   `-- os-homedir@1.0.2
  +-- opn@4.0.2
  | `-- pinkie-promise@2.0.1
  |   `-- pinkie@2.0.4
  +-- portfinder@1.0.38
  | +-- async@3.2.6
  | `-- debug@4.4.3
  |   `-- ms@2.1.3
  +-- postcss-loader@0.13.0
  | `-- loader-utils@0.2.17
  |   +-- big.js@3.2.0
  |   +-- emojis-list@2.1.0
  |   `-- json5@0.5.1
  +-- postcss-url@5.1.2
  | +-- directory-encoder@0.7.2
  | | +-- fs-extra@0.23.1
  | | +-- handlebars@1.3.0
  | | | +-- optimist@0.3.7
  | | | | `-- wordwrap@0.0.3
  | | | `-- uglify-js@2.3.6
  | | |   +-- async@0.2.10
  | | |   `-- source-map@0.1.43
  | | `-- img-stats@0.5.2
  | |   `-- xmldom@0.1.31
  | `-- js-base64@2.6.4
  +-- raw-loader@0.5.1
  +-- resolve@1.22.12
  | +-- es-errors@1.3.0
  | +-- is-core-module@2.16.2
  | | `-- hasown@2.0.4
  | |   `-- function-bind@1.1.2
  | +-- path-parse@1.0.7
  | `-- supports-preserve-symlinks-flag@1.0.0
  +-- rimraf@2.7.1
  +-- rsvp@3.6.2
  +-- rxjs@5.5.12
  | `-- symbol-observable@1.0.1
  +-- sass-loader@4.1.1
  | `-- loader-utils@0.2.17
  |   +-- big.js@3.2.0
  |   +-- emojis-list@2.1.0
  |   `-- json5@0.5.1
  +-- script-loader@0.7.2
  +-- semver@5.7.2
  +-- silent-error@1.1.1
  +-- source-map-loader@0.1.6
  | +-- async@0.9.2
  | +-- loader-utils@0.2.17
  | | +-- big.js@3.2.0
  | | +-- emojis-list@2.1.0
  | | `-- json5@0.5.1
  | `-- source-map@0.1.43
  |   `-- amdefine@1.0.1
  +-- style-loader@0.13.2
  +-- stylus@0.54.8
  | +-- css-parse@2.0.0
  | | `-- css@2.2.4
  | |   +-- source-map@0.6.1
  | |   +-- source-map-resolve@0.5.3
  | |   | +-- atob@2.1.2
  | |   | +-- decode-uri-component@0.2.2
  | |   | +-- resolve-url@0.2.1
  | |   | `-- source-map-url@0.4.1
  | |   `-- urix@0.1.0
  | +-- debug@3.1.0
  | +-- mkdirp@1.0.4
  | +-- safer-buffer@2.1.2
  | +-- sax@1.2.4
  | +-- semver@6.3.1
  | `-- source-map@0.7.6
  +-- stylus-loader@2.5.1
  | +-- loader-utils@0.2.17
  | | +-- big.js@3.2.0
  | | +-- emojis-list@2.1.0
  | | `-- json5@0.5.1
  | +-- lodash.clonedeep@4.5.0
  | `-- when@3.6.4
  +-- temp@0.8.3
  | +-- os-tmpdir@1.0.2
  | `-- rimraf@2.2.8
  +-- typescript@2.2.2
  +-- url-loader@0.5.9
  | `-- mime@1.3.6
  +-- walk-sync@0.3.4
  | +-- ensure-posix-path@1.1.1
  | `-- matcher-collection@1.1.2
  +-- webpack@2.2.1
  | +-- acorn@4.0.13
  | +-- acorn-dynamic-import@2.0.2
  | +-- ajv-keywords@1.5.1
  | +-- interpret@1.4.0
  | +-- loader-runner@2.4.0
  | +-- loader-utils@0.2.17
  | | +-- big.js@3.2.0
  | | +-- emojis-list@2.1.0
  | | `-- json5@0.5.1
  | +-- memory-fs@0.4.1
  | +-- node-libs-browser@2.2.1
  | | +-- assert@1.5.1
  | | | +-- object.assign@4.1.7
  | | | | +-- define-properties@1.2.1
  | | | | +-- es-object-atoms@1.1.2
  | | | | `-- has-symbols@1.1.0
  | | | `-- util@0.10.4
  | | |   `-- inherits@2.0.3
  | | +-- browserify-zlib@0.2.0
  | | | `-- pako@1.0.11
  | | +-- buffer@4.9.2
  | | | +-- base64-js@1.5.1
  | | | `-- ieee754@1.2.1
  | | +-- console-browserify@1.2.0
  | | +-- constants-browserify@1.0.0
  | | +-- crypto-browserify@3.12.1
  | | | +-- browserify-cipher@1.0.1
  | | | | +-- browserify-aes@1.2.0
  | | | | | `-- buffer-xor@1.0.3
  | | | | +-- browserify-des@1.0.2
  | | | | | `-- des.js@1.1.0
  | | | | `-- evp_bytestokey@1.0.3
  | | | +-- browserify-sign@4.2.6
  | | | | +-- bn.js@5.2.5
  | | | | +-- browserify-rsa@4.1.1
  | | | | | `-- safe-buffer@5.2.1
  | | | | +-- elliptic@6.6.1
  | | | | | +-- bn.js@4.12.5
  | | | | | +-- brorand@1.1.0
  | | | | | +-- hash.js@1.1.7
  | | | | | +-- hmac-drbg@1.0.1
  | | | | | `-- minimalistic-crypto-utils@1.0.1
  | | | | +-- parse-asn1@5.1.9
  | | | | | +-- asn1.js@4.10.1
  | | | | | | `-- bn.js@4.12.5
  | | | | | `-- safe-buffer@5.2.1
  | | | | `-- safe-buffer@5.2.1
  | | | +-- create-ecdh@4.0.4
  | | | | `-- bn.js@4.12.5
  | | | +-- create-hash@1.2.0
  | | | | +-- cipher-base@1.0.7
  | | | | | `-- safe-buffer@5.2.1
  | | | | +-- md5.js@1.3.5
  | | | | +-- ripemd160@2.0.3
  | | | | | `-- hash-base@3.1.2
  | | | | |   `-- safe-buffer@5.2.1
  | | | | `-- sha.js@2.4.12
  | | | |   `-- safe-buffer@5.2.1
  | | | +-- create-hmac@1.1.7
  | | | +-- diffie-hellman@5.0.3
  | | | | +-- bn.js@4.12.5
  | | | | `-- miller-rabin@4.0.1
  | | | |   `-- bn.js@4.12.5
  | | | +-- hash-base@3.0.5
  | | | | `-- safe-buffer@5.2.1
  | | | +-- pbkdf2@3.1.6
  | | | | +-- safe-buffer@5.2.1
  | | | | `-- to-buffer@1.2.2
  | | | |   +-- isarray@2.0.5
  | | | |   +-- safe-buffer@5.2.1
  | | | |   `-- typed-array-buffer@1.0.3
  | | | |     `-- is-typed-array@1.1.15
  | | | |       `-- which-typed-array@1.1.22
  | | | |         +-- available-typed-arrays@1.0.7
  | | | |         | `-- possible-typed-array-names@1.1.0
  | | | |         +-- for-each@0.3.5
  | | | |         | `-- is-callable@1.2.7
  | | | |         `-- has-tostringtag@1.0.2
  | | | +-- public-encrypt@4.0.3
  | | | | `-- bn.js@4.12.5
  | | | +-- randombytes@2.1.0
  | | | `-- randomfill@1.0.4
  | | +-- domain-browser@1.2.0
  | | +-- events@3.3.0
  | | +-- https-browserify@1.0.0
  | | +-- os-browserify@0.3.0
  | | +-- path-browserify@0.0.1
  | | +-- process@0.11.10
  | | +-- punycode@1.4.1
  | | +-- querystring-es3@0.2.1
  | | +-- stream-browserify@2.0.2
  | | +-- stream-http@2.8.3
  | | | +-- builtin-status-codes@3.0.0
  | | | +-- to-arraybuffer@1.0.1
  | | | `-- xtend@4.0.2
  | | +-- string_decoder@1.1.1
  | | +-- timers-browserify@2.0.12
  | | | `-- setimmediate@1.0.5
  | | +-- tty-browserify@0.0.0
  | | +-- url@0.11.4
  | | | `-- qs@6.15.3
  | | +-- util@0.11.1
  | | | `-- inherits@2.0.3
  | | `-- vm-browserify@1.1.2
  | +-- supports-color@3.2.3
  | | `-- has-flag@1.0.0
  | +-- tapable@0.2.9
  | +-- uglify-js@2.8.29
  | | +-- uglify-to-browserify@1.0.2
  | | `-- yargs@3.10.0
  | |   +-- camelcase@1.2.1
  | |   +-- cliui@2.1.0
  | |   | +-- center-align@0.1.3
  | |   | | +-- align-text@0.1.4
  | |   | | | `-- longest@1.0.1
  | |   | | `-- lazy-cache@1.0.4
  | |   | +-- right-align@0.1.3
  | |   | `-- wordwrap@0.0.2
  | |   `-- window-size@0.1.0
  | +-- watchpack@1.7.5
  | | +-- chokidar@3.6.0
  | | | +-- anymatch@3.1.3
  | | | | `-- picomatch@2.3.2
  | | | +-- braces@3.0.3
  | | | | `-- fill-range@7.1.1
  | | | |   `-- to-regex-range@5.0.1
  | | | |     `-- is-number@7.0.0
  | | | +-- glob-parent@5.1.2
  | | | +-- is-binary-path@2.1.0
  | | | | `-- binary-extensions@2.3.0
  | | | +-- is-glob@4.0.3
  | | | +-- normalize-path@3.0.0
  | | | `-- readdirp@3.6.0
  | | +-- neo-async@2.6.2
  | | `-- watchpack-chokidar2@2.0.1
  | |   `-- chokidar@2.1.8
  | |     +-- anymatch@2.0.0
  | |     | +-- micromatch@3.1.10
  | |     | | +-- braces@2.3.2
  | |     | | | +-- extend-shallow@2.0.1
  | |     | | | `-- fill-range@4.0.0
  | |     | | |   +-- extend-shallow@2.0.1
  | |     | | |   +-- is-number@3.0.0
  | |     | | |   | `-- kind-of@3.2.2
  | |     | | |   `-- to-regex-range@2.1.1
  | |     | | +-- extglob@2.0.4
  | |     | | | +-- define-property@1.0.0
  | |     | | | | `-- is-descriptor@1.0.4
  | |     | | | +-- expand-brackets@2.1.4
  | |     | | | | +-- define-property@0.2.5
  | |     | | | | `-- extend-shallow@2.0.1
  | |     | | | `-- extend-shallow@2.0.1
  | |     | | `-- kind-of@6.0.3
  | |     | `-- normalize-path@2.1.1
  | |     +-- braces@2.3.2
  | |     | +-- array-unique@0.3.2
  | |     | +-- extend-shallow@2.0.1
  | |     | +-- fill-range@4.0.0
  | |     | | +-- is-number@3.0.0
  | |     | | +-- repeat-string@1.6.1
  | |     | | `-- to-regex-range@2.1.1
  | |     | +-- isobject@3.0.1
  | |     | +-- snapdragon-node@2.1.1
  | |     | | +-- define-property@1.0.0
  | |     | | | `-- is-descriptor@1.0.4
  | |     | | `-- snapdragon-util@3.0.1
  | |     | `-- split-string@3.1.0
  | |     +-- glob-parent@3.1.0
  | |     | +-- is-glob@3.1.0
  | |     | `-- path-dirname@1.0.2
  | |     +-- is-binary-path@1.0.1
  | |     | `-- binary-extensions@1.13.1
  | |     +-- readdirp@2.2.1
  | |     `-- upath@1.2.0
  | `-- yargs@6.6.0
  |   +-- camelcase@3.0.0
  |   +-- cliui@3.2.0
  |   | `-- wrap-ansi@2.1.0
  |   +-- os-locale@1.4.0
  |   | `-- lcid@1.0.0
  |   |   `-- invert-kv@1.0.0
  |   +-- require-directory@2.1.1
  |   +-- require-main-filename@1.0.1
  |   +-- string-width@1.0.2
  |   | +-- code-point-at@1.1.0
  |   | `-- is-fullwidth-code-point@1.0.0
  |   |   `-- number-is-nan@1.0.1
  |   +-- which-module@1.0.0
  |   +-- y18n@3.2.2
  |   `-- yargs-parser@4.2.1
  |     `-- camelcase@3.0.0
  +-- webpack-dev-server@2.3.0
  | +-- ansi-html@0.0.7
  | +-- chokidar@1.7.0
  | | +-- anymatch@1.3.2
  | | | +-- micromatch@2.3.11
  | | | | +-- arr-diff@2.0.0
  | | | | +-- array-unique@0.2.1
  | | | | +-- braces@1.8.5
  | | | | +-- expand-brackets@0.1.5
  | | | | `-- extglob@0.3.2
  | | | `-- normalize-path@2.1.1
  | | +-- async-each@1.0.6
  | | +-- glob-parent@2.0.0
  | | +-- is-binary-path@1.0.1
  | | | `-- binary-extensions@1.13.1
  | | +-- is-glob@2.0.1
  | | | `-- is-extglob@1.0.0
  | | `-- readdirp@2.2.1
  | |   `-- micromatch@3.1.10
  | |     +-- arr-diff@4.0.0
  | |     +-- array-unique@0.3.2
  | |     +-- braces@2.3.2
  | |     | +-- extend-shallow@2.0.1
  | |     | `-- fill-range@4.0.0
  | |     |   +-- extend-shallow@2.0.1
  | |     |   +-- is-number@3.0.0
  | |     |   `-- to-regex-range@2.1.1
  | |     +-- define-property@2.0.2
  | |     | `-- is-descriptor@1.0.4
  | |     |   +-- is-accessor-descriptor@1.0.2
  | |     |   `-- is-data-descriptor@1.0.1
  | |     +-- extend-shallow@3.0.2
  | |     | +-- assign-symbols@1.0.0
  | |     | `-- is-extendable@1.0.1
  | |     |   `-- is-plain-object@2.0.4
  | |     +-- extglob@2.0.4
  | |     | +-- define-property@1.0.0
  | |     | | `-- is-descriptor@1.0.4
  | |     | +-- expand-brackets@2.1.4
  | |     | | +-- define-property@0.2.5
  | |     | | | `-- is-descriptor@0.1.8
  | |     | | +-- extend-shallow@2.0.1
  | |     | | `-- posix-character-classes@0.1.1
  | |     | `-- extend-shallow@2.0.1
  | |     +-- fragment-cache@0.2.1
  | |     | `-- map-cache@0.2.2
  | |     +-- kind-of@6.0.3
  | |     +-- nanomatch@1.2.13
  | |     | +-- arr-diff@4.0.0
  | |     | +-- is-windows@1.0.2
  | |     | `-- kind-of@6.0.3
  | |     +-- object.pick@1.3.0
  | |     +-- regex-not@1.0.2
  | |     | `-- safe-regex@1.1.0
  | |     |   `-- ret@0.1.15
  | |     +-- snapdragon@0.8.2
  | |     | +-- base@0.11.2
  | |     | | +-- cache-base@1.0.1
  | |     | | | +-- collection-visit@1.0.0
  | |     | | | | +-- map-visit@1.0.0
  | |     | | | | `-- object-visit@1.0.1
  | |     | | | +-- get-value@2.0.6
  | |     | | | +-- has-value@1.0.0
  | |     | | | | `-- has-values@1.0.0
  | |     | | | |   +-- is-number@3.0.0
  | |     | | | |   | `-- kind-of@3.2.2
  | |     | | | |   `-- kind-of@4.0.0
  | |     | | | +-- set-value@2.0.1
  | |     | | | | `-- extend-shallow@2.0.1
  | |     | | | +-- to-object-path@0.3.0
  | |     | | | +-- union-value@1.0.1
  | |     | | | `-- unset-value@1.0.0
  | |     | | |   `-- has-value@0.3.1
  | |     | | |     +-- has-values@0.1.4
  | |     | | |     `-- isobject@2.1.0
  | |     | | +-- class-utils@0.3.6
  | |     | | | +-- arr-union@3.1.0
  | |     | | | +-- define-property@0.2.5
  | |     | | | `-- static-extend@0.1.2
  | |     | | |   +-- define-property@0.2.5
  | |     | | |   `-- object-copy@0.1.0
  | |     | | |     +-- copy-descriptor@0.1.1
  | |     | | |     `-- define-property@0.2.5
  | |     | | +-- component-emitter@1.3.1
  | |     | | +-- define-property@1.0.0
  | |     | | | `-- is-descriptor@1.0.4
  | |     | | +-- mixin-deep@1.3.2
  | |     | | | `-- is-extendable@1.0.1
  | |     | | `-- pascalcase@0.1.1
  | |     | +-- define-property@0.2.5
  | |     | | `-- is-descriptor@0.1.8
  | |     | +-- extend-shallow@2.0.1
  | |     | `-- use@3.1.1
  | |     `-- to-regex@3.0.2
  | +-- compression@1.8.1
  | | +-- bytes@3.1.2
  | | +-- compressible@2.0.18
  | | +-- negotiator@0.6.4
  | | +-- on-headers@1.1.0
  | | +-- safe-buffer@5.2.1
  | | `-- vary@1.1.2
  | +-- connect-history-api-fallback@1.6.0
  | +-- express@4.22.2
  | | +-- accepts@1.3.8
  | | | `-- negotiator@0.6.3
  | | +-- array-flatten@1.1.1
  | | +-- body-parser@1.20.6
  | | | +-- destroy@1.2.0
  | | | +-- qs@6.15.3
  | | | +-- raw-body@2.5.3
  | | | `-- unpipe@1.0.0
  | | +-- content-disposition@0.5.4
  | | | `-- safe-buffer@5.2.1
  | | +-- content-type@1.0.5
  | | +-- cookie@0.7.2
  | | +-- cookie-signature@1.0.7
  | | +-- depd@2.0.0
  | | +-- encodeurl@2.0.0
  | | +-- escape-html@1.0.3
  | | +-- etag@1.8.1
  | | +-- finalhandler@1.3.2
  | | +-- fresh@0.5.2
  | | +-- http-errors@2.0.1
  | | | `-- toidentifier@1.0.1
  | | +-- merge-descriptors@1.0.3
  | | +-- methods@1.1.2
  | | +-- on-finished@2.4.1
  | | | `-- ee-first@1.1.1
  | | +-- parseurl@1.3.3
  | | +-- path-to-regexp@0.1.13
  | | +-- proxy-addr@2.0.7
  | | | +-- forwarded@0.2.0
  | | | `-- ipaddr.js@1.9.1
  | | +-- qs@6.15.3
  | | | +-- es-define-property@1.0.1
  | | | `-- side-channel@1.1.1
  | | |   +-- object-inspect@1.13.4
  | | |   +-- side-channel-list@1.0.1
  | | |   +-- side-channel-map@1.0.1
  | | |   `-- side-channel-weakmap@1.0.2
  | | +-- range-parser@1.2.1
  | | +-- safe-buffer@5.2.1
  | | +-- send@0.19.2
  | | | +-- ms@2.1.3
  | | | `-- range-parser@1.2.1
  | | +-- serve-static@1.16.3
  | | +-- setprototypeof@1.2.0
  | | +-- statuses@2.0.2
  | | +-- type-is@1.6.18
  | | | `-- media-typer@0.3.0
  | | `-- utils-merge@1.0.1
  | +-- html-entities@1.4.0
  | +-- http-proxy-middleware@0.17.4
  | | +-- http-proxy@1.18.1
  | | | +-- eventemitter3@4.0.7
  | | | +-- follow-redirects@1.16.0
  | | | `-- requires-port@1.0.0
  | | +-- is-glob@3.1.0
  | | | `-- is-extglob@2.1.1
  | | `-- micromatch@2.3.11
  | |   +-- arr-diff@2.0.0
  | |   | `-- arr-flatten@1.1.0
  | |   +-- array-unique@0.2.1
  | |   +-- braces@1.8.5
  | |   | +-- expand-range@1.8.2
  | |   | | `-- fill-range@2.2.4
  | |   | |   +-- is-number@2.1.0
  | |   | |   +-- isobject@2.1.0
  | |   | |   `-- randomatic@3.1.1
  | |   | |     +-- is-number@4.0.0
  | |   | |     +-- kind-of@6.0.3
  | |   | |     `-- math-random@1.0.4
  | |   | +-- preserve@0.2.0
  | |   | `-- repeat-element@1.1.4
  | |   +-- expand-brackets@0.1.5
  | |   | `-- is-posix-bracket@0.1.1
  | |   +-- extglob@0.3.2
  | |   | `-- is-extglob@1.0.0
  | |   +-- filename-regex@2.0.1
  | |   +-- is-extglob@1.0.0
  | |   +-- is-glob@2.0.1
  | |   +-- kind-of@3.2.2
  | |   | `-- is-buffer@1.1.6
  | |   +-- normalize-path@2.1.1
  | |   | `-- remove-trailing-separator@1.1.0
  | |   +-- object.omit@2.0.1
  | |   | +-- for-own@0.1.5
  | |   | | `-- for-in@1.0.2
  | |   | `-- is-extendable@0.1.1
  | |   +-- parse-glob@3.0.4
  | |   | +-- glob-base@0.3.0
  | |   | | +-- glob-parent@2.0.0
  | |   | | `-- is-glob@2.0.1
  | |   | |   `-- is-extglob@1.0.0
  | |   | +-- is-dotfile@1.0.3
  | |   | +-- is-extglob@1.0.0
  | |   | `-- is-glob@2.0.1
  | |   `-- regex-cache@0.4.4
  | |     `-- is-equal-shallow@0.1.3
  | |       `-- is-primitive@2.0.0
  | +-- serve-index@1.9.2
  | | +-- batch@0.6.1
  | | `-- http-errors@1.8.1
  | |   +-- depd@1.1.2
  | |   `-- statuses@1.5.0
  | +-- sockjs@0.3.18
  | | +-- faye-websocket@0.10.0
  | | | `-- websocket-driver@0.7.5
  | | |   +-- http-parser-js@0.5.10
  | | |   `-- websocket-extensions@0.1.4
  | | `-- uuid@2.0.3
  | +-- sockjs-client@1.1.1
  | | +-- eventsource@0.1.6
  | | | `-- original@1.0.2
  | | +-- faye-websocket@0.11.4
  | | +-- json3@3.3.3
  | | `-- url-parse@1.5.10
  | |   `-- querystringify@2.2.0
  | +-- spdy@3.4.7
  | | +-- handle-thing@1.2.5
  | | +-- http-deceiver@1.2.7
  | | +-- select-hose@2.0.0
  | | `-- spdy-transport@2.1.1
  | |   +-- detect-node@2.1.0
  | |   +-- hpack.js@2.1.6
  | |   +-- obuf@1.1.2
  | |   `-- wbuf@1.7.3
  | |     `-- minimalistic-assert@1.0.1
  | `-- yargs@6.6.0
  |   +-- camelcase@3.0.0
  |   +-- cliui@3.2.0
  |   | `-- wrap-ansi@2.1.0
  |   +-- require-main-filename@1.0.1
  |   +-- string-width@1.0.2
  |   | `-- is-fullwidth-code-point@1.0.0
  |   +-- which-module@1.0.0
  |   +-- y18n@3.2.2
  |   `-- yargs-parser@4.2.1
  +-- webpack-merge@2.6.1
  `-- zone.js@0.7.8
```