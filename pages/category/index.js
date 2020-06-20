import {request} from '../../request/index.js' 
Page({
  data: {
    // 左侧数据
    leftMenuList:[],
    // 右侧数据
    rightContent:[],
    // 右侧被点击的菜单项
    currentIndex:0,
    // 右侧scroll的距离
    scrollTop:0
  },
  Cates:[],
  onLoad: function (options) {
    // 判断有无本地储存数据
    const Cates = wx.getStorageSync('cates');
    if(!Cates) {
      this.getCates()
    }else{
      // 有旧数据 自定义过期时间20s
      if(Date.now() - Cates.time > 1000*20) {
        // 重新请求
        this.getCates()
      }else {
        // 可以使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  getCates() {
    request({url:"/categories"})
    .then(res => {
      this.Cates = res.data.message;
      // 把数据存入到本地储存中
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});

      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 左侧导航点击事件
  handleItemTap(e) {
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})
