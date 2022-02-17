import * as el from './utils/element';

/* PrismJS 1.24.1
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+graphql+jsx+sass+scss+typescript&plugins=autoloader+unescaped-markup+toolbar+copy-to-clipboard */
var _self =
		'undefined' != typeof window
			? window
			: 'undefined' != typeof WorkerGlobalScope &&
			  self instanceof WorkerGlobalScope
			? self
			: {},
	Prism = (function (u) {
		var c = /\blang(?:uage)?-([\w-]+)\b/i,
			n = 0,
			e = {},
			M = {
				manual: u.Prism && u.Prism.manual,
				disableWorkerMessageHandler:
					u.Prism && u.Prism.disableWorkerMessageHandler,
				util: {
					encode: function e(n) {
						return n instanceof W
							? new W(n.type, e(n.content), n.alias)
							: Array.isArray(n)
							? n.map(e)
							: n
									.replace(/&/g, '&amp;')
									.replace(/</g, '&lt;')
									.replace(/\u00a0/g, ' ');
					},
					type: function (e) {
						return Object.prototype.toString.call(e).slice(8, -1);
					},
					objId: function (e) {
						return (
							e.__id || Object.defineProperty(e, '__id', { value: ++n }), e.__id
						);
					},
					clone: function t(e, r) {
						var a, n;
						switch (((r = r || {}), M.util.type(e))) {
							case 'Object':
								if (((n = M.util.objId(e)), r[n])) return r[n];
								for (var i in ((a = {}), (r[n] = a), e))
									e.hasOwnProperty(i) && (a[i] = t(e[i], r));
								return a;
							case 'Array':
								return (
									(n = M.util.objId(e)),
									r[n]
										? r[n]
										: ((a = []),
										  (r[n] = a),
										  e.forEach(function (e, n) {
												a[n] = t(e, r);
										  }),
										  a)
								);
							default:
								return e;
						}
					},
					getLanguage: function (e) {
						for (; e && !c.test(e.className); ) e = e.parentElement;
						return e
							? (e.className.match(c) || [, 'none'])[1].toLowerCase()
							: 'none';
					},
					currentScript: function () {
						if ('undefined' == typeof document) return null;
						if ('currentScript' in document) return document.currentScript;
						try {
							throw new Error();
						} catch (e) {
							var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
							if (n) {
								var t = document.getElementsByTagName('script');
								for (var r in t) if (t[r].src == n) return t[r];
							}
							return null;
						}
					},
					isActive: function (e, n, t) {
						for (var r = 'no-' + n; e; ) {
							var a = e.classList;
							if (a.contains(n)) return !0;
							if (a.contains(r)) return !1;
							e = e.parentElement;
						}
						return !!t;
					},
				},
				languages: {
					plain: e,
					plaintext: e,
					text: e,
					txt: e,
					extend: function (e, n) {
						var t = M.util.clone(M.languages[e]);
						for (var r in n) t[r] = n[r];
						return t;
					},
					insertBefore: function (t, e, n, r) {
						var a = (r = r || M.languages)[t],
							i = {};
						for (var l in a)
							if (a.hasOwnProperty(l)) {
								if (l == e)
									for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
								n.hasOwnProperty(l) || (i[l] = a[l]);
							}
						var s = r[t];
						return (
							(r[t] = i),
							M.languages.DFS(M.languages, function (e, n) {
								n === s && e != t && (this[e] = i);
							}),
							i
						);
					},
					DFS: function e(n, t, r, a) {
						a = a || {};
						var i = M.util.objId;
						for (var l in n)
							if (n.hasOwnProperty(l)) {
								t.call(n, l, n[l], r || l);
								var o = n[l],
									s = M.util.type(o);
								'Object' !== s || a[i(o)]
									? 'Array' !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
									: ((a[i(o)] = !0), e(o, t, null, a));
							}
					},
				},
				plugins: {},
				highlightAll: function (e, n) {
					M.highlightAllUnder(document, e, n);
				},
				highlightAllUnder: function (e, n, t) {
					var r = {
						callback: t,
						container: e,
						selector:
							'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
					};
					M.hooks.run('before-highlightall', r),
						(r.elements = Array.prototype.slice.apply(
							r.container.querySelectorAll(r.selector)
						)),
						M.hooks.run('before-all-elements-highlight', r);
					for (var a, i = 0; (a = r.elements[i++]); )
						M.highlightElement(a, !0 === n, r.callback);
				},
				highlightElement: function (e, n, t) {
					var r = M.util.getLanguage(e),
						a = M.languages[r];
					e.className =
						e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r;
					var i = e.parentElement;
					i &&
						'pre' === i.nodeName.toLowerCase() &&
						(i.className =
							i.className.replace(c, '').replace(/\s+/g, ' ') +
							' language-' +
							r);
					var l = { element: e, language: r, grammar: a, code: e.textContent };
					function o(e) {
						(l.highlightedCode = e),
							M.hooks.run('before-insert', l),
							(l.element.innerHTML = l.highlightedCode),
							M.hooks.run('after-highlight', l),
							M.hooks.run('complete', l),
							t && t.call(l.element);
					}
					if (
						(M.hooks.run('before-sanity-check', l),
						(i = l.element.parentElement) &&
							'pre' === i.nodeName.toLowerCase() &&
							!i.hasAttribute('tabindex') &&
							i.setAttribute('tabindex', '0'),
						!l.code)
					)
						return M.hooks.run('complete', l), void (t && t.call(l.element));
					if ((M.hooks.run('before-highlight', l), l.grammar))
						if (n && u.Worker) {
							var s = new Worker(M.filename);
							(s.onmessage = function (e) {
								o(e.data);
							}),
								s.postMessage(
									JSON.stringify({
										language: l.language,
										code: l.code,
										immediateClose: !0,
									})
								);
						} else o(M.highlight(l.code, l.grammar, l.language));
					else o(M.util.encode(l.code));
				},
				highlight: function (e, n, t) {
					var r = { code: e, grammar: n, language: t };
					return (
						M.hooks.run('before-tokenize', r),
						(r.tokens = M.tokenize(r.code, r.grammar)),
						M.hooks.run('after-tokenize', r),
						W.stringify(M.util.encode(r.tokens), r.language)
					);
				},
				tokenize: function (e, n) {
					var t = n.rest;
					if (t) {
						for (var r in t) n[r] = t[r];
						delete n.rest;
					}
					var a = new i();
					return (
						I(a, a.head, e),
						(function e(n, t, r, a, i, l) {
							for (var o in r)
								if (r.hasOwnProperty(o) && r[o]) {
									var s = r[o];
									s = Array.isArray(s) ? s : [s];
									for (var u = 0; u < s.length; ++u) {
										if (l && l.cause == o + ',' + u) return;
										var c = s[u],
											g = c.inside,
											f = !!c.lookbehind,
											h = !!c.greedy,
											d = c.alias;
										if (h && !c.pattern.global) {
											var p = c.pattern.toString().match(/[imsuy]*$/)[0];
											c.pattern = RegExp(c.pattern.source, p + 'g');
										}
										for (
											var v = c.pattern || c, m = a.next, y = i;
											m !== t.tail && !(l && y >= l.reach);
											y += m.value.length, m = m.next
										) {
											var b = m.value;
											if (t.length > n.length) return;
											if (!(b instanceof W)) {
												var k,
													x = 1;
												if (h) {
													if (!(k = z(v, y, n, f))) break;
													var w = k.index,
														A = k.index + k[0].length,
														P = y;
													for (P += m.value.length; P <= w; )
														(m = m.next), (P += m.value.length);
													if (
														((P -= m.value.length),
														(y = P),
														m.value instanceof W)
													)
														continue;
													for (
														var E = m;
														E !== t.tail &&
														(P < A || 'string' == typeof E.value);
														E = E.next
													)
														x++, (P += E.value.length);
													x--, (b = n.slice(y, P)), (k.index -= y);
												} else if (!(k = z(v, 0, b, f))) continue;
												var w = k.index,
													S = k[0],
													O = b.slice(0, w),
													L = b.slice(w + S.length),
													N = y + b.length;
												l && N > l.reach && (l.reach = N);
												var j = m.prev;
												O && ((j = I(t, j, O)), (y += O.length)), q(t, j, x);
												var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
												if (((m = I(t, j, C)), L && I(t, m, L), 1 < x)) {
													var _ = { cause: o + ',' + u, reach: N };
													e(n, t, r, m.prev, y, _),
														l && _.reach > l.reach && (l.reach = _.reach);
												}
											}
										}
									}
								}
						})(e, a, n, a.head, 0),
						(function (e) {
							var n = [],
								t = e.head.next;
							for (; t !== e.tail; ) n.push(t.value), (t = t.next);
							return n;
						})(a)
					);
				},
				hooks: {
					all: {},
					add: function (e, n) {
						var t = M.hooks.all;
						(t[e] = t[e] || []), t[e].push(n);
					},
					run: function (e, n) {
						var t = M.hooks.all[e];
						if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
					},
				},
				Token: W,
			};
		function W(e, n, t, r) {
			(this.type = e),
				(this.content = n),
				(this.alias = t),
				(this.length = 0 | (r || '').length);
		}
		function z(e, n, t, r) {
			e.lastIndex = n;
			var a = e.exec(t);
			if (a && r && a[1]) {
				var i = a[1].length;
				(a.index += i), (a[0] = a[0].slice(i));
			}
			return a;
		}
		function i() {
			var e = { value: null, prev: null, next: null },
				n = { value: null, prev: e, next: null };
			(e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
		}
		function I(e, n, t) {
			var r = n.next,
				a = { value: t, prev: n, next: r };
			return (n.next = a), (r.prev = a), e.length++, a;
		}
		function q(e, n, t) {
			for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
			((n.next = r).prev = n), (e.length -= a);
		}
		if (
			((u.Prism = M),
			(W.stringify = function n(e, t) {
				if ('string' == typeof e) return e;
				if (Array.isArray(e)) {
					var r = '';
					return (
						e.forEach(function (e) {
							r += n(e, t);
						}),
						r
					);
				}
				var a = {
						type: e.type,
						content: n(e.content, t),
						tag: 'span',
						classes: ['token', e.type],
						attributes: {},
						language: t,
					},
					i = e.alias;
				i &&
					(Array.isArray(i)
						? Array.prototype.push.apply(a.classes, i)
						: a.classes.push(i)),
					M.hooks.run('wrap', a);
				var l = '';
				for (var o in a.attributes)
					l +=
						' ' +
						o +
						'="' +
						(a.attributes[o] || '').replace(/"/g, '&quot;') +
						'"';
				return (
					'<' +
					a.tag +
					' class="' +
					a.classes.join(' ') +
					'"' +
					l +
					'>' +
					a.content +
					'</' +
					a.tag +
					'>'
				);
			}),
			!u.document)
		)
			return (
				u.addEventListener &&
					(M.disableWorkerMessageHandler ||
						u.addEventListener(
							'message',
							function (e) {
								var n = JSON.parse(e.data),
									t = n.language,
									r = n.code,
									a = n.immediateClose;
								u.postMessage(M.highlight(r, M.languages[t], t)),
									a && u.close();
							},
							!1
						)),
				M
			);
		var t = M.util.currentScript();
		function r() {
			M.manual || M.highlightAll();
		}
		if (
			(t &&
				((M.filename = t.src),
				t.hasAttribute('data-manual') && (M.manual = !0)),
			!M.manual)
		) {
			var a = document.readyState;
			'loading' === a || ('interactive' === a && t && t.defer)
				? document.addEventListener('DOMContentLoaded', r)
				: window.requestAnimationFrame
				? window.requestAnimationFrame(r)
				: window.setTimeout(r, 16);
		}
		return M;
	})(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism),
	'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
	comment: /<!--[\s\S]*?-->/,
	prolog: /<\?[\s\S]+?\?>/,
	doctype: {
		pattern:
			/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: !0,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: !0,
				greedy: !0,
				inside: null,
			},
			string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
			punctuation: /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/,
			name: /[^\s<>'"]+/,
		},
	},
	cdata: /<!\[CDATA\[[\s\S]*?\]\]>/i,
	tag: {
		pattern:
			/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: !0,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/,
				inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
				},
			},
			punctuation: /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: { namespace: /^[^\s>\/:]+:/ },
			},
		},
	},
	entity: [
		{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
		/&#x?[\da-f]{1,8};/i,
	],
}),
	(Prism.languages.markup.tag.inside['attr-value'].inside.entity =
		Prism.languages.markup.entity),
	(Prism.languages.markup.doctype.inside['internal-subset'].inside =
		Prism.languages.markup),
	Prism.hooks.add('wrap', function (a) {
		'entity' === a.type &&
			(a.attributes.title = a.content.replace(/&amp;/, '&'));
	}),
	Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
		value: function (a, e) {
			var s = {};
			(s['language-' + e] = {
				pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
				lookbehind: !0,
				inside: Prism.languages[e],
			}),
				(s.cdata = /^<!\[CDATA\[|\]\]>$/i);
			var t = {
				'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
			};
			t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
			var n = {};
			(n[a] = {
				pattern: RegExp(
					'(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
						/__/g,
						function () {
							return a;
						}
					),
					'i'
				),
				lookbehind: !0,
				greedy: !0,
				inside: t,
			}),
				Prism.languages.insertBefore('markup', 'cdata', n);
		},
	}),
	Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
		value: function (a, e) {
			Prism.languages.markup.tag.inside['special-attr'].push({
				pattern: RegExp(
					'(^|["\'\\s])(?:' +
						a +
						')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))',
					'i'
				),
				lookbehind: !0,
				inside: {
					'attr-name': /^[^\s=]+/,
					'attr-value': {
						pattern: /=[\s\S]+/,
						inside: {
							value: {
								pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
								lookbehind: !0,
								alias: [e, 'language-' + e],
								inside: Prism.languages[e],
							},
							punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
						},
					},
				},
			});
		},
	}),
	(Prism.languages.html = Prism.languages.markup),
	(Prism.languages.mathml = Prism.languages.markup),
	(Prism.languages.svg = Prism.languages.markup),
	(Prism.languages.xml = Prism.languages.extend('markup', {})),
	(Prism.languages.ssml = Prism.languages.xml),
	(Prism.languages.atom = Prism.languages.xml),
	(Prism.languages.rss = Prism.languages.xml);
!(function (s) {
	var e =
		/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
	(s.languages.css = {
		comment: /\/\*[\s\S]*?\*\//,
		atrule: {
			pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
			inside: {
				rule: /^@[\w-]+/,
				'selector-function-argument': {
					pattern:
						/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: !0,
					alias: 'selector',
				},
				keyword: {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: !0,
				},
			},
		},
		url: {
			pattern: RegExp(
				'\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)',
				'i'
			),
			greedy: !0,
			inside: {
				function: /^url/i,
				punctuation: /^\(|\)$/,
				string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
			},
		},
		selector: {
			pattern: RegExp(
				'(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
					e.source +
					')*(?=\\s*\\{)'
			),
			lookbehind: !0,
		},
		string: { pattern: e, greedy: !0 },
		property: {
			pattern:
				/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: !0,
		},
		important: /!important\b/i,
		function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
		punctuation: /[(){};:,]/,
	}),
		(s.languages.css.atrule.inside.rest = s.languages.css);
	var t = s.languages.markup;
	t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'));
})(Prism);
Prism.languages.clike = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
	],
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0,
	},
	'class-name': {
		pattern:
			/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /[.\\]/ },
	},
	keyword:
		/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	boolean: /\b(?:true|false)\b/,
	function: /\b\w+(?=\()/,
	number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern:
				/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
			lookbehind: !0,
		},
	],
	keyword: [
		{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
		{
			pattern:
				/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: !0,
		},
	],
	function:
		/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	number:
		/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
	operator:
		/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
	(Prism.languages.javascript['class-name'][0].pattern =
		/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
	Prism.languages.insertBefore('javascript', 'keyword', {
		regex: {
			pattern:
				/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
			lookbehind: !0,
			greedy: !0,
			inside: {
				'regex-source': {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: !0,
					alias: 'language-regex',
					inside: Prism.languages.regex,
				},
				'regex-delimiter': /^\/|\/$/,
				'regex-flags': /^[a-z]+$/,
			},
		},
		'function-variable': {
			pattern:
				/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: 'function',
		},
		parameter: [
			{
				pattern:
					/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern:
					/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern:
					/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern:
					/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
		],
		constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
	}),
	Prism.languages.insertBefore('javascript', 'string', {
		hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
		'template-string': {
			pattern:
				/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: !0,
			inside: {
				'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
				interpolation: {
					pattern:
						/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: !0,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation',
						},
						rest: Prism.languages.javascript,
					},
				},
				string: /[\s\S]+/,
			},
		},
	}),
	Prism.languages.markup &&
		(Prism.languages.markup.tag.addInlined('script', 'javascript'),
		Prism.languages.markup.tag.addAttribute(
			'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
			'javascript'
		)),
	(Prism.languages.js = Prism.languages.javascript);
(Prism.languages.graphql = {
	comment: /#.*/,
	description: {
		pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
		greedy: !0,
		alias: 'string',
		inside: {
			'language-markdown': {
				pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
				lookbehind: !0,
				inside: Prism.languages.markdown,
			},
		},
	},
	string: {
		pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
		greedy: !0,
	},
	number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	boolean: /\b(?:true|false)\b/,
	variable: /\$[a-z_]\w*/i,
	directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
	'attr-name': {
		pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
		greedy: !0,
	},
	'atom-input': { pattern: /[A-Z]\w*Input(?=!?.*$)/m, alias: 'class-name' },
	scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
	constant: /\b[A-Z][A-Z_\d]*\b/,
	'class-name': {
		pattern:
			/(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
		lookbehind: !0,
	},
	fragment: {
		pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
		lookbehind: !0,
		alias: 'function',
	},
	'definition-mutation': {
		pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
		lookbehind: !0,
		alias: 'function',
	},
	'definition-query': {
		pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
		lookbehind: !0,
		alias: 'function',
	},
	keyword:
		/\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
	operator: /[!=|&]|\.{3}/,
	'property-query': /\w+(?=\s*\()/,
	object: /\w+(?=\s*\{)/,
	punctuation: /[!(){}\[\]:=,]/,
	property: /\w+/,
}),
	Prism.hooks.add('after-tokenize', function (n) {
		if ('graphql' === n.language)
			for (
				var o = n.tokens.filter(function (n) {
						return (
							'string' != typeof n &&
							'comment' !== n.type &&
							'scalar' !== n.type
						);
					}),
					s = 0;
				s < o.length;

			) {
				var t = o[s++];
				if ('keyword' === t.type && 'mutation' === t.content) {
					var e = [];
					if (
						c(['definition-mutation', 'punctuation']) &&
						'(' === l(1).content
					) {
						s += 2;
						var a = f(/^\($/, /^\)$/);
						if (-1 === a) continue;
						for (; s < a; s++) {
							var r = l(0);
							'variable' === r.type &&
								(m(r, 'variable-input'), e.push(r.content));
						}
						s = a + 1;
					}
					if (
						c(['punctuation', 'property-query']) &&
						'{' === l(0).content &&
						(s++, m(l(0), 'property-mutation'), 0 < e.length)
					) {
						var i = f(/^\{$/, /^\}$/);
						if (-1 === i) continue;
						for (var u = s; u < i; u++) {
							var p = o[u];
							'variable' === p.type &&
								0 <= e.indexOf(p.content) &&
								m(p, 'variable-input');
						}
					}
				}
			}
		function l(n) {
			return o[s + n];
		}
		function c(n, t) {
			t = t || 0;
			for (var e = 0; e < n.length; e++) {
				var a = l(e + t);
				if (!a || a.type !== n[e]) return !1;
			}
			return !0;
		}
		function f(n, t) {
			for (var e = 1, a = s; a < o.length; a++) {
				var r = o[a],
					i = r.content;
				if ('punctuation' === r.type && 'string' == typeof i)
					if (n.test(i)) e++;
					else if (t.test(i) && 0 === --e) return a;
			}
			return -1;
		}
		function m(n, t) {
			var e = n.alias;
			e ? Array.isArray(e) || (n.alias = e = [e]) : (n.alias = e = []),
				e.push(t);
		}
	});
!(function (i) {
	var t = i.util.clone(i.languages.javascript),
		e = '(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})';
	function n(t, n) {
		return (
			(t = t
				.replace(/<S>/g, function () {
					return '(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)';
				})
				.replace(/<BRACES>/g, function () {
					return '(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})';
				})
				.replace(/<SPREAD>/g, function () {
					return e;
				})),
			RegExp(t, n)
		);
	}
	(e = n(e).source),
		(i.languages.jsx = i.languages.extend('markup', t)),
		(i.languages.jsx.tag.pattern = n(
			'</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|\'(?:\\\\[^]|[^\\\\\'])*\'|[^\\s{\'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>'
		)),
		(i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
		(i.languages.jsx.tag.inside['attr-value'].pattern =
			/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/i),
		(i.languages.jsx.tag.inside.tag.inside['class-name'] =
			/^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
		(i.languages.jsx.tag.inside.comment = t.comment),
		i.languages.insertBefore(
			'inside',
			'attr-name',
			{ spread: { pattern: n('<SPREAD>'), inside: i.languages.jsx } },
			i.languages.jsx.tag
		),
		i.languages.insertBefore(
			'inside',
			'special-attr',
			{
				script: {
					pattern: n('=<BRACES>'),
					inside: {
						'script-punctuation': { pattern: /^=(?=\{)/, alias: 'punctuation' },
						rest: i.languages.jsx,
					},
					alias: 'language-javascript',
				},
			},
			i.languages.jsx.tag
		);
	var o = function (t) {
			return t
				? 'string' == typeof t
					? t
					: 'string' == typeof t.content
					? t.content
					: t.content.map(o).join('')
				: '';
		},
		r = function (t) {
			for (var n = [], e = 0; e < t.length; e++) {
				var a = t[e],
					s = !1;
				if (
					('string' != typeof a &&
						('tag' === a.type && a.content[0] && 'tag' === a.content[0].type
							? '</' === a.content[0].content[0].content
								? 0 < n.length &&
								  n[n.length - 1].tagName === o(a.content[0].content[1]) &&
								  n.pop()
								: '/>' === a.content[a.content.length - 1].content ||
								  n.push({
										tagName: o(a.content[0].content[1]),
										openedBraces: 0,
								  })
							: 0 < n.length && 'punctuation' === a.type && '{' === a.content
							? n[n.length - 1].openedBraces++
							: 0 < n.length &&
							  0 < n[n.length - 1].openedBraces &&
							  'punctuation' === a.type &&
							  '}' === a.content
							? n[n.length - 1].openedBraces--
							: (s = !0)),
					(s || 'string' == typeof a) &&
						0 < n.length &&
						0 === n[n.length - 1].openedBraces)
				) {
					var g = o(a);
					e < t.length - 1 &&
						('string' == typeof t[e + 1] || 'plain-text' === t[e + 1].type) &&
						((g += o(t[e + 1])), t.splice(e + 1, 1)),
						0 < e &&
							('string' == typeof t[e - 1] || 'plain-text' === t[e - 1].type) &&
							((g = o(t[e - 1]) + g), t.splice(e - 1, 1), e--),
						(t[e] = new i.Token('plain-text', g, null, g));
				}
				a.content && 'string' != typeof a.content && r(a.content);
			}
		};
	i.hooks.add('after-tokenize', function (t) {
		('jsx' !== t.language && 'tsx' !== t.language) || r(t.tokens);
	});
})(Prism);
!(function (e) {
	(e.languages.sass = e.languages.extend('css', {
		comment: {
			pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
			lookbehind: !0,
		},
	})),
		e.languages.insertBefore('sass', 'atrule', {
			'atrule-line': {
				pattern: /^(?:[ \t]*)[@+=].+/m,
				inside: { atrule: /(?:@[\w-]+|[+=])/m },
			},
		}),
		delete e.languages.sass.atrule;
	var t = /\$[-\w]+|#\{\$[-\w]+\}/,
		a = [
			/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
			{ pattern: /(\s)-(?=\s)/, lookbehind: !0 },
		];
	e.languages.insertBefore('sass', 'property', {
		'variable-line': {
			pattern: /^[ \t]*\$.+/m,
			inside: { punctuation: /:/, variable: t, operator: a },
		},
		'property-line': {
			pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
			inside: {
				property: [
					/[^:\s]+(?=\s*:)/,
					{ pattern: /(:)[^:\s]+/, lookbehind: !0 },
				],
				punctuation: /:/,
				variable: t,
				operator: a,
				important: e.languages.sass.important,
			},
		},
	}),
		delete e.languages.sass.property,
		delete e.languages.sass.important,
		e.languages.insertBefore('sass', 'punctuation', {
			selector: {
				pattern:
					/([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/,
				lookbehind: !0,
			},
		});
})(Prism);
(Prism.languages.scss = Prism.languages.extend('css', {
	comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
	atrule: {
		pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
		inside: { rule: /@[\w-]+/ },
	},
	url: /(?:[-a-z]+-)?url(?=\()/i,
	selector: {
		pattern:
			/(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/m,
		inside: {
			parent: { pattern: /&/, alias: 'important' },
			placeholder: /%[-\w]+/,
			variable: /\$[-\w]+|#\{\$[-\w]+\}/,
		},
	},
	property: {
		pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
		inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
	},
})),
	Prism.languages.insertBefore('scss', 'atrule', {
		keyword: [
			/@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
			{ pattern: /( )(?:from|through)(?= )/, lookbehind: !0 },
		],
	}),
	Prism.languages.insertBefore('scss', 'important', {
		variable: /\$[-\w]+|#\{\$[-\w]+\}/,
	}),
	Prism.languages.insertBefore('scss', 'function', {
		'module-modifier': {
			pattern: /\b(?:as|with|show|hide)\b/i,
			alias: 'keyword',
		},
		placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
		statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
		boolean: /\b(?:true|false)\b/,
		null: { pattern: /\bnull\b/, alias: 'keyword' },
		operator: {
			pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
			lookbehind: !0,
		},
	}),
	(Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
!(function (e) {
	(e.languages.typescript = e.languages.extend('javascript', {
		'class-name': {
			pattern:
				/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
			lookbehind: !0,
			greedy: !0,
			inside: null,
		},
		builtin:
			/\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
	})),
		e.languages.typescript.keyword.push(
			/\b(?:abstract|as|declare|implements|is|keyof|readonly|require)\b/,
			/\b(?:asserts|infer|interface|module|namespace|type)(?!\s*[^\s_${}*a-zA-Z\xA0-\uFFFF])/
		),
		delete e.languages.typescript.parameter;
	var s = e.languages.extend('typescript', {});
	delete s['class-name'],
		(e.languages.typescript['class-name'].inside = s),
		e.languages.insertBefore('typescript', 'function', {
			decorator: {
				pattern: /@[$\w\xA0-\uFFFF]+/,
				inside: {
					at: { pattern: /^@/, alias: 'operator' },
					function: /^[\s\S]+/,
				},
			},
			'generic-function': {
				pattern:
					/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
				greedy: !0,
				inside: {
					function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
					generic: { pattern: /<[\s\S]+/, alias: 'class-name', inside: s },
				},
			},
		}),
		(e.languages.ts = e.languages.typescript);
})(Prism);
!(function () {
	if ('undefined' != typeof Prism && 'undefined' != typeof document) {
		var l = {
				javascript: 'clike',
				actionscript: 'javascript',
				apex: ['clike', 'sql'],
				arduino: 'cpp',
				aspnet: ['markup', 'csharp'],
				birb: 'clike',
				bison: 'c',
				c: 'clike',
				csharp: 'clike',
				cpp: 'c',
				cfscript: 'clike',
				chaiscript: ['clike', 'cpp'],
				coffeescript: 'javascript',
				crystal: 'ruby',
				'css-extras': 'css',
				d: 'clike',
				dart: 'clike',
				django: 'markup-templating',
				ejs: ['javascript', 'markup-templating'],
				etlua: ['lua', 'markup-templating'],
				erb: ['ruby', 'markup-templating'],
				fsharp: 'clike',
				'firestore-security-rules': 'clike',
				flow: 'javascript',
				ftl: 'markup-templating',
				gml: 'clike',
				glsl: 'c',
				go: 'clike',
				groovy: 'clike',
				haml: 'ruby',
				handlebars: 'markup-templating',
				haxe: 'clike',
				hlsl: 'c',
				idris: 'haskell',
				java: 'clike',
				javadoc: ['markup', 'java', 'javadoclike'],
				jolie: 'clike',
				jsdoc: ['javascript', 'javadoclike', 'typescript'],
				'js-extras': 'javascript',
				json5: 'json',
				jsonp: 'json',
				'js-templates': 'javascript',
				kotlin: 'clike',
				latte: ['clike', 'markup-templating', 'php'],
				less: 'css',
				lilypond: 'scheme',
				liquid: 'markup-templating',
				markdown: 'markup',
				'markup-templating': 'markup',
				mongodb: 'javascript',
				n4js: 'javascript',
				objectivec: 'c',
				opencl: 'c',
				parser: 'markup',
				php: 'markup-templating',
				phpdoc: ['php', 'javadoclike'],
				'php-extras': 'php',
				plsql: 'sql',
				processing: 'clike',
				protobuf: 'clike',
				pug: ['markup', 'javascript'],
				purebasic: 'clike',
				purescript: 'haskell',
				qsharp: 'clike',
				qml: 'javascript',
				qore: 'clike',
				racket: 'scheme',
				jsx: ['markup', 'javascript'],
				tsx: ['jsx', 'typescript'],
				reason: 'clike',
				ruby: 'clike',
				sass: 'css',
				scss: 'css',
				scala: 'java',
				'shell-session': 'bash',
				smarty: 'markup-templating',
				solidity: 'clike',
				soy: 'markup-templating',
				sparql: 'turtle',
				sqf: 'clike',
				squirrel: 'clike',
				swift: 'clike',
				't4-cs': ['t4-templating', 'csharp'],
				't4-vb': ['t4-templating', 'vbnet'],
				tap: 'yaml',
				tt2: ['clike', 'markup-templating'],
				textile: 'markup',
				twig: 'markup',
				typescript: 'javascript',
				v: 'clike',
				vala: 'clike',
				vbnet: 'basic',
				velocity: 'markup',
				wiki: 'markup',
				xeora: 'markup',
				'xml-doc': 'markup',
				xquery: 'markup',
			},
			n = {
				html: 'markup',
				xml: 'markup',
				svg: 'markup',
				mathml: 'markup',
				ssml: 'markup',
				atom: 'markup',
				rss: 'markup',
				js: 'javascript',
				g4: 'antlr4',
				adoc: 'asciidoc',
				shell: 'bash',
				shortcode: 'bbcode',
				rbnf: 'bnf',
				oscript: 'bsl',
				cs: 'csharp',
				dotnet: 'csharp',
				cfc: 'cfscript',
				coffee: 'coffeescript',
				conc: 'concurnas',
				jinja2: 'django',
				'dns-zone': 'dns-zone-file',
				dockerfile: 'docker',
				gv: 'dot',
				eta: 'ejs',
				xlsx: 'excel-formula',
				xls: 'excel-formula',
				gamemakerlanguage: 'gml',
				hbs: 'handlebars',
				hs: 'haskell',
				idr: 'idris',
				gitignore: 'ignore',
				hgignore: 'ignore',
				npmignore: 'ignore',
				webmanifest: 'json',
				kt: 'kotlin',
				kts: 'kotlin',
				kum: 'kumir',
				tex: 'latex',
				context: 'latex',
				ly: 'lilypond',
				emacs: 'lisp',
				elisp: 'lisp',
				'emacs-lisp': 'lisp',
				md: 'markdown',
				moon: 'moonscript',
				n4jsd: 'n4js',
				nani: 'naniscript',
				objc: 'objectivec',
				qasm: 'openqasm',
				objectpascal: 'pascal',
				px: 'pcaxis',
				pcode: 'peoplecode',
				pq: 'powerquery',
				mscript: 'powerquery',
				pbfasm: 'purebasic',
				purs: 'purescript',
				py: 'python',
				qs: 'qsharp',
				rkt: 'racket',
				rpy: 'renpy',
				robot: 'robotframework',
				rb: 'ruby',
				'sh-session': 'shell-session',
				shellsession: 'shell-session',
				smlnj: 'sml',
				sol: 'solidity',
				sln: 'solution-file',
				rq: 'sparql',
				t4: 't4-cs',
				trig: 'turtle',
				ts: 'typescript',
				tsconfig: 'typoscript',
				uscript: 'unrealscript',
				uc: 'unrealscript',
				url: 'uri',
				vb: 'visual-basic',
				vba: 'visual-basic',
				mathematica: 'wolfram',
				nb: 'wolfram',
				wl: 'wolfram',
				xeoracube: 'xeora',
				yml: 'yaml',
			},
			p = {},
			e = 'components/',
			a = Prism.util.currentScript();
		if (a) {
			var r =
					/\bplugins\/autoloader\/prism-autoloader\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i,
				s = /(^|\/)[\w-]+\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i,
				i = a.getAttribute('data-autoloader-path');
			if (null != i) e = i.trim().replace(/\/?$/, '/');
			else {
				var t = a.src;
				r.test(t)
					? (e = t.replace(r, 'components/'))
					: s.test(t) && (e = t.replace(s, '$1components/'));
			}
		}
		var o = (Prism.plugins.autoloader = {
			languages_path: e,
			use_minified: !0,
			loadLanguages: m,
		});
		Prism.hooks.add('complete', function (e) {
			var a = e.element,
				r = e.language;
			if (a && r && 'none' !== r) {
				var s = (function (e) {
					var a = (e.getAttribute('data-dependencies') || '').trim();
					if (!a) {
						var r = e.parentElement;
						r &&
							'pre' === r.tagName.toLowerCase() &&
							(a = (r.getAttribute('data-dependencies') || '').trim());
					}
					return a ? a.split(/\s*,\s*/g) : [];
				})(a);
				/^diff-./i.test(r)
					? (s.push('diff'), s.push(r.substr('diff-'.length)))
					: s.push(r),
					s.every(u) ||
						m(s, function () {
							Prism.highlightElement(a);
						});
			}
		});
	}
	function u(e) {
		if (0 <= e.indexOf('!')) return !1;
		if ((e = n[e] || e) in Prism.languages) return !0;
		var a = p[e];
		return a && !a.error && !1 === a.loading;
	}
	function m(e, a, r) {
		'string' == typeof e && (e = [e]);
		var s = e.length,
			i = 0,
			t = !1;
		function c() {
			t || (++i === s && a && a(e));
		}
		0 !== s
			? e.forEach(function (e) {
					!(function (a, r, s) {
						var i = 0 <= a.indexOf('!');
						function e() {
							var e = p[a];
							e || (e = p[a] = { callbacks: [] }),
								e.callbacks.push({ success: r, error: s }),
								!i && u(a)
									? k(a, 'success')
									: !i && e.error
									? k(a, 'error')
									: (!i && e.loading) ||
									  ((e.loading = !0),
									  (e.error = !1),
									  (function (e, a, r) {
											var s = document.createElement('script');
											(s.src = e),
												(s.async = !0),
												(s.onload = function () {
													document.body.removeChild(s), a && a();
												}),
												(s.onerror = function () {
													document.body.removeChild(s), r && r();
												}),
												document.body.appendChild(s);
									  })(
											(function (e) {
												return (
													o.languages_path +
													'prism-' +
													e +
													(o.use_minified ? '.min' : '') +
													'.js'
												);
											})(a),
											function () {
												(e.loading = !1), k(a, 'success');
											},
											function () {
												(e.loading = !1), (e.error = !0), k(a, 'error');
											}
									  ));
						}
						(a = a.replace('!', '')), (a = n[a] || a);
						var t = l[a];
						t && t.length ? m(t, e, s) : e();
					})(e, c, function () {
						t || ((t = !0), r && r(e));
					});
			  })
			: a && setTimeout(a, 0);
	}
	function k(e, a) {
		if (p[e]) {
			for (var r = p[e].callbacks, s = 0, i = r.length; s < i; s++) {
				var t = r[s][a];
				t && setTimeout(t, 0);
			}
			r.length = 0;
		}
	}
})();
'undefined' != typeof Prism &&
	'undefined' != typeof document &&
	(Element.prototype.matches ||
		(Element.prototype.matches =
			Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector),
	(Prism.plugins.UnescapedMarkup = !0),
	Prism.hooks.add('before-highlightall', function (e) {
		e.selector +=
			', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]';
	}),
	Prism.hooks.add('before-sanity-check', function (e) {
		var t = e.element;
		if (t.matches('script[type="text/plain"]')) {
			var a = document.createElement('code'),
				c = document.createElement('pre');
			c.className = a.className = t.className;
			var n = t.dataset;
			return (
				Object.keys(n || {}).forEach(function (e) {
					Object.prototype.hasOwnProperty.call(n, e) && (c.dataset[e] = n[e]);
				}),
				(a.textContent = e.code =
					e.code.replace(/&lt;\/script(?:>|&gt;)/gi, '</script>')),
				c.appendChild(a),
				t.parentNode.replaceChild(c, t),
				void (e.element = a)
			);
		}
		if (!e.code) {
			var o = t.childNodes;
			1 === o.length &&
				'#comment' == o[0].nodeName &&
				(t.textContent = e.code = o[0].textContent);
		}
	}));
!(function () {
	if ('undefined' != typeof Prism && 'undefined' != typeof document) {
		var i = [],
			l = {},
			d = function () {};
		Prism.plugins.toolbar = {};
		var e = (Prism.plugins.toolbar.registerButton = function (e, n) {
				var t;
				(t =
					'function' == typeof n
						? n
						: function (e) {
								var t;
								return (
									'function' == typeof n.onClick
										? (((t = document.createElement('button')).type = 'button'),
										  t.addEventListener('click', function () {
												n.onClick.call(this, e);
										  }))
										: 'string' == typeof n.url
										? ((t = document.createElement('a')).href = n.url)
										: (t = document.createElement('span')),
									n.className && t.classList.add(n.className),
									(t.textContent = n.text),
									t
								);
						  }),
					e in l
						? console.warn(
								'There is a button with the key "' + e + '" registered already.'
						  )
						: i.push((l[e] = t));
			}),
			t = (Prism.plugins.toolbar.hook = function (a) {
				var e = a.element.parentNode;
				if (
					e &&
					/pre/i.test(e.nodeName) &&
					!e.parentNode.classList.contains('code-toolbar')
				) {
					var t = document.createElement('div');
					t.classList.add('code-toolbar'),
						e.parentNode.insertBefore(t, e),
						t.appendChild(e);
					var r = document.createElement('div');
					r.classList.add('toolbar');
					var n = i,
						o = (function (e) {
							for (; e; ) {
								var t = e.getAttribute('data-toolbar-order');
								if (null != t)
									return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
								e = e.parentElement;
							}
						})(a.element);
					o &&
						(n = o.map(function (e) {
							return l[e] || d;
						})),
						n.forEach(function (e) {
							var t = e(a);
							if (t) {
								var n = document.createElement('div');
								n.classList.add('toolbar-item'),
									n.appendChild(t),
									r.appendChild(n);
							}
						}),
						t.appendChild(r);
				}
			});
		e('label', function (e) {
			var t = e.element.parentNode;
			if (t && /pre/i.test(t.nodeName) && t.hasAttribute('data-label')) {
				var n,
					a,
					r = t.getAttribute('data-label');
				try {
					a = document.querySelector('template#' + r);
				} catch (e) {}
				return (
					a
						? (n = a.content)
						: (t.hasAttribute('data-url')
								? ((n = document.createElement('a')).href =
										t.getAttribute('data-url'))
								: (n = document.createElement('span')),
						  (n.textContent = r)),
					n
				);
			}
		}),
			Prism.hooks.add('complete', t);
	}
})();
!(function () {
	function u(t, e) {
		t.addEventListener('click', function () {
			!(function (t) {
				navigator.clipboard
					? navigator.clipboard
							.writeText(t.getText())
							.then(t.success, function () {
								o(t);
							})
					: o(t);
			})(e);
		});
	}
	function o(e) {
		var t = document.createElement('textarea');
		(t.value = e.getText()),
			(t.style.top = '0'),
			(t.style.left = '0'),
			(t.style.position = 'fixed'),
			document.body.appendChild(t),
			t.focus(),
			t.select();
		try {
			var o = document.execCommand('copy');
			setTimeout(function () {
				o ? e.success() : e.error();
			}, 1);
		} catch (t) {
			setTimeout(function () {
				e.error(t);
			}, 1);
		}
		document.body.removeChild(t);
	}
	'undefined' != typeof Prism &&
		'undefined' != typeof document &&
		(Prism.plugins.toolbar
			? Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (t) {
					var e = t.element,
						o = (function (t) {
							var e = {
								copy: 'Copy',
								'copy-error': 'Press Ctrl+C to copy',
								'copy-success': 'Copied!',
								'copy-timeout': 5e3,
							};
							for (var o in e) {
								for (
									var n = 'data-prismjs-' + o, c = t;
									c && !c.hasAttribute(n);

								)
									c = c.parentElement;
								c && (e[o] = c.getAttribute(n));
							}
							return e;
						})(e),
						n = document.createElement('button');
					(n.className = 'copy-to-clipboard-button'),
						n.setAttribute('type', 'button');
					var c = document.createElement('span');
					return (
						n.appendChild(c),
						i('copy'),
						u(n, {
							getText: function () {
								return e.textContent;
							},
							success: function () {
								i('copy-success'), r();
							},
							error: function () {
								i('copy-error'),
									setTimeout(function () {
										!(function (t) {
											window.getSelection().selectAllChildren(t);
										})(e);
									}, 1),
									r();
							},
						}),
						n
					);
					function r() {
						setTimeout(function () {
							i('copy');
						}, o['copy-timeout']);
					}
					function i(t) {
						(c.textContent = o[t]), n.setAttribute('data-copy-state', t);
					}
			  })
			: console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.'));
})();

//  Aether
function onPageLoad() {
	const header = document.querySelector('.notion-header');
	const setActivePage = () => {
		const currentPage = document.querySelectorAll(
			'a[href="' + window.location.pathname + '"]'
		);
		currentPage.forEach(function (page) {
			if (
				!page.classList.contains('super-navbar__logo') &&
				!page.parentNode.classList.contains('notion-image')
			) {
				page.classList.add('page-active');
			}
			const pageIcon = page.querySelector('.notion-page__icon');
			if (pageIcon) {
				pageIcon.setAttribute(
					'style',
					'opacity:1!important; filter:grayscale(0%)!important;'
				);
			}
		});
	};
	setActivePage();

	// const initBadge = () => {
	//     const footer = document.querySelector('.notion-root>.notion-callout>.notion-callout__content')
	//     const badge = document.createElement('a')
	//     const wrapper = document.createElement('span')
	//     const logo = document.createElement('img')
	//     logo.setAttribute('src', 'https://sites.super.so/aether/icon.svg')
	//     logo.style.width = '18px'
	//     wrapper.textContent = 'Made with Super'
	//     badge.classList.add('super-badge')
	//     badge.href = 'https://s.super.so/badge'
	//     badge.appendChild(wrapper)
	//     badge.prepend(logo)
	//     footer.appendChild(badge)
	// }
	// initBadge()

	const config = { subtree: true, characterData: true };

	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === 'characterData') {
				setActivePage();
				// initBadge()
			}
		}
	};

	const observer = new MutationObserver(callback);
	observer.observe(header, config);
}

document.addEventListener('DOMContentLoaded', onPageLoad);
