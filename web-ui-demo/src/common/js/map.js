export function MP() {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(BMap)
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=Pg1rNuqgYkh6WZ4sGoA1zv7z&callback=init";
        script.onerror = reject;
        document.head.appendChild(script);
    })
}
