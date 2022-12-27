import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import stylesCustom from '../styles/index.module.css'
import apis from '../utils/CallApi'
import urls from  '../utils/Urls'
import library from '../utils/Library'
import constants from  '../utils/Constants'
import {useRouter} from "next/router";
import {Spin} from "antd";
import React, {useState} from "react";
import {verify} from "crypto";

export default function Home() {
  const router = useRouter()
  const [isLoading,setLoading] = useState(false)
  const [text,setText] = useState("Đang chuẩn bị key...")

  async function verifyKey() {
    await fetch('https://api.ipify.org?format=json').then(respone => {
      if (respone) {
        // @ts-ignore
        let ip = respone.body.ip
        console.log([
            ip,respone.body,respone.body.ip
        ])
        
        setText("Đang chuẩn bị key....")
        apis().post(urls().URL_VERIFY_KEY, {
          ip: ip
        }).then(response => {
          if (response.status == constants().SUCCESS) {
            console.log("aaa" + library().base64Encode(response.body.code))
            router.push('https://loptelink.com/st?api=ceca3b7645d9cfe99f8d483dcea35738cb0aa57b&url=https://gamelopte.aigoox.com/get-key?code=' + library().base64Encode(response.body.code))
            setText("Nhận key thành công")
          } else {
            setText("Nhận key thất bại!")
          }
        }).catch((e) => {
          setText("Nhận key thất bại!")
          setLoading(false)
        })
      }

    }).catch((e) => {
      setText("Nhận key thất bại!")
      setLoading(false)
    })

  }

  function handleClickGetKey() {
    setLoading(true)
    if(!isLoading){
      verifyKey()
    }
  }

  return (
      <>
        <Head>
          <title>Nhận key - Gamelopte</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo99.png" />
        </Head>
        <main className={styles.main}>
          {
            <div className={stylesCustom.butonGroup}>
              <div>
                <button
                    onClick={()=>handleClickGetKey()}
                    className={stylesCustom.btnGetKey}>
                  Nhận Key
                </button>
              </div>
              {
                <div className={stylesCustom.textNoti}> {isLoading ? <div><Spin style={{color:"white", marginRight:5}} /> {text}</div>:""}</div>
              }
            </div>
          }

        </main>
      </>
  )
}
