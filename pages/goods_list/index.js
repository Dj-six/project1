import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 总页数
  totalPages:1,  

  QueryParams: {
    query: "",
    cid: "",
    pagenum:1,
    pagesize:10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.QueryParams.cid = options.cid,
   this.getGoodsList()

   wx.showLoading({
    title: '加载中',
  })
  
  // setTimeout(function () {
  //   wx.hideLoading()
  // }, 5000)
  },
  //页面触底事件
  onReachBottom() {
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据'
      });
    }else {
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList()
  },
  // 获取商品数据
  getGoodsList() {
    request({url:"/goods/search",data:this.QueryParams})
    .then(res => {
      const total = res.data.message.total;
      this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })

      // 下拉刷新完后关闭下拉刷新的窗口
      wx.stopPullDownRefresh();
    })
  },
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  }
})