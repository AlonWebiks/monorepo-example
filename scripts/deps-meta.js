const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..")
const dist = path.join(__dirname, "..", ".deps")
const ignore = ["node_modules", ".git", ".deps"]

/**
 * 
 * @param {Array<string>} pathArray 
 * @param {string} dist 
 * @param {boolean} start 
 * @returns 
 */

function copyDirStruct(pathArray, dist, start = true) {
    const currentPath = path.join(...pathArray);  
    const items = fs.readdirSync(currentPath);
    if(!items.includes("package.json") || start) {
        items.filter(item => !ignore.includes(item)).forEach(dir => {
            const isDir = fs.statSync(path.join(currentPath,dir)).isDirectory()
            if (!isDir) return;
            copyDirStruct([...pathArray, dir], dist, false)
        })
        if(!start) return;
    }
    const src = path.join(currentPath, "package.json");
    const dstDir = path.join(dist, ...(pathArray.slice(1))) 
    const dst = path.join(dstDir, "package.json");
    fs.mkdirSync(dstDir, { recursive: true });
    fs.copyFileSync(src, dst);
    if(items.includes("package-lock.json")) {
        const src = path.join(currentPath, "package-lock.json");
        const dst = path.join(dstDir, "package-lock.json");
        fs.copyFileSync(src, dst);
    }
}
fs.rmSync(dist, { recursive: true, force: true });
copyDirStruct([root], dist)
