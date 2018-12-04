!function(e){function t(t){for(var r,i,c=t[0],l=t[1],u=t[2],f=0,p=[];f<c.length;f++)i=c[f],o[i]&&p.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(s&&s(t);p.length;)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var l=n[c];0!==o[l]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/spell_practice";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var s=l;a.push([242,1]),n()}({226:function(e,t,n){e.exports={title:"title---ygEr"}},230:function(e,t,n){e.exports={pageTitle:"pageTitle--2ksTk",title:"title--3HqpP"}},240:function(e,t,n){"use strict";var r,o=n(0),a=n.n(o),i=n(620),c=n(241),l=n(227),u=n.n(l),s=n(226),f=n.n(s),p=function(){return a.a.createElement(u.a,{color:"primary",position:"static"},a.a.createElement("h1",{className:f.a.title},"Spell Practice"))},d=n(619),m=n(77),y=n.n(m),h=n(149),v=n.n(h),b=n(150),g=n.n(b),E=n(78),S=n.n(E);!function(e){e[e.wordList=0]="wordList",e[e.practice=1]="practice",e[e.report=2]="report",e[e.about=3]="about"}(r||(r={}));var w=new Map([[r.wordList,"/words"],[r.practice,"/practice"],[r.about,"/"]]),O=new Map([[r.wordList,"Word List"],[r.practice,"Practice"],[r.about,"About"]]),j=function(e){var t=e.route;return a.a.createElement("li",null,a.a.createElement(d.a,{className:S.a.link,to:w.get(t),activeClassName:S.a.active,exact:t===r.about},a.a.createElement(v.a,{component:"span",className:S.a.navItem},O.get(t))))};var P=function(){return a.a.createElement("aside",{className:S.a.container},a.a.createElement(y.a,{square:!0,className:S.a.paper},a.a.createElement(g.a,null,a.a.createElement(j,{route:r.wordList}),a.a.createElement(j,{route:r.practice}),a.a.createElement(j,{route:r.about}))))},x=n(67),N=n.n(x),_=n(230),k=n.n(_);function T(){return a.a.createElement("main",null,a.a.createElement("article",null,a.a.createElement("section",null,a.a.createElement(N.a,{variant:"h2",gutterBottom:!0,component:"h1",className:k.a.title},"About"),a.a.createElement(N.a,{component:"p",variant:"body1"},"It is designed to improve the spelling. Fill the words that you are not familiar with into the word list and practice!"))))}var W=n(239),B=n.n(W),C=n(238),R=n.n(C);function A(e,t,n){return{get:function(){var e=n.value.bind(this);return Object.defineProperty(this,t,{value:e}),e}}}var I,M=function(e,t,n,r){var o,a=arguments.length,i=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(a<3?o(i):a>3?o(t,n,i):o(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i},L=function(){function e(){this.items=[]}return Object.defineProperty(e.prototype,"length",{get:function(){return this.items.length},enumerable:!0,configurable:!0}),e.prototype.getDisplayedItems=function(e,t){if(e<=0||t<=0)return[];var n=(e-1)*t;return n>=this.length?[]:this.items.slice(n,t+n)},M([A],e.prototype,"getDisplayedItems",null),e}(),D=function(){function e(e,t,n,r){void 0===t&&(t=0),void 0===n&&(n=0),void 0===r&&(r=(new Date).toISOString().split("T")[0]),this.spell=e,this.numTried=t,this.numCorrect=n,this.timeAdded=r}return Object.defineProperty(e.prototype,"numWrong",{get:function(){return this.numTried-this.numCorrect},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"accuracy",{get:function(){return 0===this.numTried?0:Math.floor(this.numCorrect/this.numTried)},enumerable:!0,configurable:!0}),e}(),F=(I=function(e,t){return(I=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}I(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),H=function(e,t,n,r){var o,a=arguments.length,i=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(a<3?o(i):a>3?o(t,n,i):o(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i},U=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i},q=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(U(arguments[t]));return e},J=function(e){function t(t){var n=e.call(this)||this;return n.items=t,n}return F(t,e),Object.defineProperty(t.prototype,"length",{get:function(){return this.items.length},enumerable:!0,configurable:!0}),t.retrieveFromStorageFormat=function(e){return new t(e.map(function(e){return new(D.bind.apply(D,q([void 0],e)))}))},t.prototype.hasWord=function(e){return this.items.findIndex(function(t){return t.spell===e})>-1},t.prototype.addWord=function(e){this.hasWord(e.spell)||""===e.spell||this.items.push(e)},t.prototype.addWords=function(e){e.forEach(this.addWord)},t.prototype.toStorageFormat=function(){return this.items.map(function(e){return[e.spell,e.numTried,e.numCorrect,e.timeAdded]})},t.prototype.desc=function(e,t,n){return t[n]<e[n]?1:t[n]>e[n]?-1:0},t.prototype.StableSort=function(e,t){var n=this;this.items=this.items.map(function(e,t){return[e,t]}).sort(function(r,o){var a=n.desc(r[0],o[0],e);return 0===a&&(a=r[1]-o[1]),"asc"===t?-a:a}).map(function(e){return e[0]})},H([A],t.prototype,"hasWord",null),H([A],t.prototype,"addWord",null),H([A],t.prototype,"addWords",null),H([A],t.prototype,"toStorageFormat",null),H([A],t.prototype,"desc",null),H([A],t.prototype,"StableSort",null),t}(L),K=new(function(){return function(){var e=this;this.storageKey="word-list",this.saveToStorage=function(t){return new Promise(function(n,r){try{var o=t.toStorageFormat();localStorage.setItem(e.storageKey,JSON.stringify(o)),n()}catch(e){r()}})},this.loadList=function(){return new Promise(function(t,n){try{var r=localStorage.getItem(e.storageKey);if(null===r)return n("list is not initialized");var o=JSON.parse(r);t(J.retrieveFromStorageFormat(o))}catch(e){n("error in loading list")}})}}}()),Q=n(231),Y=n.n(Q),z=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i};var V=function(e,t,n,r){var o,a=arguments.length,i=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(a<3?o(i):a>3?o(t,n,i):o(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i},G=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i},X=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(G(arguments[t]));return e},Z=function(){function e(){this.events={}}return e.prototype.hasEvent=function(e){return void 0!==this.events[e]&&this.events[e].length>0},e.prototype.publish=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];void 0!==this.events[e]&&this.events[e].forEach(function(e){e.apply(void 0,X(t))})},e.prototype.subscribe=function(e,t){void 0===this.events[e]&&(this.events[e]=[]),this.events[e].push(t)},e.prototype.unsubscribe=function(e,t){void 0!==this.events[e]&&(this.events[e]=this.events[e].filter(function(e){return e!==t}))},V([A],e.prototype,"hasEvent",null),V([A],e.prototype,"publish",null),V([A],e.prototype,"subscribe",null),V([A],e.prototype,"unsubscribe",null),e}(),$=function(e,t,n,r){var o,a=arguments.length,i=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(a<3?o(i):a>3?o(t,n,i):o(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i},ee=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i},te=new(function(){function e(){this.channel=new Z,this.state=new Map}return e.prototype.toEventName=function(e){return"set_"+e},e.prototype.createState=function(e,t){this.state.set(e.toString(),t)},e.prototype.useState=function(e){var t=this,n=this.toEventName(e),r=ee(Object(o.useState)(this.state.get(e.toString())),2),a=r[0],i=r[1];Object(o.useEffect)(function(){return t.channel.subscribe(n,i),function(){t.channel.unsubscribe(n,i)}},[]);return[a,function(r){t.state.set(e.toString(),r),t.channel.publish(n,r)}]},$([A],e.prototype,"toEventName",null),$([A],e.prototype,"createState",null),$([A],e.prototype,"useState",null),e}());te.createState("word-list",new J([]));var ne=te,re=n(235),oe=n.n(re),ae=n(236),ie=n.n(ae),ce=n(48),le=n.n(ce),ue=n(232),se=n.n(ue),fe=n(237),pe=n.n(fe),de=n(151),me=n.n(de),ye=n(234),he=n.n(ye),ve=n(152),be=n.n(ve),ge=n(233),Ee=n.n(ge),Se=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i};var we=n(68),Oe=n.n(we),je=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i},Pe=Object(o.createContext)({selected:[],displayedWords:[],orderBy:"spell",order:"desc"});var xe=[{id:"spell",numeric:!1,label:"Word"},{id:"numTried",numeric:!0,label:"Number of tried"},{id:"accuracy",numeric:!0,label:"Accuracy(%)"},{id:"timeAdded",numeric:!1,label:"Added at(yyyy-mm-dd)"}];function Ne(e){var t=e.createSortHandler,n=Object(o.useContext)(Pe),r=(n.selected,n.displayedWords,n.order),i=n.orderBy;return a.a.createElement(se.a,null,a.a.createElement(me.a,null,a.a.createElement(le.a,{padding:"checkbox"},a.a.createElement(be.a,{indeterminate:!1})),xe.map(function(e){return a.a.createElement(le.a,{key:e.id,numeric:e.numeric,padding:"default",sortDirection:i===e.id&&r},a.a.createElement(Ee.a,{title:"Sort",placement:"bottom",enterDelay:300},a.a.createElement(he.a,{active:i===e.id,direction:r,onClick:function(){return t(e.id)}},e.label)))})))}function _e(){var e=je(Object(o.useState)([]),2),t=e[0],n=(e[1],je(Object(o.useState)("desc"),2)),r=n[0],i=(n[1],je(Object(o.useState)("spell"),2)),c=i[0],l=(i[1],function(e,t){void 0===e&&(e=1),void 0===t&&(t=10);var n=Se(Object(o.useState)(e),2),r=n[0],a=n[1],i=Se(Object(o.useState)(t),2);return{page:r,setPage:a,limit:i[0],setLimit:i[1]}}(2,10)),u=l.page,s=l.setPage,f=l.limit,p=l.setLimit,d=je(ne.useState("word-list"),2),m=d[0],y=d[1],h=Object(o.useMemo)(function(){return m.getDisplayedItems(u,f)},[u,f,m,m.items]);return Object(o.useEffect)(function(){K.loadList().then(function(e){y(e)}).catch(console.error)},[]),a.a.createElement(Pe.Provider,{value:{selected:t,displayedWords:h,order:r,orderBy:c}},a.a.createElement("section",{className:Oe.a.listSection},a.a.createElement(oe.a,null,a.a.createElement(Ne,{createSortHandler:function(){}}),a.a.createElement(ie.a,null,h.map(function(e){return a.a.createElement(me.a,{hover:!0,role:"checkbox",key:e.spell},a.a.createElement(le.a,{padding:"checkbox"},a.a.createElement(be.a,{checked:!1})),a.a.createElement(le.a,{component:"th",scope:"row",padding:"none"},e.spell),a.a.createElement(le.a,{numeric:!0},e.numTried),a.a.createElement(le.a,{numeric:!0},e.accuracy),a.a.createElement(le.a,{numeric:!0},e.timeAdded))}))),a.a.createElement(pe.a,{page:u-1,component:"div",rowsPerPage:f,count:Math.ceil(m.length/f),rowsPerPageOptions:[10,20],onChangePage:function(e,t){s(t+1)},onChangeRowsPerPage:function(e){return p(e.target.value)}})))}var ke=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i};function Te(){var e=ke(function(e,t){void 0===t&&(t=!1);var n=z(Object(o.useState)(e),2),r=n[0],a=n[1],i=function(e){a(e.target.value)};return!0===t&&(i=Y()(i)),[r,i]}(""),2),t=e[0],n=e[1],r=ke(ne.useState("word-list"),2),i=r[0],c=r[1];return a.a.createElement("section",{className:Oe.a.addSection},a.a.createElement(N.a,{component:"h2",variant:"h6",gutterBottom:!0},"Add New Words"),a.a.createElement(R.a,{rows:"15",multiline:!0,value:t,onChange:n,variant:"outlined",helperText:"words are separated by new line"}),a.a.createElement(B.a,{color:"primary",onClick:function(){var e=t.split("\r").join("").split("\n").map(function(e){return new D(e)});i.addWords(e),c(new J(i.items)),K.saveToStorage(i)},variant:"contained",className:Oe.a.button},"Add"))}function We(){return a.a.createElement("main",null,a.a.createElement(N.a,{variant:"h2",gutterBottom:!0,component:"h1",className:Oe.a.title},"Word List"),a.a.createElement(y.a,{className:Oe.a.body},a.a.createElement(Te,null),a.a.createElement(_e,null)))}n(617);function Be(){return Object(o.useEffect)(function(){document.title="Spell Practice"},[]),a.a.createElement(o.Fragment,null,a.a.createElement(p,null),a.a.createElement("div",{className:"global__body"},a.a.createElement(P,null),a.a.createElement("div",{className:"global__main"},a.a.createElement(i.a,null,a.a.createElement(c.a,{exact:!0,path:"/",component:T}),a.a.createElement(c.a,{exact:!0,path:"/words",component:We})))))}n.d(t,"a",function(){return Be})},242:function(e,t,n){"use strict";n.r(t),function(e){n(243);var t=n(0),r=n.n(t),o=n(618),a=n(29),i=n(240),c=document.getElementById("root");Object(a.render)(r.a.createElement(o.a,{basename:"spell_practice"},r.a.createElement(i.a,null)),c),void 0!==e&&e.hot&&e.hot.accept()}.call(this,n(154)(e))},617:function(e,t,n){},68:function(e,t,n){e.exports={pageTitle:"pageTitle--22M9y",title:"title--oQQIP pageTitle--22M9y",body:"body--2w6ce",section:"section--1BUkb","add-section":"add-section--1xY4f section--1BUkb",addSection:"add-section--1xY4f section--1BUkb","list-section":"list-section--2elHm section--1BUkb",listSection:"list-section--2elHm section--1BUkb",button:"button--1fh-d"}},78:function(e,t,n){e.exports={container:"container--325gt",paper:"paper--3VBCt",link:"link--1qAqB",active:"active--1Q0P9","nav-item":"nav-item--3P8df",navItem:"nav-item--3P8df"}}});