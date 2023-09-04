import React, { useEffect, useState } from 'react'
import apis from '~/utils/CallApi'
import urls from '~/utils/Urls'
import library from '~/utils/Library'
import constants from '~/utils/Constants'
import { useRouter } from 'next/router'
import styles_ from '~/styles/index.module.css'
import Logo from '~/componentns/logo'
import Maintenance from '~/componentns/Maintenance'
export default function GetKey() {
    const [key, setKey] = useState('Please wait...')
    const router = useRouter()
    const [maintenance, setMaintenance] = useState('')
    useEffect(() => {
        if (router.isReady) {
            apis().get(urls().URL_GET_CONFIG).then(response => {
                if (response) {
                    response.body.map((item: any) => {
                        if (item.code === 'maintenance') {
                            switch (item?.value.toLowerCase()) {
                            case 'true':
                                setMaintenance('maintenance')
                                break
                            case 'false':
                                setMaintenance('non-maintenance')
                                break
                            default:
                                setMaintenance('')
                            }
                        }
                    })
                }
            })
            if (router.query.code) {
                getKey()
            } else {
                setKey('Receiving key failed!')
            }
        }
    }, [router])

    const getKey = () => {
        const data = library().base64Decode(router.query.code)
        const arrayData = data.toString().split('&v=')
        apis().post(urls().URL_GET_KEY, {
            info: arrayData[1],
            code: arrayData[0],
        }).then(response => {
            if (response.status === constants().SUCCESS) {
                setKey(response.body.key)
            } else {
                setKey(response.message ? response.message : 'Receiving key failed!')
            }
        }).catch((e) => setKey(e))
    }

    function handleClickGetKey() {
        setTimeout(function() {
            router.push('/')
        }, 250)
    }

    return <>
        {
            maintenance === 'non-maintenance' &&
            <div>
                <Logo className={styles_.logo}/>
                <div className={styles_.keyGroup}>
                    <div className={styles_.key}>{key}</div>
                    <div className={styles_.textDescription}>
                        <p style={{ fontSize: '1.15em' }}>Coppy the key and paste in the app to Login</p>
                        <p style={{ fontSize: '1.15em', marginTop: '10px' }}>Sao chép key và dán vào ứng dụng để Login</p>
                    </div>
                </div>

                <div className={styles_.btnGetNewKeyGroup}>
                    <button
                        onClick={() => handleClickGetKey()}
                        className={styles_.btnGetNewKey}>
                        Get new key
                    </button>
                </div>
            </div>
        }
        {
            maintenance === 'maintenance' &&
            <Maintenance />
        }
    </>
}
