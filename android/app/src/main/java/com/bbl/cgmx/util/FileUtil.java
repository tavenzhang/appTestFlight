package com.bbl.cgmx.util;

import android.text.TextUtils;
import android.util.Log;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;


/**
 * Created by jason on 2017/8/19.
 */

public class FileUtil {

    private static final String TAG=FileUtil.class.getSimpleName();

    public static boolean deleteFile(String path) {
        if (!TextUtils.isEmpty(path)) {
            File file = new File(path);
            return deleteFile(file);
        } else {
            return false;
        }
    }

    public static boolean deleteFile(File file) {
        return file != null && file.exists() ? file.delete() : false;
    }

    public static boolean deleteDirectory(File file, boolean deleteSelf) {
        if (file != null && file.exists()) {
            if (file.isFile()) {
                return file.delete();
            } else {
                if (file.isDirectory()) {
                    File[] childFile = file.listFiles();
                    if (childFile != null && childFile.length > 0) {
                        File[] arr = childFile;
                        int len= childFile.length;

                        for (int i= 0; i < len; ++i) {
                            File f = arr[i];
                            deleteDirectory(f, true);
                        }
                    }

                    if (deleteSelf) {
                        file.delete();
                    }
                }

                return true;
            }
        } else {
            return false;
        }
    }

    public static void deleteSerializableFile(String path) {
        try {
            File e = new File(path);
            if (e.exists()) {
                e.delete();
            }
        } catch (Exception var2) {
        }

    }

    public static void moveFile(File pIn, File pOut) {
        pIn.renameTo(pOut);
    }

    public static boolean writeStringToFile(String data, String path) {
        boolean result = true;
        FileWriter writer = null;

        try {
            File ex = new File(path);
            if (!ex.exists()) {
                ex.getParentFile().mkdirs();
            }

            writer = new FileWriter(ex);
            writer.write(data);
            writer.close();
        } catch (Exception var13) {
            Log.e(TAG,var13.toString());
            result = false;
        } finally {
            try {
                writer.close();
            } catch (Exception var12) {
            }

        }

        return result;
    }

    /**
     *  读文件成字符串流到内存中
     * @param path
     * @return  如果是null或者"" 则表示为没有错误日志
     */
    public static String readFileToString(String path){
        FileReader reader=null;
        BufferedReader br=null;
        File file=new File(path);
        StringBuilder sb=new StringBuilder();
        try{
            if(!file.exists()){
                return null;
            }
            reader=new FileReader(file);
            br=new BufferedReader(reader);
            String line=null;
            while (!TextUtils.isEmpty(line=br.readLine())){
                sb.append(line);
            }
            return sb.toString();
        }catch (Exception e){
            Log.e(TAG,e.toString());
        }finally {
            try {
                if(reader!=null ) {
                    reader.close();
                }
                if(br!=null){
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


}
