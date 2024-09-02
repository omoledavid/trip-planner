import{T as f,h as m,o as a,c as g,w as s,a as o,u as e,Z as p,f as y,g as h,b as i,d as r,n as _,j as k,e as x}from"./app-DpXstfWu.js";import{_ as v}from"./GuestLayout-0sWU7d-9.js";import{P as b}from"./PrimaryButton-1Jfmhz6r.js";import"./ApplicationLogo--sU2yCLS.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const w=i("div",{class:"mb-4 text-sm text-gray-600 dark:text-gray-400"}," Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ",-1),V={key:0,class:"mb-4 font-medium text-sm text-green-600 dark:text-green-400"},B={class:"mt-4 flex items-center justify-between"},L={__name:"VerifyEmail",props:{status:{type:String}},setup(n){const d=n,t=f({}),c=()=>{t.post(route("verification.send"))},u=m(()=>d.status==="verification-link-sent");return(l,E)=>(a(),g(v,null,{default:s(()=>[o(e(p),{title:"Email Verification"}),w,u.value?(a(),y("div",V," A new verification link has been sent to the email address you provided during registration. ")):h("",!0),i("form",{onSubmit:x(c,["prevent"])},[i("div",B,[o(b,{class:_({"opacity-25":e(t).processing}),disabled:e(t).processing},{default:s(()=>[r(" Resend Verification Email ")]),_:1},8,["class","disabled"]),o(e(k),{href:l.route("logout"),method:"post",as:"button",class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"},{default:s(()=>[r("Log Out")]),_:1},8,["href"])])],32)]),_:1}))}};export{L as default};
