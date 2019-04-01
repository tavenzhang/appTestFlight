
import {unzip,zip } from 'react-native-zip-archive'
import RNFS from "react-native-fs";
import Toast from "../JXHelper/JXToast";


export default class FileTools {

    static  downloadFile(formUrl,downloadDest,param,onSucFuc, onProgress){

        formUrl=formUrl+"?rodom="+Math.random();
        TW_Log("FileTools---downloadFile=="+formUrl);
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                // this.log+="==>downloadFile--begin="+res;
                //{statusCode: 404, headers: {…}, jobId: 1, contentLength: 153
                TW_Log("FileTools---downloadFile=background--=",res);
                if(res.statusCode != 404){
                    //TW_Store.commonBoxStore.isShow=true;
                }else{
                    Toast.showShortCenter("需要下载的游戏文件不存在");
                  // TW_Store.commonBoxStore.isShow=false
                }

            },
            progress: (res) => {
                // this.log+="==>progress-="+res;
                //let pro = res.bytesWritten / res.contentLength;
                //  TW_Store.commonBoxStore.curPecent=res.bytesWritten;
                //  TW_Store.commonBoxStore.totalPecent=res.contentLength;
                TW_Log("FileTools---progress==",res);
                if(onProgress){
                     onProgress({percent:(res.bytesWritten/res.contentLength).toFixed(2),param});
                }
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            this.log+="==>downloadFile-="+options;
            ret.promise.then(res => {
                TW_Log('FileTools---downloadFile---sucess file://' + downloadDest,res);
                // this.log+="==>downloadFile--promise="+JSON.stringify(res)+"---state--"+res.statusCode;
                if(`${res.statusCode}`!="404"){
                    FileTools.unzipFile(downloadDest,TW_Store.bblStore.storeDir,onSucFuc,param);
                }else{
                    this.log+="==>downloadFile--fail--notstart=";
                    TW_Log('FileTools --downloadFile --下载文件不存在--', downloadDest);

                    TW_Store.commonBoxStore.isShow=false;
                    if(onSucFuc){
                        onSucFuc({rs:false,param})
                    }
                }
            }).catch(err => {
                TW_Log('FileTools --downloadFile --fail err', err);
            });
        }
        catch (e) {
            TW_Log("FileTools---downloadFile--error",error);
        }
    }



    //解压
    static  unzipFile(srcZip,destDir,onSucFuc,param) {
        TW_Log(`FileTools--unzip start------ ${srcZip}`);
        // zipPath：zip的路径
        // destDir：解压到的目录
        unzip(srcZip,  destDir)
            .then((path) => {
                if(onSucFuc){
                    Toast.showShortCenter(param.gameName+" 准备完成");
                    onSucFuc({rs:true,param})
                }
                TW_Log(`FileTools-- unzip completed at------ ${path}`);
            })
            .catch((error) => {
                 Toast.showShortCenter(param.gameName+" 解压失败");
                if(onSucFuc){
                    onSucFuc({rs:false,param})
                }
                RNFS.unlink(srcZip).then(() => {
                    TW_Log("FileTools--- 删除文件----srcZip=="+srcZip)
                }).catch((err) => {
                    TW_Log("FileTools--- 删除文件失败");
                });
            })
    }


    async exist(target_dir) {
        let target_dir_exist = await RNFS.exists(target_dir);
        if(target_dir_exist){
            return true;
        }else{
            return false;
        }
    }


}