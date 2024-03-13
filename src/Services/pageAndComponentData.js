import React from 'react'
import {toast} from 'react-hot-toast'
import { apiConnector } from './apiConnector';
import { CatalogData } from './apis';

export const getCatalogPageData = async(categoryId) => {
  const toastId= toast.loading("Loading....");
  let result=[];
  try{
    const response=await apiConnector("POST",CatalogData.CATALOGPAGEDATA_API,{categoryId:categoryId,});

    if(!response?.data?.success){
        throw new Error("Error occur during fetch api");
    }

    result=response?.data;
  }catch(err){
    console.log("error occur during getCatalogPageData",err);
    toast.error(err.message);
    result=err.response?.data;
  }

  toast.dismiss(toastId);
  return result;
}
