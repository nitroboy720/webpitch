"use-strict";

const fs = require("fs");
const readFile = require("util").promisify(fs.readFile);
const config = require(__dirname+"/"+"config.json");


module.exports.build = async function(){
    let files = new Array;
    for (const page of config.pages){
        files.push(fs.createWriteStream(__dirname+"/"+config.outputDirectory+page.url,"UTF-8"));
    }
    
    await writeHeads(files);
    await writeBodys(files);
    files.forEach(file=>file.end());
    console.log("done building pages");
}

async function writeHeads(files){
    for (let i = 0; i<files.length; i++){
        for (const defaultHeadTag of config.defaultHeadTags){
            await files[i].write(defaultHeadTag+"\n");
        }
        for (const headTag of config.pages[i].headTags){
            await files[i].write(headTag+"\n");
        }
    }
}

async function writeBodys(files){
    for (let i = 0; i<files.length; i++){
        for (const component of config.pages[i].bodyComponents){
            if (component.startsWith("<")){
                files[i].write(component+"\n");
            } else{
                await readFile(__dirname+"/"+config.componentsDirectory+component, "UTF-8")
                .then(data=>files[i].write(data+"\n"));
            }
        }
    }
}