export function NetRequest(url,params) {
    return new Promise( (resolve,reject)=>{
        fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(params),
        }).then( res => {
            const data =  res.json()
            console.log("request:" + url)
            console.log(data)
            console.log("===================")
            resolve(data)
        }).catch(err=>{
            console.log("err================>")
            console.log(err)
            reject(err)
        })
    })
}

export function fixAddressWithNum(address,num) {
    let prefix = address.substr(0,num)
    let end = address.substr(address.length-num,num)
    return prefix + '...' + end
}
