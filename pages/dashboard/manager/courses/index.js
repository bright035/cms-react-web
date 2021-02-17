import Head from 'next/head';
import styles from '../../../../styles/Home.module.css';
import React, {useState,useEffect} from 'react';
import "antd/dist/antd.css";
import AppLayout from '../../../../lib/component/layout';
import {axiosGetCountries} from '../../../../lib/service';
import {StudentTable} from '../../../../lib/component/studentTable';


export default function Manager() {
 
    const [version, setVersion] = useState("1.02");

    useEffect(() => {
      axiosGetCountries().then((res) => {
        const countryList = res.data.data.map((country) => {
          return country?.en
          // return !!country&&country.hasOwnProperty('en')? country.en:""
          });
        localStorage?.setItem('CountryList',JSON.stringify(countryList)); 
      }
      )
    }, [version]);
    
    return (
      <AppLayout>
        <p>breadCrumb</p>
        
      </AppLayout>
    );
}