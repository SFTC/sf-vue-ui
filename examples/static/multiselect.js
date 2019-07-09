export const config =  [
    {
      "name": "API",
      "type": "API",
      "introduce": "适用平台：VUE移动端",
      "tableData": [
        {
          "attr": "imgSrc",
          "introduce": "轮播的图片",
          "type": "Array",
          "default": ""
        }, {
          "attr": "navClass",
          "introduce": "导航显示的位置",
          "type": "String",
          "default": "pic-nav",
          "option": "pic-nav-left/pic-nav"
        }, {
          "attr": "navNumberClass",
          "introduce": "导航里面是否显示数字",
          "type": "Boolean",
          "default": "true"
        }, {
          "attr": "timer",
          "introduce": "是否开启定时器，自动轮播",
          "type": "Boolean",
          "default": "false"
        }]
    },
    {
      "name": "API.imgSrc",
      "type": "API",
      "introduce": "imgSrc 中可包含多个对象,下面针对对象的属性(参数)做说明",
      "tableData": [
        {
          "attr": "img",
          "introduce": "图片路径",
          "type": "String"
        }, {
          "attr": "link",
          "introduce": "点击图片跳转的路径",
          "type": "String"
        }]
    }
  ]
