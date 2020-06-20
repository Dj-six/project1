
// 关于收货地址的方法


export const getSetting = () => {
  return new Promise ((resolve,recject) => {
    wx.getSetting({
      success: (result) => {
        resolve (result);
      },
      fail: () => {},
      complete: () => {}
    });
  })
}



export const chooseAddress = () => {
  return new Promise ((resolve,recject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve (result);
      },
      fail: () => {},
      complete: () => {}
    });
  })
}



export const openSetting = () => {
  return new Promise ((resolve,recject) => {
    wx.openSetting({
      success: (result) => {
        resolve (result);
      },
      fail: () => {},
      complete: () => {}
    });
  })
}




// Promise的showModel


export const showModal = ({content}) => {
  return new Promise ((resolve,recject) => {
    wx.showModal({
      title:'提示',
      content:content,
      success: (res)=>{
        resolve (res);
      },
      fail: (err)=>{
        recject(err)
      },
    });
  })
}


export const showToast = ({title}) => {
  return new Promise ((resolve,recject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res)=>{
        resolve (res);
      },
      fail: (err)=>{
        recject(err)
      },
    });
  })
}