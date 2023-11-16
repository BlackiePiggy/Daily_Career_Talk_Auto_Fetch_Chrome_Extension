// content.js
// Your JavaScript code to be executed on the current page

// 获取xjhxxConHtm元素
var xjhxxCon = document.getElementById("xjhxxConHtm");

// 获取所有xjhxxList元素
var xjhxxListElements = xjhxxCon.getElementsByClassName("xjhxxList");

var userDefinedDate = prompt("请输入日期字符串（例如：11-16）:", "11-16");

var outputString = "";

outputString += "【" + userDefinedDate + "今日宣讲会预告】" + "\n";

// 遍历每个xjhxxList元素
for (var i = 0; i < xjhxxListElements.length; i++) {
    var xjhxxList = xjhxxListElements[i];

    // 提取xjhxxTime中的元素
    var xjhxxTimeElements = xjhxxList.getElementsByClassName("xjhxxTime");
    var xjhxxTime = xjhxxTimeElements[0];
    var dateElement = xjhxxTime.querySelector("div:nth-child(1)");
    var timeElement = xjhxxTime.querySelector("div:nth-child(2)");

    // 提取xjhxxUnits中的元素
    var xjhxxUnits = xjhxxList.getElementsByClassName("xjhxxUnits");
    var xjhxxUnitName = xjhxxUnits[0].getElementsByClassName("xjhxxUnitName")[0].textContent.trim();
    var xjhdz = xjhxxUnits[0].getElementsByClassName("xjhdz")[0].textContent.trim();

    // 提取onclick中的内容
    var onclickContent = xjhxxList.getAttribute("onclick");

    var xjhxxid = onclickContent.match(/\d+/)[0]

    // 将提取的信息输出到txt文本中
    // 你可以根据需要将信息拼接成字符串，然后写入到txt文件中
    // 这里仅作为演示，具体的写入文件操作可能需要根据你的环境和需求进行调整
    // 示例：将信息拼接成字符串
    if (dateElement.textContent.trim() == userDefinedDate)
    {
        outputString +=String.fromCodePoint(0x245F + i + 1);
        outputString +="【" + xjhxxUnitName + "】" + " ";
        outputString +="宣讲会地点：" + xjhdz + "，";
        outputString +="宣讲时间：" + addTwoHoursToTime(timeElement.textContent.trim()) + "\n";
        outputString +="招聘链接：" + "https://www.job.sjtu.edu.cn/career/xjhxx/view/" + xjhxxid + "\n";
    }
}

// 输出至txt文本
var blob = new Blob([outputString], { type: "text/plain;charset=utf-8" });
saveAs(blob, "output.txt"); // 使用FileSaver.js保存文件

function saveAs(blob, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

function addTwoHoursToTime(originalTime) {
    // 将时间字符串转换为 Date 对象
    var date = new Date("2000-01-01 " + originalTime);

    // 添加两个小时
    date.setHours(date.getHours() + 2);

    // 获取修改后的时间字符串
    var modifiedTime = formatTime(date);

    // 构建时间段字符串
    var timeRange = originalTime + "-" + modifiedTime;

    return timeRange;
}

function formatTime(date) {
    // 格式化时间，确保小时和分钟都有两位
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    return hours + ":" + minutes;
}

console.log("Script executed!");