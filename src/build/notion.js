var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/js/notion.js
var require_notion = __commonJS({
  "src/js/notion.js"(exports, module) {
    var _self = typeof window != "undefined" ? window : typeof WorkerGlobalScope != "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism = function(u) {
      var c = /\blang(?:uage)?-([\w-]+)\b/i, n = 0, e = {}, M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e2(n2) {
            return n2 instanceof W ? new W(n2.type, e2(n2.content), n2.alias) : Array.isArray(n2) ? n2.map(e2) : n2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          type: function(e2) {
            return Object.prototype.toString.call(e2).slice(8, -1);
          },
          objId: function(e2) {
            return e2.__id || Object.defineProperty(e2, "__id", { value: ++n }), e2.__id;
          },
          clone: function t2(e2, r2) {
            var a2, n2;
            switch (r2 = r2 || {}, M.util.type(e2)) {
              case "Object":
                if (n2 = M.util.objId(e2), r2[n2])
                  return r2[n2];
                for (var i2 in a2 = {}, r2[n2] = a2, e2)
                  e2.hasOwnProperty(i2) && (a2[i2] = t2(e2[i2], r2));
                return a2;
              case "Array":
                return n2 = M.util.objId(e2), r2[n2] ? r2[n2] : (a2 = [], r2[n2] = a2, e2.forEach(function(e3, n3) {
                  a2[n3] = t2(e3, r2);
                }), a2);
              default:
                return e2;
            }
          },
          getLanguage: function(e2) {
            for (; e2 && !c.test(e2.className); )
              e2 = e2.parentElement;
            return e2 ? (e2.className.match(c) || [, "none"])[1].toLowerCase() : "none";
          },
          currentScript: function() {
            if (typeof document == "undefined")
              return null;
            if ("currentScript" in document)
              return document.currentScript;
            try {
              throw new Error();
            } catch (e2) {
              var n2 = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e2.stack) || [])[1];
              if (n2) {
                var t2 = document.getElementsByTagName("script");
                for (var r2 in t2)
                  if (t2[r2].src == n2)
                    return t2[r2];
              }
              return null;
            }
          },
          isActive: function(e2, n2, t2) {
            for (var r2 = "no-" + n2; e2; ) {
              var a2 = e2.classList;
              if (a2.contains(n2))
                return true;
              if (a2.contains(r2))
                return false;
              e2 = e2.parentElement;
            }
            return !!t2;
          }
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function(e2, n2) {
            var t2 = M.util.clone(M.languages[e2]);
            for (var r2 in n2)
              t2[r2] = n2[r2];
            return t2;
          },
          insertBefore: function(t2, e2, n2, r2) {
            var a2 = (r2 = r2 || M.languages)[t2], i2 = {};
            for (var l in a2)
              if (a2.hasOwnProperty(l)) {
                if (l == e2)
                  for (var o in n2)
                    n2.hasOwnProperty(o) && (i2[o] = n2[o]);
                n2.hasOwnProperty(l) || (i2[l] = a2[l]);
              }
            var s = r2[t2];
            return r2[t2] = i2, M.languages.DFS(M.languages, function(e3, n3) {
              n3 === s && e3 != t2 && (this[e3] = i2);
            }), i2;
          },
          DFS: function e2(n2, t2, r2, a2) {
            a2 = a2 || {};
            var i2 = M.util.objId;
            for (var l in n2)
              if (n2.hasOwnProperty(l)) {
                t2.call(n2, l, n2[l], r2 || l);
                var o = n2[l], s = M.util.type(o);
                s !== "Object" || a2[i2(o)] ? s !== "Array" || a2[i2(o)] || (a2[i2(o)] = true, e2(o, t2, l, a2)) : (a2[i2(o)] = true, e2(o, t2, null, a2));
              }
          }
        },
        plugins: {},
        highlightAll: function(e2, n2) {
          M.highlightAllUnder(document, e2, n2);
        },
        highlightAllUnder: function(e2, n2, t2) {
          var r2 = {
            callback: t2,
            container: e2,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          M.hooks.run("before-highlightall", r2), r2.elements = Array.prototype.slice.apply(r2.container.querySelectorAll(r2.selector)), M.hooks.run("before-all-elements-highlight", r2);
          for (var a2, i2 = 0; a2 = r2.elements[i2++]; )
            M.highlightElement(a2, n2 === true, r2.callback);
        },
        highlightElement: function(e2, n2, t2) {
          var r2 = M.util.getLanguage(e2), a2 = M.languages[r2];
          e2.className = e2.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r2;
          var i2 = e2.parentElement;
          i2 && i2.nodeName.toLowerCase() === "pre" && (i2.className = i2.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r2);
          var l = { element: e2, language: r2, grammar: a2, code: e2.textContent };
          function o(e3) {
            l.highlightedCode = e3, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), t2 && t2.call(l.element);
          }
          if (M.hooks.run("before-sanity-check", l), (i2 = l.element.parentElement) && i2.nodeName.toLowerCase() === "pre" && !i2.hasAttribute("tabindex") && i2.setAttribute("tabindex", "0"), !l.code)
            return M.hooks.run("complete", l), void (t2 && t2.call(l.element));
          if (M.hooks.run("before-highlight", l), l.grammar)
            if (n2 && u.Worker) {
              var s = new Worker(M.filename);
              s.onmessage = function(e3) {
                o(e3.data);
              }, s.postMessage(JSON.stringify({
                language: l.language,
                code: l.code,
                immediateClose: true
              }));
            } else
              o(M.highlight(l.code, l.grammar, l.language));
          else
            o(M.util.encode(l.code));
        },
        highlight: function(e2, n2, t2) {
          var r2 = { code: e2, grammar: n2, language: t2 };
          return M.hooks.run("before-tokenize", r2), r2.tokens = M.tokenize(r2.code, r2.grammar), M.hooks.run("after-tokenize", r2), W.stringify(M.util.encode(r2.tokens), r2.language);
        },
        tokenize: function(e2, n2) {
          var t2 = n2.rest;
          if (t2) {
            for (var r2 in t2)
              n2[r2] = t2[r2];
            delete n2.rest;
          }
          var a2 = new i();
          return I(a2, a2.head, e2), function e3(n3, t3, r3, a3, i2, l) {
            for (var o in r3)
              if (r3.hasOwnProperty(o) && r3[o]) {
                var s = r3[o];
                s = Array.isArray(s) ? s : [s];
                for (var u2 = 0; u2 < s.length; ++u2) {
                  if (l && l.cause == o + "," + u2)
                    return;
                  var c2 = s[u2], g = c2.inside, f = !!c2.lookbehind, h = !!c2.greedy, d = c2.alias;
                  if (h && !c2.pattern.global) {
                    var p = c2.pattern.toString().match(/[imsuy]*$/)[0];
                    c2.pattern = RegExp(c2.pattern.source, p + "g");
                  }
                  for (var v = c2.pattern || c2, m = a3.next, y = i2; m !== t3.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                    var b = m.value;
                    if (t3.length > n3.length)
                      return;
                    if (!(b instanceof W)) {
                      var k, x = 1;
                      if (h) {
                        if (!(k = z(v, y, n3, f)))
                          break;
                        var w = k.index, A = k.index + k[0].length, P = y;
                        for (P += m.value.length; P <= w; )
                          m = m.next, P += m.value.length;
                        if (P -= m.value.length, y = P, m.value instanceof W)
                          continue;
                        for (var E = m; E !== t3.tail && (P < A || typeof E.value == "string"); E = E.next)
                          x++, P += E.value.length;
                        x--, b = n3.slice(y, P), k.index -= y;
                      } else if (!(k = z(v, 0, b, f)))
                        continue;
                      var w = k.index, S = k[0], O = b.slice(0, w), L = b.slice(w + S.length), N = y + b.length;
                      l && N > l.reach && (l.reach = N);
                      var j = m.prev;
                      O && (j = I(t3, j, O), y += O.length), q(t3, j, x);
                      var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
                      if (m = I(t3, j, C), L && I(t3, m, L), 1 < x) {
                        var _ = { cause: o + "," + u2, reach: N };
                        e3(n3, t3, r3, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach);
                      }
                    }
                  }
                }
              }
          }(e2, a2, n2, a2.head, 0), function(e3) {
            var n3 = [], t3 = e3.head.next;
            for (; t3 !== e3.tail; )
              n3.push(t3.value), t3 = t3.next;
            return n3;
          }(a2);
        },
        hooks: {
          all: {},
          add: function(e2, n2) {
            var t2 = M.hooks.all;
            t2[e2] = t2[e2] || [], t2[e2].push(n2);
          },
          run: function(e2, n2) {
            var t2 = M.hooks.all[e2];
            if (t2 && t2.length)
              for (var r2, a2 = 0; r2 = t2[a2++]; )
                r2(n2);
          }
        },
        Token: W
      };
      function W(e2, n2, t2, r2) {
        this.type = e2, this.content = n2, this.alias = t2, this.length = 0 | (r2 || "").length;
      }
      function z(e2, n2, t2, r2) {
        e2.lastIndex = n2;
        var a2 = e2.exec(t2);
        if (a2 && r2 && a2[1]) {
          var i2 = a2[1].length;
          a2.index += i2, a2[0] = a2[0].slice(i2);
        }
        return a2;
      }
      function i() {
        var e2 = { value: null, prev: null, next: null }, n2 = { value: null, prev: e2, next: null };
        e2.next = n2, this.head = e2, this.tail = n2, this.length = 0;
      }
      function I(e2, n2, t2) {
        var r2 = n2.next, a2 = { value: t2, prev: n2, next: r2 };
        return n2.next = a2, r2.prev = a2, e2.length++, a2;
      }
      function q(e2, n2, t2) {
        for (var r2 = n2.next, a2 = 0; a2 < t2 && r2 !== e2.tail; a2++)
          r2 = r2.next;
        (n2.next = r2).prev = n2, e2.length -= a2;
      }
      if (u.Prism = M, W.stringify = function n2(e2, t2) {
        if (typeof e2 == "string")
          return e2;
        if (Array.isArray(e2)) {
          var r2 = "";
          return e2.forEach(function(e3) {
            r2 += n2(e3, t2);
          }), r2;
        }
        var a2 = {
          type: e2.type,
          content: n2(e2.content, t2),
          tag: "span",
          classes: ["token", e2.type],
          attributes: {},
          language: t2
        }, i2 = e2.alias;
        i2 && (Array.isArray(i2) ? Array.prototype.push.apply(a2.classes, i2) : a2.classes.push(i2)), M.hooks.run("wrap", a2);
        var l = "";
        for (var o in a2.attributes)
          l += " " + o + '="' + (a2.attributes[o] || "").replace(/"/g, "&quot;") + '"';
        return "<" + a2.tag + ' class="' + a2.classes.join(" ") + '"' + l + ">" + a2.content + "</" + a2.tag + ">";
      }, !u.document)
        return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function(e2) {
          var n2 = JSON.parse(e2.data), t2 = n2.language, r2 = n2.code, a2 = n2.immediateClose;
          u.postMessage(M.highlight(r2, M.languages[t2], t2)), a2 && u.close();
        }, false)), M;
      var t = M.util.currentScript();
      function r() {
        M.manual || M.highlightAll();
      }
      if (t && (M.filename = t.src, t.hasAttribute("data-manual") && (M.manual = true)), !M.manual) {
        var a = document.readyState;
        a === "loading" || a === "interactive" && t && t.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16);
      }
      return M;
    }(_self);
    typeof module != "undefined" && module.exports && (module.exports = Prism), typeof global != "undefined" && (global.Prism = Prism);
    Prism.languages.markup = {
      comment: /<!--[\s\S]*?-->/,
      prolog: /<\?[\s\S]+?\?>/,
      doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
          },
          string: { pattern: /"[^"]*"|'[^']*'/, greedy: true },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/,
          name: /[^\s<>'"]+/
        }
      },
      cdata: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: { namespace: /^[^\s>\/:]+:/ }
          }
        }
      },
      entity: [
        { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
        /&#x?[\da-f]{1,8};/i
      ]
    }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(a) {
      a.type === "entity" && (a.attributes.title = a.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
      value: function(a, e) {
        var s = {};
        s["language-" + e] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var t = {
          "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s }
        };
        t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
        var n = {};
        n[a] = {
          pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
            return a;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside: t
        }, Prism.languages.insertBefore("markup", "cdata", n);
      }
    }), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
      value: function(a, e) {
        Prism.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(`(^|["'\\s])(?:` + a + `)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`, "i"),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [e, "language-" + e],
                  inside: Prism.languages[e]
                },
                punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/]
              }
            }
          }
        });
      }
    }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
    !function(s) {
      var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
          }
        },
        url: {
          pattern: RegExp("\\burl\\((?:" + e.source + `|(?:[^\\\\\r
()"']|\\\\[^])*)\\)`, "i"),
          greedy: true,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: { pattern: RegExp("^" + e.source + "$"), alias: "url" }
          }
        },
        selector: {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + e.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        string: { pattern: e, greedy: true },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        important: /!important\b/i,
        function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: true },
        punctuation: /[(){};:,]/
      }, s.languages.css.atrule.inside.rest = s.languages.css;
      var t = s.languages.markup;
      t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
    }(Prism);
    Prism.languages.clike = {
      comment: [
        { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true, greedy: true },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: { punctuation: /[.\\]/ }
      },
      keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
      boolean: /\b(?:true|false)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    };
    Prism.languages.javascript = Prism.languages.extend("clike", {
      "class-name": [
        Prism.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
          lookbehind: true
        }
      ],
      keyword: [
        { pattern: /((?:^|\})\s*)catch\b/, lookbehind: true },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), Prism.languages.insertBefore("javascript", "string", {
      hashbang: { pattern: /^#!.*/, greedy: true, alias: "comment" },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": { pattern: /^`|`$/, alias: "string" },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      }
    }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
    Prism.languages.graphql = {
      comment: /#.*/,
      description: {
        pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
        greedy: true,
        alias: "string",
        inside: {
          "language-markdown": {
            pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
            lookbehind: true,
            inside: Prism.languages.markdown
          }
        }
      },
      string: {
        pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
        greedy: true
      },
      number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      boolean: /\b(?:true|false)\b/,
      variable: /\$[a-z_]\w*/i,
      directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
      "attr-name": {
        pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
        greedy: true
      },
      "atom-input": { pattern: /[A-Z]\w*Input(?=!?.*$)/m, alias: "class-name" },
      scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
      constant: /\b[A-Z][A-Z_\d]*\b/,
      "class-name": {
        pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
        lookbehind: true
      },
      fragment: {
        pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-mutation": {
        pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-query": {
        pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
      operator: /[!=|&]|\.{3}/,
      "property-query": /\w+(?=\s*\()/,
      object: /\w+(?=\s*\{)/,
      punctuation: /[!(){}\[\]:=,]/,
      property: /\w+/
    }, Prism.hooks.add("after-tokenize", function(n) {
      if (n.language === "graphql")
        for (var o = n.tokens.filter(function(n2) {
          return typeof n2 != "string" && n2.type !== "comment" && n2.type !== "scalar";
        }), s = 0; s < o.length; ) {
          var t = o[s++];
          if (t.type === "keyword" && t.content === "mutation") {
            var e = [];
            if (c(["definition-mutation", "punctuation"]) && l(1).content === "(") {
              s += 2;
              var a = f(/^\($/, /^\)$/);
              if (a === -1)
                continue;
              for (; s < a; s++) {
                var r = l(0);
                r.type === "variable" && (m(r, "variable-input"), e.push(r.content));
              }
              s = a + 1;
            }
            if (c(["punctuation", "property-query"]) && l(0).content === "{" && (s++, m(l(0), "property-mutation"), 0 < e.length)) {
              var i = f(/^\{$/, /^\}$/);
              if (i === -1)
                continue;
              for (var u = s; u < i; u++) {
                var p = o[u];
                p.type === "variable" && 0 <= e.indexOf(p.content) && m(p, "variable-input");
              }
            }
          }
        }
      function l(n2) {
        return o[s + n2];
      }
      function c(n2, t2) {
        t2 = t2 || 0;
        for (var e2 = 0; e2 < n2.length; e2++) {
          var a2 = l(e2 + t2);
          if (!a2 || a2.type !== n2[e2])
            return false;
        }
        return true;
      }
      function f(n2, t2) {
        for (var e2 = 1, a2 = s; a2 < o.length; a2++) {
          var r2 = o[a2], i2 = r2.content;
          if (r2.type === "punctuation" && typeof i2 == "string") {
            if (n2.test(i2))
              e2++;
            else if (t2.test(i2) && --e2 === 0)
              return a2;
          }
        }
        return -1;
      }
      function m(n2, t2) {
        var e2 = n2.alias;
        e2 ? Array.isArray(e2) || (n2.alias = e2 = [e2]) : n2.alias = e2 = [], e2.push(t2);
      }
    });
    !function(i) {
      var t = i.util.clone(i.languages.javascript), e = "(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})";
      function n(t2, n2) {
        return t2 = t2.replace(/<S>/g, function() {
          return "(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)";
        }).replace(/<BRACES>/g, function() {
          return "(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})";
        }).replace(/<SPREAD>/g, function() {
          return e;
        }), RegExp(t2, n2);
      }
      e = n(e).source, i.languages.jsx = i.languages.extend("markup", t), i.languages.jsx.tag.pattern = n(`</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|'(?:\\\\[^]|[^\\\\'])*'|[^\\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>`), i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i, i.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/i, i.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, i.languages.jsx.tag.inside.comment = t.comment, i.languages.insertBefore("inside", "attr-name", { spread: { pattern: n("<SPREAD>"), inside: i.languages.jsx } }, i.languages.jsx.tag), i.languages.insertBefore("inside", "special-attr", {
        script: {
          pattern: n("=<BRACES>"),
          inside: {
            "script-punctuation": { pattern: /^=(?=\{)/, alias: "punctuation" },
            rest: i.languages.jsx
          },
          alias: "language-javascript"
        }
      }, i.languages.jsx.tag);
      var o = function(t2) {
        return t2 ? typeof t2 == "string" ? t2 : typeof t2.content == "string" ? t2.content : t2.content.map(o).join("") : "";
      }, r = function(t2) {
        for (var n2 = [], e2 = 0; e2 < t2.length; e2++) {
          var a = t2[e2], s = false;
          if (typeof a != "string" && (a.type === "tag" && a.content[0] && a.content[0].type === "tag" ? a.content[0].content[0].content === "</" ? 0 < n2.length && n2[n2.length - 1].tagName === o(a.content[0].content[1]) && n2.pop() : a.content[a.content.length - 1].content === "/>" || n2.push({
            tagName: o(a.content[0].content[1]),
            openedBraces: 0
          }) : 0 < n2.length && a.type === "punctuation" && a.content === "{" ? n2[n2.length - 1].openedBraces++ : 0 < n2.length && 0 < n2[n2.length - 1].openedBraces && a.type === "punctuation" && a.content === "}" ? n2[n2.length - 1].openedBraces-- : s = true), (s || typeof a == "string") && 0 < n2.length && n2[n2.length - 1].openedBraces === 0) {
            var g = o(a);
            e2 < t2.length - 1 && (typeof t2[e2 + 1] == "string" || t2[e2 + 1].type === "plain-text") && (g += o(t2[e2 + 1]), t2.splice(e2 + 1, 1)), 0 < e2 && (typeof t2[e2 - 1] == "string" || t2[e2 - 1].type === "plain-text") && (g = o(t2[e2 - 1]) + g, t2.splice(e2 - 1, 1), e2--), t2[e2] = new i.Token("plain-text", g, null, g);
          }
          a.content && typeof a.content != "string" && r(a.content);
        }
      };
      i.hooks.add("after-tokenize", function(t2) {
        t2.language !== "jsx" && t2.language !== "tsx" || r(t2.tokens);
      });
    }(Prism);
    !function(e) {
      e.languages.sass = e.languages.extend("css", {
        comment: {
          pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
          lookbehind: true
        }
      }), e.languages.insertBefore("sass", "atrule", {
        "atrule-line": {
          pattern: /^(?:[ \t]*)[@+=].+/m,
          inside: { atrule: /(?:@[\w-]+|[+=])/m }
        }
      }), delete e.languages.sass.atrule;
      var t = /\$[-\w]+|#\{\$[-\w]+\}/, a = [
        /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
        { pattern: /(\s)-(?=\s)/, lookbehind: true }
      ];
      e.languages.insertBefore("sass", "property", {
        "variable-line": {
          pattern: /^[ \t]*\$.+/m,
          inside: { punctuation: /:/, variable: t, operator: a }
        },
        "property-line": {
          pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
          inside: {
            property: [
              /[^:\s]+(?=\s*:)/,
              { pattern: /(:)[^:\s]+/, lookbehind: true }
            ],
            punctuation: /:/,
            variable: t,
            operator: a,
            important: e.languages.sass.important
          }
        }
      }), delete e.languages.sass.property, delete e.languages.sass.important, e.languages.insertBefore("sass", "punctuation", {
        selector: {
          pattern: /([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/,
          lookbehind: true
        }
      });
    }(Prism);
    Prism.languages.scss = Prism.languages.extend("css", {
      comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: true },
      atrule: {
        pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
        inside: { rule: /@[\w-]+/ }
      },
      url: /(?:[-a-z]+-)?url(?=\()/i,
      selector: {
        pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/m,
        inside: {
          parent: { pattern: /&/, alias: "important" },
          placeholder: /%[-\w]+/,
          variable: /\$[-\w]+|#\{\$[-\w]+\}/
        }
      },
      property: {
        pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
        inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }
      }
    }), Prism.languages.insertBefore("scss", "atrule", {
      keyword: [
        /@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
        { pattern: /( )(?:from|through)(?= )/, lookbehind: true }
      ]
    }), Prism.languages.insertBefore("scss", "important", {
      variable: /\$[-\w]+|#\{\$[-\w]+\}/
    }), Prism.languages.insertBefore("scss", "function", {
      "module-modifier": {
        pattern: /\b(?:as|with|show|hide)\b/i,
        alias: "keyword"
      },
      placeholder: { pattern: /%[-\w]+/, alias: "selector" },
      statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
      boolean: /\b(?:true|false)\b/,
      null: { pattern: /\bnull\b/, alias: "keyword" },
      operator: {
        pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
        lookbehind: true
      }
    }), Prism.languages.scss.atrule.inside.rest = Prism.languages.scss;
    !function(e) {
      e.languages.typescript = e.languages.extend("javascript", {
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
          lookbehind: true,
          greedy: true,
          inside: null
        },
        builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
      }), e.languages.typescript.keyword.push(/\b(?:abstract|as|declare|implements|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)(?!\s*[^\s_${}*a-zA-Z\xA0-\uFFFF])/), delete e.languages.typescript.parameter;
      var s = e.languages.extend("typescript", {});
      delete s["class-name"], e.languages.typescript["class-name"].inside = s, e.languages.insertBefore("typescript", "function", {
        decorator: {
          pattern: /@[$\w\xA0-\uFFFF]+/,
          inside: {
            at: { pattern: /^@/, alias: "operator" },
            function: /^[\s\S]+/
          }
        },
        "generic-function": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: true,
          inside: {
            function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: s }
          }
        }
      }), e.languages.ts = e.languages.typescript;
    }(Prism);
    !function() {
      if (typeof Prism != "undefined" && typeof document != "undefined") {
        var l = {
          javascript: "clike",
          actionscript: "javascript",
          apex: ["clike", "sql"],
          arduino: "cpp",
          aspnet: ["markup", "csharp"],
          birb: "clike",
          bison: "c",
          c: "clike",
          csharp: "clike",
          cpp: "c",
          cfscript: "clike",
          chaiscript: ["clike", "cpp"],
          coffeescript: "javascript",
          crystal: "ruby",
          "css-extras": "css",
          d: "clike",
          dart: "clike",
          django: "markup-templating",
          ejs: ["javascript", "markup-templating"],
          etlua: ["lua", "markup-templating"],
          erb: ["ruby", "markup-templating"],
          fsharp: "clike",
          "firestore-security-rules": "clike",
          flow: "javascript",
          ftl: "markup-templating",
          gml: "clike",
          glsl: "c",
          go: "clike",
          groovy: "clike",
          haml: "ruby",
          handlebars: "markup-templating",
          haxe: "clike",
          hlsl: "c",
          idris: "haskell",
          java: "clike",
          javadoc: ["markup", "java", "javadoclike"],
          jolie: "clike",
          jsdoc: ["javascript", "javadoclike", "typescript"],
          "js-extras": "javascript",
          json5: "json",
          jsonp: "json",
          "js-templates": "javascript",
          kotlin: "clike",
          latte: ["clike", "markup-templating", "php"],
          less: "css",
          lilypond: "scheme",
          liquid: "markup-templating",
          markdown: "markup",
          "markup-templating": "markup",
          mongodb: "javascript",
          n4js: "javascript",
          objectivec: "c",
          opencl: "c",
          parser: "markup",
          php: "markup-templating",
          phpdoc: ["php", "javadoclike"],
          "php-extras": "php",
          plsql: "sql",
          processing: "clike",
          protobuf: "clike",
          pug: ["markup", "javascript"],
          purebasic: "clike",
          purescript: "haskell",
          qsharp: "clike",
          qml: "javascript",
          qore: "clike",
          racket: "scheme",
          jsx: ["markup", "javascript"],
          tsx: ["jsx", "typescript"],
          reason: "clike",
          ruby: "clike",
          sass: "css",
          scss: "css",
          scala: "java",
          "shell-session": "bash",
          smarty: "markup-templating",
          solidity: "clike",
          soy: "markup-templating",
          sparql: "turtle",
          sqf: "clike",
          squirrel: "clike",
          swift: "clike",
          "t4-cs": ["t4-templating", "csharp"],
          "t4-vb": ["t4-templating", "vbnet"],
          tap: "yaml",
          tt2: ["clike", "markup-templating"],
          textile: "markup",
          twig: "markup",
          typescript: "javascript",
          v: "clike",
          vala: "clike",
          vbnet: "basic",
          velocity: "markup",
          wiki: "markup",
          xeora: "markup",
          "xml-doc": "markup",
          xquery: "markup"
        }, n = {
          html: "markup",
          xml: "markup",
          svg: "markup",
          mathml: "markup",
          ssml: "markup",
          atom: "markup",
          rss: "markup",
          js: "javascript",
          g4: "antlr4",
          adoc: "asciidoc",
          shell: "bash",
          shortcode: "bbcode",
          rbnf: "bnf",
          oscript: "bsl",
          cs: "csharp",
          dotnet: "csharp",
          cfc: "cfscript",
          coffee: "coffeescript",
          conc: "concurnas",
          jinja2: "django",
          "dns-zone": "dns-zone-file",
          dockerfile: "docker",
          gv: "dot",
          eta: "ejs",
          xlsx: "excel-formula",
          xls: "excel-formula",
          gamemakerlanguage: "gml",
          hbs: "handlebars",
          hs: "haskell",
          idr: "idris",
          gitignore: "ignore",
          hgignore: "ignore",
          npmignore: "ignore",
          webmanifest: "json",
          kt: "kotlin",
          kts: "kotlin",
          kum: "kumir",
          tex: "latex",
          context: "latex",
          ly: "lilypond",
          emacs: "lisp",
          elisp: "lisp",
          "emacs-lisp": "lisp",
          md: "markdown",
          moon: "moonscript",
          n4jsd: "n4js",
          nani: "naniscript",
          objc: "objectivec",
          qasm: "openqasm",
          objectpascal: "pascal",
          px: "pcaxis",
          pcode: "peoplecode",
          pq: "powerquery",
          mscript: "powerquery",
          pbfasm: "purebasic",
          purs: "purescript",
          py: "python",
          qs: "qsharp",
          rkt: "racket",
          rpy: "renpy",
          robot: "robotframework",
          rb: "ruby",
          "sh-session": "shell-session",
          shellsession: "shell-session",
          smlnj: "sml",
          sol: "solidity",
          sln: "solution-file",
          rq: "sparql",
          t4: "t4-cs",
          trig: "turtle",
          ts: "typescript",
          tsconfig: "typoscript",
          uscript: "unrealscript",
          uc: "unrealscript",
          url: "uri",
          vb: "visual-basic",
          vba: "visual-basic",
          mathematica: "wolfram",
          nb: "wolfram",
          wl: "wolfram",
          xeoracube: "xeora",
          yml: "yaml"
        }, p = {}, e = "components/", a = Prism.util.currentScript();
        if (a) {
          var r = /\bplugins\/autoloader\/prism-autoloader\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i, s = /(^|\/)[\w-]+\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i, i = a.getAttribute("data-autoloader-path");
          if (i != null)
            e = i.trim().replace(/\/?$/, "/");
          else {
            var t = a.src;
            r.test(t) ? e = t.replace(r, "components/") : s.test(t) && (e = t.replace(s, "$1components/"));
          }
        }
        var o = Prism.plugins.autoloader = {
          languages_path: e,
          use_minified: true,
          loadLanguages: m
        };
        Prism.hooks.add("complete", function(e2) {
          var a2 = e2.element, r2 = e2.language;
          if (a2 && r2 && r2 !== "none") {
            var s2 = function(e3) {
              var a3 = (e3.getAttribute("data-dependencies") || "").trim();
              if (!a3) {
                var r3 = e3.parentElement;
                r3 && r3.tagName.toLowerCase() === "pre" && (a3 = (r3.getAttribute("data-dependencies") || "").trim());
              }
              return a3 ? a3.split(/\s*,\s*/g) : [];
            }(a2);
            /^diff-./i.test(r2) ? (s2.push("diff"), s2.push(r2.substr("diff-".length))) : s2.push(r2), s2.every(u) || m(s2, function() {
              Prism.highlightElement(a2);
            });
          }
        });
      }
      function u(e2) {
        if (0 <= e2.indexOf("!"))
          return false;
        if ((e2 = n[e2] || e2) in Prism.languages)
          return true;
        var a2 = p[e2];
        return a2 && !a2.error && a2.loading === false;
      }
      function m(e2, a2, r2) {
        typeof e2 == "string" && (e2 = [e2]);
        var s2 = e2.length, i2 = 0, t2 = false;
        function c() {
          t2 || ++i2 === s2 && a2 && a2(e2);
        }
        s2 !== 0 ? e2.forEach(function(e3) {
          !function(a3, r3, s3) {
            var i3 = 0 <= a3.indexOf("!");
            function e4() {
              var e5 = p[a3];
              e5 || (e5 = p[a3] = { callbacks: [] }), e5.callbacks.push({ success: r3, error: s3 }), !i3 && u(a3) ? k(a3, "success") : !i3 && e5.error ? k(a3, "error") : !i3 && e5.loading || (e5.loading = true, e5.error = false, function(e6, a4, r4) {
                var s4 = document.createElement("script");
                s4.src = e6, s4.async = true, s4.onload = function() {
                  document.body.removeChild(s4), a4 && a4();
                }, s4.onerror = function() {
                  document.body.removeChild(s4), r4 && r4();
                }, document.body.appendChild(s4);
              }(function(e6) {
                return o.languages_path + "prism-" + e6 + (o.use_minified ? ".min" : "") + ".js";
              }(a3), function() {
                e5.loading = false, k(a3, "success");
              }, function() {
                e5.loading = false, e5.error = true, k(a3, "error");
              }));
            }
            a3 = a3.replace("!", ""), a3 = n[a3] || a3;
            var t3 = l[a3];
            t3 && t3.length ? m(t3, e4, s3) : e4();
          }(e3, c, function() {
            t2 || (t2 = true, r2 && r2(e3));
          });
        }) : a2 && setTimeout(a2, 0);
      }
      function k(e2, a2) {
        if (p[e2]) {
          for (var r2 = p[e2].callbacks, s2 = 0, i2 = r2.length; s2 < i2; s2++) {
            var t2 = r2[s2][a2];
            t2 && setTimeout(t2, 0);
          }
          r2.length = 0;
        }
      }
    }();
    typeof Prism != "undefined" && typeof document != "undefined" && (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Prism.plugins.UnescapedMarkup = true, Prism.hooks.add("before-highlightall", function(e) {
      e.selector += ', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]';
    }), Prism.hooks.add("before-sanity-check", function(e) {
      var t = e.element;
      if (t.matches('script[type="text/plain"]')) {
        var a = document.createElement("code"), c = document.createElement("pre");
        c.className = a.className = t.className;
        var n = t.dataset;
        return Object.keys(n || {}).forEach(function(e2) {
          Object.prototype.hasOwnProperty.call(n, e2) && (c.dataset[e2] = n[e2]);
        }), a.textContent = e.code = e.code.replace(/&lt;\/script(?:>|&gt;)/gi, "<\/script>"), c.appendChild(a), t.parentNode.replaceChild(c, t), void (e.element = a);
      }
      if (!e.code) {
        var o = t.childNodes;
        o.length === 1 && o[0].nodeName == "#comment" && (t.textContent = e.code = o[0].textContent);
      }
    }));
    !function() {
      if (typeof Prism != "undefined" && typeof document != "undefined") {
        var i = [], l = {}, d = function() {
        };
        Prism.plugins.toolbar = {};
        var e = Prism.plugins.toolbar.registerButton = function(e2, n) {
          var t2;
          t2 = typeof n == "function" ? n : function(e3) {
            var t3;
            return typeof n.onClick == "function" ? ((t3 = document.createElement("button")).type = "button", t3.addEventListener("click", function() {
              n.onClick.call(this, e3);
            })) : typeof n.url == "string" ? (t3 = document.createElement("a")).href = n.url : t3 = document.createElement("span"), n.className && t3.classList.add(n.className), t3.textContent = n.text, t3;
          }, e2 in l ? console.warn('There is a button with the key "' + e2 + '" registered already.') : i.push(l[e2] = t2);
        }, t = Prism.plugins.toolbar.hook = function(a) {
          var e2 = a.element.parentNode;
          if (e2 && /pre/i.test(e2.nodeName) && !e2.parentNode.classList.contains("code-toolbar")) {
            var t2 = document.createElement("div");
            t2.classList.add("code-toolbar"), e2.parentNode.insertBefore(t2, e2), t2.appendChild(e2);
            var r = document.createElement("div");
            r.classList.add("toolbar");
            var n = i, o = function(e3) {
              for (; e3; ) {
                var t3 = e3.getAttribute("data-toolbar-order");
                if (t3 != null)
                  return (t3 = t3.trim()).length ? t3.split(/\s*,\s*/g) : [];
                e3 = e3.parentElement;
              }
            }(a.element);
            o && (n = o.map(function(e3) {
              return l[e3] || d;
            })), n.forEach(function(e3) {
              var t3 = e3(a);
              if (t3) {
                var n2 = document.createElement("div");
                n2.classList.add("toolbar-item"), n2.appendChild(t3), r.appendChild(n2);
              }
            }), t2.appendChild(r);
          }
        };
        e("label", function(e2) {
          var t2 = e2.element.parentNode;
          if (t2 && /pre/i.test(t2.nodeName) && t2.hasAttribute("data-label")) {
            var n, a, r = t2.getAttribute("data-label");
            try {
              a = document.querySelector("template#" + r);
            } catch (e3) {
            }
            return a ? n = a.content : (t2.hasAttribute("data-url") ? (n = document.createElement("a")).href = t2.getAttribute("data-url") : n = document.createElement("span"), n.textContent = r), n;
          }
        }), Prism.hooks.add("complete", t);
      }
    }();
    !function() {
      function u(t, e) {
        t.addEventListener("click", function() {
          !function(t2) {
            navigator.clipboard ? navigator.clipboard.writeText(t2.getText()).then(t2.success, function() {
              o(t2);
            }) : o(t2);
          }(e);
        });
      }
      function o(e) {
        var t = document.createElement("textarea");
        t.value = e.getText(), t.style.top = "0", t.style.left = "0", t.style.position = "fixed", document.body.appendChild(t), t.focus(), t.select();
        try {
          var o2 = document.execCommand("copy");
          setTimeout(function() {
            o2 ? e.success() : e.error();
          }, 1);
        } catch (t2) {
          setTimeout(function() {
            e.error(t2);
          }, 1);
        }
        document.body.removeChild(t);
      }
      typeof Prism != "undefined" && typeof document != "undefined" && (Prism.plugins.toolbar ? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(t) {
        var e = t.element, o2 = function(t2) {
          var e2 = {
            copy: "Copy",
            "copy-error": "Press Ctrl+C to copy",
            "copy-success": "Copied!",
            "copy-timeout": 5e3
          };
          for (var o3 in e2) {
            for (var n2 = "data-prismjs-" + o3, c2 = t2; c2 && !c2.hasAttribute(n2); )
              c2 = c2.parentElement;
            c2 && (e2[o3] = c2.getAttribute(n2));
          }
          return e2;
        }(e), n = document.createElement("button");
        n.className = "copy-to-clipboard-button", n.setAttribute("type", "button");
        var c = document.createElement("span");
        return n.appendChild(c), i("copy"), u(n, {
          getText: function() {
            return e.textContent;
          },
          success: function() {
            i("copy-success"), r();
          },
          error: function() {
            i("copy-error"), setTimeout(function() {
              !function(t2) {
                window.getSelection().selectAllChildren(t2);
              }(e);
            }, 1), r();
          }
        }), n;
        function r() {
          setTimeout(function() {
            i("copy");
          }, o2["copy-timeout"]);
        }
        function i(t2) {
          c.textContent = o2[t2], n.setAttribute("data-copy-state", t2);
        }
      }) : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."));
    }();
    function onPageLoad() {
      const header = document.querySelector(".notion-header");
      const setActivePage = () => {
        const currentPage = document.querySelectorAll('a[href="' + window.location.pathname + '"]');
        currentPage.forEach(function(page) {
          if (!page.classList.contains("super-navbar__logo") && !page.parentNode.classList.contains("notion-image")) {
            page.classList.add("page-active");
          }
          const pageIcon = page.querySelector(".notion-page__icon");
          if (pageIcon) {
            pageIcon.setAttribute("style", "opacity:1!important; filter:grayscale(0%)!important;");
          }
        });
      };
      setActivePage();
      const config = { subtree: true, characterData: true };
      const callback = function(mutationsList, observer2) {
        for (const mutation of mutationsList) {
          if (mutation.type === "characterData") {
            setActivePage();
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(header, config);
    }
    document.addEventListener("DOMContentLoaded", onPageLoad);
  }
});
export default require_notion();
