let e=document.createElement("style");e.innerHTML=".card-header{display:flex;justify-content:space-between;align-items:center}.text{font-size:14px}.item{margin-bottom:18px}.button{margin-top:30px}",document.head.appendChild(e);import{a as t}from"./axios.5682ea03.js";import{E as o,r as s,c as n,w as a,a as i,o as l,b as d,d as r,e as c,f as h,t as u,g as m,v as p,h as g}from"./index.e0a038f7.js";var w={name:"ShowLink",data:()=>({message:"",link:"",loading:!0,show:!1,token:"",avatarLink:"http://q2.qlogo.cn/headimg_dl?dst_uin=473211890&spec=100"}),mounted(){this.show=!1,this.loading=!0,t.get("/api/GetNewLink").then((e=>{var t=e.data;this.message=t.message,200==e.data.state?(this.link=t.link,this.token=t.token,this.show=!0,o({title:"获取链接成功",message:"点我复制",type:"success",duration:0,position:"bottom-right",showClose:!1,onclick:()=>{this.Copy()}})):(this.message="出错了",this.link=t.message,o({title:"获取链接失败",type:"error",duration:3e3,position:"bottom-right",showClose:!0}),"token验证失败"==t.message&&s.push("/login"))})).catch((e=>{console.log("Server Internal Error:"+e),this.message="Server Internal Error",this.link="坤坤友情提示:服务器内部错误！",o({title:"获取链接失败",type:"error",duration:3e3,position:"bottom-right",showClose:!0})})).finally((()=>{this.loading=!1}))},methods:{Copy:function(){let e=document.createElement("input");const t=document.activeElement;document.body.appendChild(e),e.value=document.getElementById("link").innerHTML,e.focus(),e.select();try{var s=document.execCommand("copy")}catch(e){s=!1}return s?(o.closeAll(),o({title:"复制成功",message:"",type:"success",duration:1e3,position:"bottom-right",onclick:()=>{this.Copy()}})):(o.closeAll(),o({title:"复制失败",message:"可能是浏览器不支持，需要手动复制",type:"error",duration:1e3,position:"bottom-right",onclick:()=>{this.Copy()}})),document.body.removeChild(e),t.focus(),s},DownFile:async function(){t.get("/api/sub/"+this.token).then((e=>{this.createAndDownloadFile("ikun.yml",e.data),o({title:"下载成功",type:"success",duration:3e3,position:"bottom-right",showClose:!0})})).catch((e=>{console.log(e),o({title:"下载失败",type:"error",duration:3e3,position:"bottom-right",showClose:!0})}))},createAndDownloadFile(e,t){var o=document.createElement("a"),s=new Blob([t]);o.download=e,o.href=URL.createObjectURL(s),o.click(),URL.revokeObjectURL(s)}}};const f={class:"card-header"},k=h("span",{class:"el-dropdown-link"},[h("h3",null,"帮助")],-1),y={href:"/help/Windows.html"},b={href:"/help/Android.html"},v={id:"link"},C={class:"button"};w.render=function(e,t,o,s,w,x){const _=i("el-dropdown-item"),L=i("el-dropdown-menu"),E=i("el-dropdown"),A=i("el-card"),j=i("el-button"),D=i("el-col"),F=i("el-row"),R=g("loading");return l(),n(F,null,{default:a((()=>[d(D,{span:24},{default:a((()=>[r((l(),c("div",null,[d(A,{shadow:e.always,"body-style":{padding:"50px"},class:"box-card"},{header:a((()=>[h("div",f,[h("span",null,u(w.message),1),d(E,{trigger:"click"},{dropdown:a((()=>[d(L,null,{default:a((()=>[h("a",y,[d(_,{class:"clearfix"},{default:a((()=>[m(" 如何在Win上使用 ")])),_:1})]),h("a",b,[d(_,{class:"clearfix"},{default:a((()=>[m(" 如何在Android上使用 ")])),_:1})])])),_:1})])),default:a((()=>[k])),_:1})])])),default:a((()=>[h("div",v,u(w.link),1)])),_:1},8,["shadow"]),h("div",C,[r(d(j,{onClick:x.DownFile,type:"success",round:""},{default:a((()=>[m("下载配置文件")])),_:1},8,["onClick"]),[[p,w.show]])])])),[[R,w.loading]])])),_:1})])),_:1})};export{w as default};
