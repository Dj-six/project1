import {request} from '../../request/index.js'
// pages/goods-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  getGoodsDetail(goods_id) {
    request({url:"/goods/detail",data:{goods_id}})
    .then(res => {
      console.log(res);
      this.setData({
        goodsObj: {
          goods_id:res.data.message.goods_id,
          goods_name:res.data.message.goods_name,
          goods_price:res.data.message.goods_price,
          goods_introduce:res.data.message.goods_introduce,
          pics:res.data.message.pics,
          goods_small_logo:res.data.message.goods_small_logo
        }
      })
    })
  },
  // 点击轮播图放大
  handlePrevewImage(e) {
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.data.goodsObj.goods_id);

    if(index === -1) {
      // 没有添加过
      this.data.goodsObj.num = 1;
      this.data.goodsObj.checked = true;
      cart.push(this.data.goodsObj);
    }else {
      // 已经添加过
      cart[index].num ++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  }
})





