const parseRojan = function (rojanlink) {
    var ostr =rojanlink.replace(/\r\n/g,'')
        ostr = decodeURIComponent(ostr)
    //console.log(ostr)
    var obj = new Object()
    obj.name = ostr.match(/#[\s\S]*/g)[0].replace(/#/g, '').replace(/💎/g,'🐓🏀').replace(/🚇/g,'🐓🏀')
    obj.type = 'trojan'
    obj.server = ostr.match(/@[\s\S]*:/g)[0].replace(/@/g, '').replace(/:/g, '')
    obj.port = ostr.match(/:[\d]*\?/g)[0].replace(/:/g, '').replace(/\?/g, '')
    obj.password = ostr.match(/\/[\s\S]*@/g)[0].replace(/\//g, '').replace(/@/g, '')
    obj.udp = true
    obj.sni = ostr.match(/sni=[\s\S]*#/g)[0].replace(/sni=/g, '').replace(/#/g, '')
    obj.skip_cert_verify = true
    ostr = JSON.stringify(obj).replace(/:true/g, ': true ').replace(/name":"/g, 'name": \'').replace(/","type/g, '\',"type').replace(/"/g, ' ').replace(/_/g, '-')
    return {
        str: ostr,
        name:obj.name
    }
}
const parseVmess=function(vmesslink)
{
    var vmessobj=vmesslink.replace(/\r\n/g,'').replace(/vmess:\/\//g,'')
    vmessobj=atob(vmessobj)
    
    var newobj=new Object()
    vmessobj=JSON.parse(vmessobj)
    newobj.name=vmessobj.ps.replace(/💎/g,' 🐤🏀').replace(/🚇/g,' 🐤🏀')
    newobj.type='vmess'
    newobj.server=vmessobj.add
    newobj.port=vmessobj.port
    newobj.uuid=vmessobj.id
    newobj.alterId=0
    newobj.cipher='auto'
    newobj.udp=true
    newobj.network=vmessobj.net
    newobj.ws_opts={
        path:vmessobj.path.replace('\/','/'),
        headers:{
            Host:vmessobj.host
        }
    }
    newobj.ws_path=newobj.ws_opts.path
    newobj.ws_headers=newobj.ws_opts.headers
    var str=JSON.stringify(newobj).replace(/:{/g,': {').replace(/:true/g,': true').replace(/name":"/g,'name": \'').replace(/","type/g,'\',"type').replace(/"/g,' ').replace(/_/g,'-').replace(/:0/g,': 0').replace(/💎/g,'🐔').replace(/🚇/g,'🐔')
    return {
        str,
        name:newobj.name
    }
}
module.exports={
    parseRojan,
    parseVmess
}