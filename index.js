const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let folderName, extNameBefore, extNameAfter, targetFiles

rl.question('Enter folder path: \n', (folderPath) => {
    folderName = folderPath
    rl.question('Which file extension should rename? \n', (extName1) => {
        extNameBefore = extName1
        rl.question('To which extension \n', (extName2) => {
            extNameAfter = extName2
            getFiles()
            rl.close();
        })        
    })
})

function getFiles() {
    fs.readdir(folderName, (err, result) => {
        if (err) throw err

        result = result.filter(file => fs.statSync(folderName+'\\'+file).isFile())
        
        if (result[0] == undefined) {
            console.log('No files found')
            return
        }
        
        if (extNameBefore !== '' || extNameBefore !== ' ') {
            targetFiles = result.filter(file => path.extname(file) == `.${extNameBefore}`).map(file => file.split('.').slice(0, -1).join('.'))
            extNameBefore = `.${extNameBefore}`
            
        } else {
            targetFiles = result
        }

        console.log(targetFiles.length +' file(s) found');

        targetFiles.forEach((file, index) => {
            console.log(index+1, file)
            fs.rename(folderName+'\\'+file+extNameBefore, folderName+'\\'+file+'.'+extNameAfter, (err) => {
                if (err) throw err
                console.log(folderName+'\\'+file+'.'+extNameAfter+' renamed')
            })            
        })
    })    
}

