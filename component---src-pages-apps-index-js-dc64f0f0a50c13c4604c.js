(self.webpackChunkwazuh_faqs=self.webpackChunkwazuh_faqs||[]).push([[835],{9756:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}n.d(t,{Z:function(){return r}})},5595:function(e,t,n){"use strict";n.d(t,{y:function(){return u}});var r=n(9756),a=n(7294),c=n(6810),l=n(8667),i=["children","label","initialIsOpen","buttonProps"],u=function(e){var t=e.children,n=e.label,u=e.initialIsOpen,o=void 0!==u&&u,s=e.buttonProps,m=void 0===s?{}:s,d=((0,r.Z)(e,i),a.useState(o)),f=d[0],p=d[1];return a.createElement(a.Fragment,null,a.createElement(c.z,Object.assign({onClick:function(){return p((function(e){return!e}))}},m),n),f&&a.createElement(l.z,{onClose:function(){return p(!1)}},"function"==typeof t?t({isOpen:f,setIsOpen:p}):t))}},6810:function(e,t,n){"use strict";n.d(t,{z:function(){return l}});var r=n(9756),a=n(7294),c=["children"],l=function(e){var t=e.children,n=(0,r.Z)(e,c);return a.createElement("button",Object.assign({},n,{className:"button "+(n.className?n.className:"")}),t)}},8667:function(e,t,n){"use strict";n.d(t,{z:function(){return a}});var r=n(7294);function a(e){var t=e.children,n=e.onClose;return r.createElement("div",{style:{position:"fixed",width:"30%",height:"100vh",right:0,top:0,backgroundColor:"white",zIndex:999,padding:"10px",borderLeft:"1px solid grey"}},r.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},r.createElement("span",{className:"cursor-pointer",onClick:n},"✖")),t)}},9191:function(e,t,n){"use strict";n.d(t,{zx:function(){return r.z},UW:function(){return i},Zb:function(){return o},mY:function(){return f},CV:function(){return m},II:function(){return p},Ar:function(){return y},LZ:function(){return d},iA:function(){return h},mQ:function(){return N},Vp:function(){return C}});var r=n(6810),a=n(9756),c=n(7294),l=["children","type"],i=function(e){var t=e.children,n=e.type,r=(0,a.Z)(e,l);return c.createElement("div",Object.assign({},r,{className:"callout callout-"+n+" "+(r.className?r.className:"")}),t)},u=n(4165),o=function(e){var t=e.title,n=e.description,r=e.tags,a=e.className,l=e.onClick;return c.createElement("div",{className:"card "+(a||"")+" "+(0,u.AK)({"cursor-pointer":Boolean(l)}),onClick:l},c.createElement("div",{className:"header"},c.createElement("div",{className:"title"},t)),c.createElement("div",{className:"body"},c.createElement("div",{className:"description"},n)),c.createElement("div",{class:"footer"},c.createElement("div",{className:"tags"},r)))},s=function(e){var t,n=e.content,r=e.children,a=e.direction,l=void 0===a?"top":a,i=e.delay,u=void 0===i?400:i,o=(0,c.useState)(!1),s=o[0],m=o[1];return c.createElement("div",{className:"tooltip-wrapper",onMouseEnter:function(){t=setTimeout((function(){m(!0)}),u||400)},onMouseLeave:function(){clearInterval(t),m(!1)}},r,s&&c.createElement("div",{className:"tooltip-tip "+l},n))},m=function(e){var t=e.copy,n=e.children,r=(0,c.useState)(),a=r[0],l=r[1],i=(0,c.useRef)();return(0,c.useEffect)((function(){return function(){return i.current&&clearTimeout(i.current)}}),[]),c.createElement("span",{className:"cursor-pointer",onClick:function(){(0,u.vQ)(t||n),l(!0),i.current=setTimeout((function(){l(!1)}),2e3)}},c.createElement(s,{content:a?"Copied!":"Copy"},n))},d=function(e){var t=e.size,n=void 0===t?"m":t;return c.createElement("div",{className:"spacer-"+n})},f=function(e){var t=e.copyable,n=e.children,r=e.label,a=t?c.createElement(m,{copy:n},c.createElement("code",null,n)):c.createElement("code",null,n);return c.createElement("div",null,r&&c.createElement(c.Fragment,null,c.createElement("div",null,r),c.createElement(d,null)),a)};n(8667);function p(e){var t=Object.assign({},e);return c.createElement("input",Object.assign({},t,{className:"input "+(t.className||"")}))}var v=n(5444),E=["isPartiallyCurrent","isCurrent"],b=[{link:"/",label:"Home"},{link:"/apps",label:"Apps"},{link:"/faqs",label:"FAQs"},{link:"/dev-utils",label:"Development utils"}];function y(e){var t=e.children,n=e.buttons;return c.createElement(c.Fragment,null,c.createElement("div",{className:"layout_menu"},c.createElement("div",{className:"layout_menu_links"},c.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}},c.createElement("div",null,b.map((function(e){var t=e.link,n=e.label;return c.createElement(v.rU,{key:"layout_link_"+t,getProps:function(e){return r="/"!==t,c=(n=e).isPartiallyCurrent,l=n.isCurrent,(0,a.Z)(n,E),r?c?{style:{color:"black"}}:{}:l?{style:{color:"black"}}:{};var n,r,c,l},to:t},n)}))),n&&c.createElement("div",{className:"layout_buttons"},n)))),c.createElement("div",{className:"layout_main"},t))}function h(e){var t=e.columns,n=e.rows;return c.createElement("table",{className:"table"},c.createElement("thead",null,c.createElement("tr",null,t.map((function(e){return c.createElement("td",null,e.label)})))),c.createElement("tbody",null,n.map((function(e,n){return c.createElement("tr",{key:"table-row-"+n},t.map((function(t,r){return c.createElement("td",Object.assign({},t.copyable?{onClick:function(){return(0,u.vQ)(e[t.id])},className:"cursor-pointer"}:{},{key:"table-cell-"+n+"-"+r}),t.copyable?c.createElement(m,null,e[t.id]):e[t.id])})))}))))}var N=function(e){var t=e.tabs,n=(0,c.useState)(t[0].id),r=n[0],a=n[1];return c.createElement(c.Fragment,null,c.createElement("div",{className:"tabs"},c.createElement("ul",null,t.map((function(e){return c.createElement("li",{className:"cursor-pointer "+(0,u.AK)({"tab-selected":e.id===r}),onClick:function(){return a(e.id)},key:"tab-"+e.id},e.label)})))),c.createElement("div",null,t.find((function(e){return e.id===r})).render()))},C=function(e){var t=e.label,n=e.onChange,r=(0,c.useState)(!1),a=r[0],l=r[1];return c.createElement("span",{className:"tag cursor-pointer "+(a?"color-primary-all":"background-color-disabled"),onClick:function(){n&&(l(!a),n({checked:!a,value:t}))}},t)}},1916:function(e,t,n){"use strict";n.d(t,{E:function(){return a}});var r=n(7294);function a(e){var t=e.onChange,n=e.value;return r.createElement("div",{className:"search-bar"},r.createElement("input",{className:"input",placeholder:"Search",value:n,onChange:function(e){return t(e.target.value)}}),r.createElement("span",{className:"cursor-pointer",onClick:function(){return t("")}},"×"))}},6400:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(7294),a=n(9191),c=n(5444),l=n(1916),i=n(5595);function u(e){var t=r.useState(""),n=t[0],u=t[1],o=e.data.allAppsJson.nodes;r.useEffect((function(){var t=new URLSearchParams(e.location.search),n=t.get("q");n&&(u(n),t.delete("q"),(0,c.c4)("/apps",{replace:!0}))}),[]);var s=n?o.filter((function(e){return[e.name,e.description].some((function(e){return e.toLowerCase().includes(n.toLowerCase())}))})):o;return r.createElement(a.Ar,{buttons:r.createElement("div",null,r.createElement(i.y,{label:"Tips"},r.createElement("div",{className:"mb-s"},"Tips"),r.createElement("div",{className:"mb-s"},r.createElement(a.UW,{type:"info"},r.createElement("strong",null,"Tip:")," you can search in these apps through a browser search engine. Add it to your browser: ",r.createElement(a.CV,{copy:e.location.href+"?q=%s"},r.createElement("code",null,e.location.href,"?q=%s")),"."))))},r.createElement("div",{className:"mb-s apps-search-bar"},r.createElement(l.E,{onChange:u,value:n})),r.createElement("div",{className:"mb-s apps-layout"},s.map((function(e){return r.createElement(a.Zb,{key:e.name,title:e.name,description:e.description,onClick:function(){(0,c.c4)(e.slug)}})}))))}},4165:function(e,t,n){"use strict";n.d(t,{vQ:function(){return r},KG:function(){return a},AK:function(){return c},wR:function(){return l}});var r=function(e){var t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",t.style.display="hidden",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)};function a(e,t,n){var r=document.createElement("a");try{r.href=window.URL.createObjectURL(new Blob([e],{type:t})),r.download=n,r.click()}catch(a){console.error(a)}finally{r.remove()}}var c=function(e){return Object.entries(e).filter((function(e){e[0];var t=e[1];return"function"==typeof t?t():t})).map((function(e){return e[0]})).join(" ")};function l(e,t){var n=new URLSearchParams(e.search);return t.map((function(e){return n.get(e)}))}}}]);
//# sourceMappingURL=component---src-pages-apps-index-js-dc64f0f0a50c13c4604c.js.map