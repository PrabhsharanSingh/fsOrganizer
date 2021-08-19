let fs=require("fs");
let path=require("path");
function tree(src){
    if(src == undefined){
        let src = process.cwd();
        treeHelper(src,"");
        let content=fs.readdirSync(src);
        let parentFolderName=path.basename(src);
        let completePath="└──"+parentFolderName;
        for(let i=0;i<content.length;i++){
            completePath += "\n\t"+"├──"+content[i];
        }
        console.log(completePath);
    }else{
        let doesExist=fs.existsSync(src)
        if(doesExist){
            treeHelper(src,"");;
        }else{
            console.log("THIS ADDRESS DOES'NT EXIST!!!!!!!!!!");
        }
    }
}

function treeHelper(dirPath,space){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true){
        let fileName = path.basename(dirPath);
        console.log(space+"├──"+fileName);
    }else{
        let dirName = path.basename(dirPath);
        console.log(space+"└──"+dirName);
        let childrens = fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childPath = path.join(dirPath,childrens[i]);
            //console.log(childPath);
            treeHelper(childPath,"\t"+space);
        }
    }
}

module.exports = {
    fxnT: tree
}