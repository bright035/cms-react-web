import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import React, {useState,useEffect} from 'react';
import "antd/dist/antd.css";
import { useRouter } from 'next/router';




export default function Manager() {
    const router = useRouter();

    useEffect(() => {
      router.push('/dashboard/manager/overview',{shallow:true});
    }, []);
    
    return (
      null
    );
}
