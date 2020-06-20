// 引入发送请求的方法
import {request} from '../../request/index.js'
Page({
  data: {
    swiperList:[],
    catList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getcatList();
    this.getFloorList()
  },
  // 获取轮播数据
  getSwiperList() {
    request({url:"/home/swiperdata"})
    .then(result =>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  // 获取导航数据
  getcatList() {
    request({url:"/home/catitems"})
    .then(result =>{
      this.setData({
        catList:result.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({url:"/home/floordata"})
    .then(result =>{
      this.setData({
        floorList:result.data.message
      })
    })
  }
});