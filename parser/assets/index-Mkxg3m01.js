import{s as p,u as f,_ as u,v as l,x as m}from"./vue-CjiL-Ko5.js";import{m as d}from"./vendor-C6TTjfhU.js";import"./codemirror-COBYkj6m.js";import"./es-build-D-IoVVhi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const n=p({history:f(),routes:[{path:"/bitran/parser/",component:u}]});n.beforeEach(async(c,t,o)=>{const e=await l().setupPageStore(c);e&&n.push({path:"/bitran/parser/",query:(e==null?void 0:e.query)??null}),o()});const a=m(u),y=d();a.use(n);a.use(y);a.mount("#__app");
