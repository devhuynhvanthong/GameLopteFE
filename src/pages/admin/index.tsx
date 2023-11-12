import styles from '~/styles/index.module.css'
import Keys from '~/componentns/Keys'
import { Menu, Modal } from 'antd'
import Urls from '~/utils/Urls'
import Library from '~/utils/Library'
import Games from '~/componentns/Games'
import Settings from '~/componentns/Settings'
import Statistics from '~/componentns/Statistics'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppstoreOutlined, KeyOutlined, LogoutOutlined, OrderedListOutlined, SettingOutlined } from '@ant-design/icons'
import Login from '~/componentns/Login'
import Account from '~/componentns/Account'
import Cookies from '~/utils/Cookies'
import constants from '~/utils/Constants'
export default function Admin() {
    const router = useRouter()
    const library = Library()
    const cookie = Cookies()
    const [selectMenu, setSelectMenu] = useState('1')
    const [title, setTitle] = useState('Keys')
    const [isShowModel, setShowModel] = useState(false)
    const [permission_, setPermission_] = useState(true)
    useEffect(() => {
        if (library.isMobile()) {
            router.push('not-support-mobile')
        }
    }, [])
    function getItem(label: string, key: string, icon: any, children: any = undefined, type: any = undefined) {
        return {
            key,
            icon,
            children,
            label,
            type,
        }
    }

    const items = [

        getItem('Keys', '1', <KeyOutlined />),

        getItem('Games', '2', <AppstoreOutlined />),

        getItem('Key đã sử dụng', '3', <OrderedListOutlined />),

        getItem('Cài đặt', '4', <SettingOutlined />),

        getItem('Tài khoản', '5', <SettingOutlined />),

        getItem('Đăng xuất', '6', <LogoutOutlined />),
    ]
    function handleSelectMenu(key: any) {
        switch (key) {
        case '1':
            setSelectMenu(key)
            setTitle('Keys')
            break
        case '2':
            setSelectMenu(key)
            setTitle('Games')
            break
        case '3':
            setSelectMenu(key)
            setTitle('Key đã sử dụng')
            break
        case '4':
            setSelectMenu(key)
            setTitle('Cài đặt')
            break
        case '5':
            setSelectMenu(key)
            setTitle('Tài khoản')
            break
        case '6':
            setShowModel(true)
            break
        }
    }

    return <>
        <div className={styles.wapper}>
            <div className={styles.wapperAdmin}>
                {
                    typeof window && permission_ &&
                    <>
                        <div
                            style={{
                                width: 256,
                                marginTop: '20px',
                                marginLeft: '5px',
                            }}
                        >
                            <Menu
                                style={{
                                    borderRadius: '20px',
                                    padding: '10px',
                                }}
                                onSelect={(key:any) => {
                                    handleSelectMenu(key.key)
                                }}
                                defaultSelectedKeys={['1']}
                                mode="inline"
                                theme="dark"
                                inlineCollapsed={false}
                                items={items}
                            />

                        </div>
                        <div className={styles.bodyAdmin}>

                            <label style={{
                                color: 'white',
                                fontSize: '2em',
                            }}>{title}</label>
                            <hr style={{ marginTop: '5px' }}/>
                            {
                                selectMenu === '1' &&
                                <Keys setPermisiion_={setPermission_}/>
                            }
                            {
                                selectMenu === '2' &&
                                <Games setPermisiion_={setPermission_}/>
                            }
                            {
                                selectMenu === '3' &&
                                <Statistics setPermisiion_={setPermission_}/>
                            }
                            {
                                selectMenu === '4' &&
                                <Settings setPermisiion_={setPermission_}/>
                            }
                            {
                                selectMenu === '5' &&
                                <Account setPermisiion_={setPermission_}/>
                            }
                        </div>
                    </>
                }
                {
                    !permission_ &&
                    <Login />
                }

                <Modal
                    title={'Thông báo'}
                    centered
                    open={isShowModel}
                    onOk={() => {
                        cookie.Set(constants().KEY_ACCESS_TOKEN, null)
                        router.reload()
                    }}
                    onCancel={() => setShowModel(false)}
                >
                    <p>Bạn chắt chắn muốn đăng xuất?</p>
                </Modal>
            </div>
        </div>
    </>
}
