(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),r=t(74),i=t.n(r),u=t(13),m=t(165),o=t(161),c=t(164),s=t(166),d=t(167),g=t(168),k=t(169),v=t(170),E=t(156),b=t(175),f=t(12),x=Object(l.createContext)(void 0),h=function(e){var a=Object(l.useState)({auki:!1,sivu:0}),t=Object(f.a)(a,2),r=t[0],i=t[1],u=Object(l.useState)({ml:1,maxH:3}),m=Object(f.a)(u,2),o=m[0],c=m[1],s=Object(l.useState)({paalla:!1,tiedot:{valmiste:"",laVahvuus:0,mgVrk:0}}),d=Object(f.a)(s,2),g=d[0],k=d[1],v=Object(l.useState)(localStorage.getItem("laakeaineet")?JSON.parse(localStorage.getItem("laakeaineet")):[]),E=Object(f.a)(v,2),b=E[0],h=E[1],p=Object(l.useState)(localStorage.getItem("valinta")?JSON.parse(localStorage.getItem("valinta")).sort(function(e,a){return e.valmiste>a.valmiste?1:-1}):[{valmiste:"Morfiini",laVahvuus:20,mgVrk:30},{valmiste:"Oksikodoni",laVahvuus:10,mgVrk:0},{valmiste:"Hydromorfiini",laVahvuus:50,mgVrk:0},{valmiste:"Haloperidoli",laVahvuus:5,mgVrk:5},{valmiste:"Midatsolaami",laVahvuus:5,mgVrk:0},{valmiste:"Glykopyrroni",laVahvuus:.2,mgVrk:1.2},{valmiste:"Natriumkloridi",laVahvuus:9,mgVrk:10}].sort(function(e,a){return e.valmiste>a.valmiste?1:-1})),j=Object(f.a)(p,2),O=j[0],V=j[1],N=Object(l.useState)(b.filter(function(e){return"Natriumkloridi"!==e.valmiste}).reduce(function(e,a){return e+Number(a.mgVrk/a.laVahvuus)},0)),F=Object(f.a)(N,2),y=F[0],S=F[1],C=Object(l.useState)(b.filter(function(e){return"Natriumkloridi"!==e.valmiste}).reduce(function(e,a){return e+Number(a.mgVrk/a.laVahvuus/y*50/(a.mgVrk/a.laVahvuus))},0)),w=Object(f.a)(C,2),H=w[0],M=w[1],T=Array.from(b.filter(function(e){return"Natriumkloridi"!==e.valmiste}),function(e){var a=e.mgVrk/e.laVahvuus,t=a/y*50;return isNaN(t/a)?0:t/a}),I=Array.from(b.filter(function(e){return"Natriumkloridi"!==e.valmiste}),function(e){var a=e.mgVrk/e.laVahvuus/y*50;return isNaN(a)?0:a});return Object(l.useEffect)(function(){b.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0?S(b.filter(function(e){return"Natriumkloridi"!==e.valmiste}).reduce(function(e,a){return e+Number(a.mgVrk/a.laVahvuus)},0)+Number(b.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk)):S(b.filter(function(e){return"Natriumkloridi"!==e.valmiste}).reduce(function(e,a){return e+Number(a.mgVrk/a.laVahvuus)},0)),localStorage.setItem("laakeaineet",JSON.stringify(b)),localStorage.setItem("valinta",JSON.stringify(O.filter(function(e){return!b.includes(e)})))},[b]),n.a.createElement(x.Provider,{value:{laakeTaulukko:b,setLaakeTaulukko:h,mlVrkSumma:y,setMlVrkSumma:S,riittavyys50ml:H,setRiittavyys50ml:M,bolus:o,setBolus:c,summaTaulukko:T,getIndex:function(){for(var e=0,a=0;a<T.length;a++)0!==T[a]&&e++;return e},bolusSumma:I,ohje:r,setOhje:i,vaihtoehdot:O,setVaihtoehdot:V,muokkausTila:g,setMuokkaustila:k}},e.children)},p=function(){var e=Object(l.useContext)(x),a=e.ohje,t=e.laakeTaulukko,r=e.mlVrkSumma,i=e.bolus,m=e.setBolus;return n.a.createElement(s.a,{sx:{width:"70%"}},n.a.createElement(d.a,{sx:{borderRadius:"10px",backgroundColor:"lightgray",boxShadow:5},"aria-label":"simple table"},n.a.createElement(g.a,null,n.a.createElement(k.a,null,n.a.createElement(v.a,null,"Boluksien m\xe4\xe4ritys"),n.a.createElement(v.a,{align:"center"}),n.a.createElement(v.a,{align:"center"}),n.a.createElement(v.a,{align:"center"},"bolus ml"),n.a.createElement(v.a,{align:"center"},"max bol lkm/h"),n.a.createElement(v.a,{align:"center"},"lukko (min)")),n.a.createElement(k.a,null,n.a.createElement(v.a,null),n.a.createElement(v.a,{align:"center"}),n.a.createElement(v.a,{align:"center"}),n.a.createElement(v.a,{sx:4===a.sivu?{border:"5px solid blue"}:{},align:"center"},n.a.createElement(E.a,{defaultValue:i.ml,onChange:function(e){return m(Object(u.a)(Object(u.a)({},i),{},{ml:Number(e.target.value)}))}})),n.a.createElement(v.a,{sx:4===a.sivu?{border:"5px solid blue"}:{},align:"center"},n.a.createElement(E.a,{defaultValue:i.maxH,onChange:function(e){return m(Object(u.a)(Object(u.a)({},i),{},{maxH:Number(e.target.value)}))}})),n.a.createElement(v.a,{align:"center"},(60/i.maxH).toFixed(2))),n.a.createElement(k.a,null,n.a.createElement(v.a,null),n.a.createElement(v.a,{align:"center"},"pitoisuus"),n.a.createElement(v.a,{align:"center"},"mg/h"),n.a.createElement(v.a,{align:"center"},"bolus mg"),n.a.createElement(v.a,{align:"center"},"maxbol mg/h"),n.a.createElement(v.a,{align:"center"},"max lis\xe4 mg/24h"))),n.a.createElement(b.a,null,t.filter(function(e){return"Natriumkloridi"!==e.valmiste}).map(function(e,a){var t=e.mgVrk/e.laVahvuus,l=Number(t/r*e.laVahvuus),u=l*(r/24),m=l*i.ml,c=Number(m)*Number(i.maxH),s=24*c;return n.a.createElement(n.a.Fragment,null,n.a.createElement(k.a,{key:a},n.a.createElement(v.a,null,n.a.createElement(o.a,null,e.valmiste)),n.a.createElement(v.a,{align:"center"},0===l?n.a.createElement(n.a.Fragment,null):l.toFixed(2)),n.a.createElement(v.a,{align:"center"},0===l?n.a.createElement(n.a.Fragment,null):u.toFixed(2)),n.a.createElement(v.a,{align:"center"},n.a.createElement("b",null,0===m?n.a.createElement(n.a.Fragment,null):m.toFixed(2))),n.a.createElement(v.a,{align:"center"},0===c?n.a.createElement(n.a.Fragment,null):c.toFixed(2)),n.a.createElement(v.a,{align:"center"},0===s?n.a.createElement(n.a.Fragment,null):s.toFixed(2))))}))))},j=function(){var e=Object(l.useContext)(x),a=e.bolus,t=e.bolusSumma,r=e.mlVrkSumma,i=e.laakeTaulukko,u=t.reduce(function(e,a){return e+a},0);return n.a.createElement(s.a,{sx:{width:"29.5%",marginLeft:"0.5%"}},n.a.createElement(d.a,{sx:{borderRadius:"10px",backgroundColor:"lightgray",boxShadow:5},"aria-label":"simple table"},n.a.createElement(g.a,null,n.a.createElement(k.a,{sx:{backgroundColor:"lightgreen"}},n.a.createElement(v.a,null,"Max bol lkm/h huomioiden oletettu k\xe4ytt\xf6aika"),n.a.createElement(v.a,{align:"center"},"riitt\xe4vyys (50ml)"),n.a.createElement(v.a,{align:"center"},"riitt\xe4vyys (100ml)")),n.a.createElement(k.a,null,n.a.createElement(v.a,null,"vrk"),n.a.createElement(v.a,{align:"center"},i.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0?((u+Number(i.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/r*50))/(r+a.ml*a.maxH*24)).toFixed(2):(u/(r+a.ml*a.maxH*24)).toFixed(2)),n.a.createElement(v.a,{align:"center"},i.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0?((u+Number(i.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/r*50))/(r+a.ml*a.maxH*24)*2).toFixed(2):(u/(r+a.ml*a.maxH*24)*2).toFixed(2)))),n.a.createElement(b.a,null,n.a.createElement(k.a,null,n.a.createElement(v.a,{align:"left"},"h"),n.a.createElement(v.a,{align:"center"},i.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0?((u+Number(i.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/r*50))/(r+a.ml*a.maxH*24)*24).toFixed(2):(u/(r+a.ml*a.maxH*24)*24).toFixed(2)),n.a.createElement(v.a,{align:"center"},i.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0?((u+Number(i.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/r*50))/(r+a.ml*a.maxH*24)*24*2).toFixed(2):(u/(r+a.ml*a.maxH*24)*24*2).toFixed(2))))))},O=function(){return n.a.createElement(o.a,{paddingTop:10,paddingBottom:1,textAlign:"center",fontSize:10,margin:"auto"},"Petri Nyk\xe4nen ",(new Date).getFullYear(),n.a.createElement("br",null),"petri.nykaenen@gmail.com")},V=t(16),N=t(162),F=t(163),y=t(176),S=t(177),C=t(178),w=t(80),H=t.n(w),M=t(173),T=t(157),I=t(152),L=t(155),B=function(){var e=Object(l.useContext)(x),a=e.vaihtoehdot,t=e.setVaihtoehdot,r=e.laakeTaulukko,i=e.setLaakeTaulukko,m=e.setMuokkaustila,o=e.muokkausTila;return n.a.createElement(M.a,{sx:{width:"100%",margin:"10px"}},n.a.createElement(T.a,{shrink:!1,id:"demo-simple-select-label"},"Lis\xe4\xe4 l\xe4\xe4keaine"),n.a.createElement(I.a,{displayEmpty:!0,labelId:"demo-simple-select-label",id:"demo-simple-select",value:"",onChange:function(e){var l;"Muu"===(l=e).target.value?m(Object(u.a)(Object(u.a)({},o),{},{paalla:!0})):(t(a.filter(function(e){return e!==l.target.value})),i([].concat(Object(V.a)(r),[l.target.value])))}},a.map(function(e,a){return n.a.createElement(L.a,{key:a,value:e},e.valmiste)}),n.a.createElement(L.a,{value:"Muu"},"Muu (kirjaa mik\xe4)")))},J=function(){var e=Object(l.useContext)(x),a=e.laakeTaulukko,t=e.mlVrkSumma,r=e.ohje,i=e.setLaakeTaulukko,m=e.muokkausTila,h=e.setMuokkaustila,p=e.setVaihtoehdot,j=e.vaihtoehdot,O=Object(l.useState)({paalla:!1,arvo:0,dialog:!1,nimi:"",muutos:0}),w=Object(f.a)(O,2),M=w[0],T=w[1];return Object(l.useEffect)(function(){""!==m.tiedot.valmiste&&0!==m.tiedot.laVahvuus&&0!==m.tiedot.mgVrk&&(i([].concat(Object(V.a)(a),[m.tiedot])),h(Object(u.a)(Object(u.a)({},m),{},{paalla:!1,tiedot:{valmiste:"",laVahvuus:0,mgVrk:0}})),localStorage.setItem("laakeaineet",JSON.stringify(a)))},[m]),n.a.createElement(s.a,{sx:{width:"70%"}},n.a.createElement(d.a,{sx:{borderRadius:"10px",backgroundColor:"lightgray",boxShadow:5},"aria-label":"simple table"},n.a.createElement(g.a,null,n.a.createElement(k.a,null,n.a.createElement(v.a,null,"Valmiste"),n.a.createElement(v.a,{align:"center"},"LA-Vahvuus (mg/ml)"),n.a.createElement(v.a,{align:"center"},"mg/vrk"),n.a.createElement(v.a,{align:"center"},"ml/vrk"),n.a.createElement(v.a,{align:"center"},"mg/h"),n.a.createElement(v.a,{align:"center"},"pit mg/ml"),n.a.createElement(v.a,{sx:{backgroundColor:"lightgreen",fontSize:"12px"},align:"center"},"l\xe4\xe4ke-",n.a.createElement("br",null),"annostelija ml 50"),n.a.createElement(v.a,{sx:{backgroundColor:"lightgreen",fontSize:"12px"},align:"center"},"l\xe4\xe4ke-",n.a.createElement("br",null),"annostelija ml 100"))),n.a.createElement(b.a,null,a.map(function(e,l){var m=a.filter(function(e){return"Natriumkloridi"===e.valmiste})[0],s=e.mgVrk/e.laVahvuus,d=s/24*e.laVahvuus,g=s/t*e.laVahvuus,b=s/t*50,f=s/t*100,x=0,h=0;return a.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0&&(x=m.mgVrk/t*50,h=m.mgVrk/t*100),n.a.createElement(n.a.Fragment,null,n.a.createElement(N.a,{open:M.dialog},n.a.createElement(F.a,null,n.a.createElement(y.a,null,"Haluatko varmasti muuttaa l\xe4\xe4keaineen (",M.nimi,") vahvuutta?"),n.a.createElement(S.a,null,n.a.createElement(c.a,{onClick:function(){a[M.arvo].laVahvuus=M.muutos,T(Object(u.a)(Object(u.a)({},M),{},{paalla:!1,arvo:0,dialog:!1})),i(Object(V.a)(a))}},"Vahvista muokkaus"),n.a.createElement(c.a,{onClick:function(){return T(Object(u.a)(Object(u.a)({},M),{},{paalla:!1,arvo:0,dialog:!1}))}},"Peruuta")))),n.a.createElement(k.a,{key:l},n.a.createElement(v.a,null,n.a.createElement(C.a,{onClick:function(){return e=l,i(a.filter(function(t){return t!==a[e]})),void("Morfiini"!==a[e].valmiste&&"Oksikodoni"!==a[e].valmiste&&"Hydromorfiini"!==a[e].valmiste&&"Haloperidoli"!==a[e].valmiste&&"Midatsolaami"!==a[e].valmiste&&"Glykopyrroni"!==a[e].valmiste&&"Natriumkloridi"!==a[e].valmiste||p([].concat(Object(V.a)(j),[a[e]]).sort(function(e,a){return e.valmiste>a.valmiste?1:-1})));var e}},n.a.createElement(H.a,null)),n.a.createElement(o.a,{sx:{display:"inline-block"}},e.valmiste)),n.a.createElement(v.a,{sx:5===r.sivu?{border:"5px solid blue"}:{},onDoubleClick:function(){return T(Object(u.a)(Object(u.a)({},M),{},{paalla:!0,arvo:l,nimi:e.valmiste}))},align:"center"},M.paalla&&M.arvo===l?n.a.createElement(E.a,{onBlur:function(e){return T(Object(u.a)(Object(u.a)({},M),{},{dialog:!0,muutos:e.target.value}))},defaultValue:e.laVahvuus,sx:{width:"100%"}}):n.a.createElement(o.a,null,e.laVahvuus)),n.a.createElement(v.a,{align:"center",sx:1===r.sivu?{border:"5px solid blue"}:{}},"Natriumkloridi"===e.valmiste?n.a.createElement(n.a.Fragment,null):n.a.createElement(E.a,{sx:{backgroundColor:"orange",width:"150%"},defaultValue:e.mgVrk,onChange:function(e){a[l].mgVrk=e.target.value,i(Object(V.a)(a))}})),n.a.createElement(v.a,{align:"center",sx:1===r.sivu?{border:"5px solid blue"}:3===r.sivu&&"Natriumkloridi"===e.valmiste?{border:"5px solid blue"}:{}},n.a.createElement("b",null,"Natriumkloridi"===e.valmiste?n.a.createElement(E.a,{sx:{backgroundColor:"orange",width:"150%"},defaultValue:e.mgVrk,onChange:function(e){a[l].mgVrk=e.target.value,i(Object(V.a)(a))}}):0===s?n.a.createElement(n.a.Fragment,null):(Math.round(100*s)/100).toFixed(2))),n.a.createElement(v.a,{align:"center"},0===d?n.a.createElement(n.a.Fragment,null):(Math.round(100*d)/100).toFixed(2)),n.a.createElement(v.a,{align:"center"},0===g?n.a.createElement(n.a.Fragment,null):(Math.round(100*g)/100).toFixed(2)),n.a.createElement(v.a,{align:"center"},"Natriumkloridi"===e.valmiste&&x?x.toFixed(1):0===b?n.a.createElement(n.a.Fragment,null):b.toFixed(1)),n.a.createElement(v.a,{align:"center"},"Natriumkloridi"===e.valmiste&&h?h.toFixed(1):0===f?n.a.createElement(n.a.Fragment,null):f.toFixed(1))))}),n.a.createElement(k.a,null,m.paalla?n.a.createElement(n.a.Fragment,null,n.a.createElement(v.a,null,n.a.createElement(E.a,{type:"text",onBlur:function(e){return h(Object(u.a)(Object(u.a)({},m),{},{tiedot:Object(u.a)(Object(u.a)({},m.tiedot),{},{valmiste:e.target.value})}))},sx:{backgroundColor:"orange"}})),n.a.createElement(v.a,null,n.a.createElement(E.a,{type:"number",onBlur:function(e){return h(Object(u.a)(Object(u.a)({},m),{},{tiedot:Object(u.a)(Object(u.a)({},m.tiedot),{},{laVahvuus:Number(e.target.value)})}))},sx:{backgroundColor:"orange"}})),n.a.createElement(v.a,null,n.a.createElement(E.a,{type:"number",onChange:function(e){return h(Object(u.a)(Object(u.a)({},m),{},{tiedot:Object(u.a)(Object(u.a)({},m.tiedot),{},{mgVrk:Number(e.target.value)})}))},sx:{backgroundColor:"orange"}}))):n.a.createElement(v.a,{sx:{width:"90%"}},n.a.createElement(B,null))),n.a.createElement(k.a,null,n.a.createElement(v.a,{padding:"none"}),n.a.createElement(v.a,{padding:"none"}),n.a.createElement(v.a,{padding:"none"},n.a.createElement(o.a,{fontSize:"12px",sx:{paddingLeft:"2"}},"Infuusionopeus")),n.a.createElement(v.a,{sx:2===r.sivu?{border:"5px solid blue",backgroundColor:"yellow"}:{backgroundColor:"yellow"},align:"center"},t.toFixed(2)," ml/vrk")),n.a.createElement(k.a,null,n.a.createElement(v.a,{padding:"none"}),n.a.createElement(v.a,{padding:"none"}),n.a.createElement(v.a,{padding:"none"},n.a.createElement(o.a,{fontSize:"12px"},"Infuusionopeus")),n.a.createElement(v.a,{sx:2===r.sivu?{border:"5px solid blue",backgroundColor:"yellow"}:{backgroundColor:"yellow"},align:"center"},(t/24).toFixed(2)," ml/h")))))},R=function(){var e=Object(l.useContext)(x),a=e.ohje,t=e.mlVrkSumma,r=e.summaTaulukko,i=e.getIndex,u=e.bolusSumma,m=e.laakeTaulukko;return n.a.createElement(s.a,{sx:{width:"29.5%",marginLeft:"0.5%"}},n.a.createElement(d.a,{sx:{borderRadius:"10px",backgroundColor:"lightgray",boxShadow:5},"aria-label":"simple table"},n.a.createElement(g.a,null,n.a.createElement(k.a,{sx:{backgroundColor:"lightgreen"}},n.a.createElement(v.a,null,"Yhteens\xe4"),n.a.createElement(v.a,{align:"center"},Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0)?(u.reduce(function(e,a){return e+a},0)+Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/t*50)).toFixed(2):u.reduce(function(e,a){return e+a},0).toFixed(2)),n.a.createElement(v.a,{align:"center"},Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0)?(2*(u.reduce(function(e,a){return e+a},0)+Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/t*50))).toFixed(2):(2*u.reduce(function(e,a){return e+a},0)).toFixed(2))),n.a.createElement(k.a,null,n.a.createElement(v.a,null,"ml/h huomioiden oletettu k\xe4ytt\xf6aika"),n.a.createElement(v.a,{align:"center"},"riitt\xe4vyys (50ml)"),n.a.createElement(v.a,{align:"center"},"riitt\xe4vyys (100ml)"))),n.a.createElement(b.a,null,n.a.createElement(k.a,null,n.a.createElement(v.a,{align:"left",sx:3===a.sivu?{border:"5px solid blue"}:{}},"vrk"),n.a.createElement(v.a,{align:"center"},Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0)?((r.reduce(function(e,a){return e+a},0)+Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/t/m.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk*50))/(i()+1)).toFixed(2):(r.reduce(function(e,a){return e+a},0)/i()).toFixed(2)),n.a.createElement(v.a,{align:"center"},Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste}).length>0)?((r.reduce(function(e,a){return e+a},0)+Number(m.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk/t/m.filter(function(e){return"Natriumkloridi"===e.valmiste})[0].mgVrk*50))/(i()+1)*2).toFixed(2):(r.reduce(function(e,a){return e+a},0)/i()*2).toFixed(2))),n.a.createElement(k.a,null,n.a.createElement(v.a,{align:"left",sx:3===a.sivu?{border:"5px solid blue"}:{}},"h"),n.a.createElement(v.a,{align:"center"},(r.reduce(function(e,a){return e+a},0)/i()*24).toFixed(2)),n.a.createElement(v.a,{align:"center"},(r.reduce(function(e,a){return e+a},0)/i()*24*2).toFixed(2))))))};var z=function(){var e=Object(l.useContext)(x),a=e.ohje,t=e.setOhje,r=e.laakeTaulukko,i=Object(l.useRef)(),s=Object(l.useRef)(),d=function(){i.current.scrollIntoView({behavior:"smooth"})},g=function(){s.current.scrollIntoView({behavior:"smooth"})};return n.a.createElement(n.a.Fragment,null,n.a.createElement(m.a,{ref:s,sx:{width:"1200px",display:"flex",flexWrap:"wrap"}},a.auki?n.a.createElement(m.a,{sx:{}},1===a.sivu?n.a.createElement(n.a.Fragment,null,n.a.createElement(o.a,{sx:{padding:"20px"}},"M\xe4\xe4r\xe4\xe4 l\xe4\xe4kkeen vrk-annos mg (oranssi kentt\xe4), saat vastaavan m\xe4\xe4r\xe4 ml:ssa viereiseen sarakkeeseen"),n.a.createElement(c.a,{variant:"outlined",onClick:function(){t(Object(u.a)(Object(u.a)({},a),{},{sivu:2})),d()}},"Seuraava")):3===a.sivu?n.a.createElement(n.a.Fragment,null,n.a.createElement(o.a,{sx:{padding:"20px"}},"M\xe4\xe4r\xe4\xe4 tarvittaessa NaCl tilavuus (oranssi kentt\xe4) pyrkien pieneen infuusionopeuteen (0,1-2,0 ml/h), tarkista samalla l\xe4\xe4keannostelijan riitt\xe4vyys vuorokausissa (vrk) ja tuntia (h)"),n.a.createElement(c.a,{sx:{display:"block"},variant:"outlined",onClick:function(){t(Object(u.a)(Object(u.a)({},a),{},{sivu:4})),d()}},"Seuraava")):5===a.sivu?n.a.createElement(n.a.Fragment,null,n.a.createElement(o.a,{sx:{padding:"20px"}},"Voit muuttaa l\xe4\xe4keaineen vahvuutta tuplaklikkaamalla kentt\xe4\xe4, jolloin avautuu tekstikentt\xe4 muokkaamista varten."),n.a.createElement(c.a,{sx:{display:"block"},variant:"outlined",onClick:function(){t(Object(u.a)(Object(u.a)({},a),{},{auki:!1,sivu:0})),g()}},"Seuraava")):n.a.createElement(n.a.Fragment,null)):n.a.createElement(n.a.Fragment,null),n.a.createElement("br",null),!1===a.auki&&r.length>0?n.a.createElement(c.a,{variant:"outlined",sx:{margin:"10px",display:"block"},onClick:function(){return t(Object(u.a)(Object(u.a)({},a),{},{auki:!0,sivu:1}))}},"OHJE"):n.a.createElement(n.a.Fragment,null),r.length>0?n.a.createElement(m.a,{sx:{display:"flex",flexWrap:"nowrap"}},n.a.createElement(J,null),n.a.createElement(R,null)):n.a.createElement(n.a.Fragment,null,n.a.createElement(o.a,{sx:{padding:"20px"}},"Aloita lis\xe4\xe4m\xe4ll\xe4 taulukkoon l\xe4\xe4keaine"),n.a.createElement(B,null)),2===a.sivu?n.a.createElement(n.a.Fragment,null,n.a.createElement(o.a,{sx:{padding:"20px"}},"Katso liuoksen minimim\xe4\xe4r\xe4 vuorokaudessa ja tunnissa."),n.a.createElement(c.a,{variant:"outlined",onClick:function(){t(Object(u.a)(Object(u.a)({},a),{},{sivu:3})),g()}},"Seuraava")):4===a.sivu?n.a.createElement(n.a.Fragment,null,n.a.createElement(o.a,{sx:{padding:"20px"}},"Tarvittaessa, m\xe4\xe4rit\xe4 bolukset alas taulukkoon ml ja max bol/h"),n.a.createElement(c.a,{sx:{marginLeft:"10px"},variant:"outlined",onClick:function(){t(Object(u.a)(Object(u.a)({},a),{},{sivu:5})),g()}},"Seuraava")):n.a.createElement(n.a.Fragment,null),r.length>0?n.a.createElement(m.a,{sx:{display:"flex",flexWrap:"nowrap",marginTop:"1%"},ref:i},n.a.createElement(p,null),n.a.createElement(j,null)):n.a.createElement(n.a.Fragment,null),n.a.createElement(O,null)))};i.a.createRoot(document.getElementById("root")).render(n.a.createElement(h,null,n.a.createElement(n.a.StrictMode,null,n.a.createElement(z,null))))},94:function(e,a,t){e.exports=t(109)}},[[94,1,2]]]);
//# sourceMappingURL=main.5de10d40.chunk.js.map