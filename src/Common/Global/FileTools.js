import {
    CameraRoll,
    NativeModules, PermissionsAndroid
} from 'react-native';
import {unzip, zip,} from 'react-native-zip-archive'
import RNFS from "react-native-fs";
import Toast from "../JXHelper/JXToast";
import RNFetchBlob from 'react-native-fetch-blob';
import * as RNShot from "react-native-view-shot";
import Base64 from "../JXHelper/Base64";

export default class FileTools {


    static downloadFile(formUrl, downloadDest, param, onSucFuc, onProgress) {

        formUrl = formUrl + "?rodom=" + Math.random();
        TW_Log("FileTools---downloadFile==" + formUrl);
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                // this.log+="==>downloadFile--begin="+res;
                //{statusCode: 404, headers: {…}, jobId: 1, contentLength: 153
                TW_Log("FileTools---downloadFile=background--=", res);
                if (res.statusCode != 404) {
                    //TW_Store.commonBoxStore.isShow=true;
                } else {
                    Toast.showShortCenter("需要下载的游戏文件不存在");
                    // TW_Store.commonBoxStore.isShow=false
                }
                // TW_Log("FileTools---progress==param=="+JSON.stringify(param))

            },
            progress: (res) => {
                // this.log+="==>progress-="+res;
                //let pro = res.bytesWritten / res.contentLength;
                //  TW_Store.commonBoxStore.curPecent=res.bytesWritten;
                //  TW_Store.commonBoxStore.totalPecent=res.contentLength;
                // TW_Log("FileTools---progress==new==",res);

                if (onProgress) {
                    if (res.contentLength > 0) {
                        onProgress({percent: (res.bytesWritten / res.contentLength).toFixed(2), param});
                    } else {
                        let tempContent = param.name && param.name.indexOf("app_") > -1 ? 40000000 : 18000000; //如果读取不到总大小 因为cdn等因素 默认使用18m 到0.99 等待，
                        //let tempContent=40000000;
                        let tempPercent = (res.bytesWritten / tempContent).toFixed(2);
                        tempPercent = tempPercent >= 0.99 ? 0.99 : tempPercent;
                        //   TW_Log("FileTools---progress= FileTools.tempPercent---=", tempPercent);
                        onProgress({percent: tempPercent, param});
                    }

                }
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            this.log += "==>downloadFile-=" + options;
            ret.promise.then(res => {
                TW_Log('FileTools---downloadFile---sucess file://' + downloadDest, res);

                // this.log+="==>downloadFile--promise="+JSON.stringify(res)+"---state--"+res.statusCode;
                if (`${res.statusCode}` != "404") {
                    FileTools.unzipFile(downloadDest, TW_Store.bblStore.storeDir, onSucFuc, param);
                } else {
                    this.log += "==>downloadFile--fail--notstart=";
                    TW_Log('FileTools --downloadFile --下载文件不存在--', downloadDest);

                    TW_Store.commonBoxStore.isShow = false;
                    if (onSucFuc) {
                        onSucFuc({rs: false, param})
                    }
                }
            }).catch(err => {
                TW_Log('FileTools --downloadFile --fail err', err);
            });
        } catch (e) {
            TW_Log("FileTools---downloadFile--error", error);
        }
    }


    //解压
    static unzipFile(srcZip, destDir, onSucFuc, param) {
        TW_Log(`FileTools--unzip start------ ${srcZip}`);
        // zipPath：zip的路径
        // destDir：解压到的目录
        unzip(srcZip, destDir)
            .then((path) => {
                if (onSucFuc) {
                    Toast.showShortCenter(param.gameName + " 准备完成");
                    onSucFuc({rs: true, param})
                }
                TW_Log(`FileTools-- unzip completed at------ ${path}`);
            })
            .catch((error) => {
                Toast.showShortCenter(param.gameName + " 解压失败");
                if (onSucFuc) {
                    onSucFuc({rs: false, param})
                }
                RNFS.unlink(srcZip).then(() => {
                    TW_Log("FileTools--- 删除文件----srcZip==" + srcZip)
                }).catch((err) => {
                    TW_Log("FileTools--- 删除文件失败");
                });
            })
    }


    async exist(target_dir) {
        let target_dir_exist = await RNFS.exists(target_dir);
        if (target_dir_exist) {
            return true;
        } else {
            return false;
        }
    }

    static async onSaveCameraRoll(base64Img, success = null, fail = null,isBase64=true) {
        if (NativeModules.RNFetchBlob) {
            if (G_IS_IOS) {
                FileTools.saveCameraRoll(base64Img, success, fail,isBase64);
            } else {
                try {
                    // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        TW_Log('You can use the WRITE_EXTERNAL_STORAGE');
                        FileTools.saveCameraRoll(base64Img, success, fail,isBase64);
                    } else {
                        Toast.showShortCenter(" 请先允许使用相册功能 才能保存图片!");
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        } else {
            Toast.showShortCenter("请安装最新版本app 尽快到最新!");
        }


    }

    static  saveCameraRoll = (imageSrc, success = null, fail = null,isBase64=true) => {

        const dirs = G_IS_IOS ? RNFS.LibraryDirectoryPath : RNFS.DocumentDirectoryPath; // 外部文件，共享目录的绝对路径（仅限android）
        const downloadDest = `${dirs}/${((Math.random() * 10000000) | 0)}.png`;
        TW_Log("Image saved imageSrc--", imageSrc)
        if(isBase64){
            const imageDatas = imageSrc.split('data:image/png;base64,');
            const imageData = imageDatas[1];

            RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then((rst) => {
                try {
                    CameraRoll.saveToCameraRoll(downloadDest).then((e1) => {
                        success && success();
                        Toast.showShortCenter(" 图片保存成功!");
                    }).catch((e2) => {
                        fail && fail()
                        Toast.showShortCenter(" 图片保存失败--RNFetchBlob" + e2.toString());
                    })
                } catch (e3) {
                    fail && fail()
                    Toast.showShortCenter(" 图片保存失败--catch " + e3.toString());
                }
            });
        }else{
            try {
                CameraRoll.saveToCameraRoll(imageSrc).then((e1) => {
                    success && success();
                    Toast.showShortCenter(" 图片保存成功!");
                }).catch((e2) => {
                    fail && fail()
                    Toast.showShortCenter(" 图片保存失败--RNFetchBlob" + e2.toString());
                })
            } catch (e3) {
                fail && fail()
                Toast.showShortCenter(" 图片保存失败--catch " + e3.toString());
            }
        }

    }

    static onSaveScreen(isSavePhoto = false,captureRefName=null) {
        if(captureRefName){
            try {
                RNShot.captureRef(captureRefName,{
                    format: "jpg",
                    quality: 0.8,
                }).then(
                    uri => {
                        if (isSavePhoto) {
                            FileTools.onSaveCameraRoll(uri, null, null,false);
                        }
                        TW_Log("Image saved to--captureRef", uri)
                    },
                    error => TW_Log("Image saved Oops, snapshot failed", error)
                );

            } catch (e) {
            }
        }else{
            try {
                RNShot.captureScreen({
                    format: "jpg",
                    quality: 0.8,
                }).then(
                    uri => {
                        if (isSavePhoto) {
                            FileTools.onSaveCameraRoll(uri, null, null,false);
                        }
                        TW_Log("Image saved to--captureScreen", uri)
                    },
                    error => TW_Log("Image saved Oops, snapshot failed", error)
                );
            } catch (e) {


            }
        }


    }
}