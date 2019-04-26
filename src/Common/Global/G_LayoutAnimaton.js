import {LayoutAnimation} from 'react-native'

//android 某些机器在使用 create 动画 回出现 白屏问题
export  const G_LayoutAnimaton={
    defaultSpring:LayoutAnimation.Presets.spring,
    springNoDelete : {
        duration: 300,
        create: {
            type: LayoutAnimation.Types.spring,
            // type:LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
            // property:LayoutAnimation.Properties.opacity,
            springDamping: 0.8,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.9,
        },
    },
    springNoCreate : {//适用android android
        duration: 200,
        update: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.8,
        },
    },
    springWithDelete : {
        duration: 200,
        create: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
           // property:LayoutAnimation.Properties.opacity,
            springDamping: 0.5,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
        },
        delete:{
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
        }
    },
    easeNoDelete:{
        duration: 200,
        create:{
            type:LayoutAnimation.Types.easeInEaseOut,
           // property: LayoutAnimation.Properties.scaleXY,
             property:LayoutAnimation.Properties.opacity,
            springDamping: 0.5,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.opacity,
            springDamping: 0.8,
        },
    },
    easeNoCreate : {//适用android android
        duration: 200,
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
            // property:LayoutAnimation.Properties.opacity,
            springDamping: 0.8,
        },
    },
    easeWithDelete : {
        duration: 200,
        create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            //  property: LayoutAnimation.Properties.scaleXY,
            property:LayoutAnimation.Properties.opacity,
            springDamping: 0.5,
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
            springDamping: 0.7,
        },
        delete:{
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
        }
    },
    configureNext:(animation)=>{
        //android 某些机器在使用 create 动画 回出现 白屏问题,请换成对于的nocreate
        if(animation){
            LayoutAnimation.configureNext(animation)
        }else{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        }
    }
}

