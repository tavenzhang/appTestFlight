#demo  sh release.sh 平台名称（365）

scriptPath=$(cd `dirname $0`; pwd)
configDir=${scriptPath}/../BBL_Game_Config
#ios工程目录
iosRoot=${scriptPath}/ios
androidRoot=${scriptPath}/android


#更新config文件
cd ${configDir}
#git checkout  develop
git pull
if [ $? -eq 0 ];then
   echo checkout config develop 分支切换成功
  else
    echo checkout config develop 分支切换成功分支不存在
    exit -1;
fi
cd ${scriptPath}
app=$@

git checkout  release/${app}
if [ $? -eq 0 ];then
      echo  分支切换成功 ${workRoot}
     else
      echo  分支不存在 ${workRoot}
   exit -1;
fi
git pull
   git merge  origin/master -m 'autoMerge master'
   if [ $? -eq 0 ];then
    echo ${app} merge成功
   else
    echo ${app} merge 失败
    exit -1;
   fi
if [ -d ${configDir}/${app}/ios ]; then
      echo 开始拷贝和替换 ${configDir}/${app}/ios 文件
    else
      echo  ${configDir}/${app}/ios 目录不存在
      exit -1;
fi
   rm -rf ${iosRoot}/JD/Images.xcassets
   cp -rf ${configDir}/${app}/ios/*   ${iosRoot}/JD/
   cp -rf ${configDir}/${app}/js/* ./src
   #android的也替换处理
   cp -rf ${configDir}/${app}/android/*   ${androidRoot}/
   cp -rf ${configDir}/${app}/assets/* ${androidRoot}/app/src/main/assets