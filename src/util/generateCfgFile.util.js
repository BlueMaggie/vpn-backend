const { parseRojan, parseVmess } = require('./parseNode.util')
const {cfghead,cfgtail}=require('../constant/constant.cfg')
const generateCfgFile = function (data) {
    data = atob(data)
    var vmessarr = data.match(/vmess:\/\/[\s\S]*?\r\n/g)
    var rojanarr = data.match(/trojan:\/\/[\s\S]*?\r\n/g)
    var proxies = []
    var res=cfghead
    //console.log(cfghead)
    // console.log('proxies:\r\n    ')
    res+='proxies:\r\n'
    for (i = 0; i < vmessarr.length; i++) {
        let tmpobj = parseVmess(vmessarr[i])
        proxies[proxies.length] = tmpobj.name
        // console.log('    - '+tmpobj.str+'\r\n')
        res+='    - '+tmpobj.str+'\r\n'
    }
    for (i = 0; i < rojanarr.length; i++) {
        let tmpobj = parseRojan(rojanarr[i])
        proxies[proxies.length] = tmpobj.name
        // console.log('    - '+tmpobj.str+'\r\n')
        res+='    - '+tmpobj.str+'\r\n'
    }
    groupobj = {
        name: 'ikun云',
        type: 'select',
        proxies
    }
    var groupstr = JSON.stringify(groupobj).replace(/"/g, '\'').replace(/'name'/g, ' name ').replace(/'ikun云'/g, ' ikun云 ').replace(/'type'/g, ' type ').replace(/'select'/g, ' select ').replace(/'proxies'/g, ' proxies ').replace(/:\[/g,': \[')
    res+='proxy-groups:'
    res+='\r\n    - '+groupstr+'\r\n'
    res+=cfgtail
    // console.log('\r\n    - '+groupstr)
    // console.log(cfgtail)
    return res

}

module.exports= generateCfgFile