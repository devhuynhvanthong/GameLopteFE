import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Spin, Table } from 'antd'
import url from '~/utils/Urls'
import apis from '~/utils/CallApi'
import styles from '~/styles/index.module.css'
import constants from '../utils/Constants'

export default function Account(props) {
    const setPermisiion_ = props.setPermisiion_
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [form] = Form.useForm()
    useEffect(() => {
        loadingData()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
    ]

    function handleAdd({ username, password }) {
        apis().post(url().URL_REGISTER, {
            username, password,
        }).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    loadingData()
                    alert('Thêm dữ liệu thành công')
                } else {
                    alert(response.message)
                }
            } else {
                alert('Thêm dữ liệu thất bại')
            }
        }).catch(() => {
            alert('Thêm dữ liệu thất bại')
        })
    }

    function loadingData() {
        setLoading(true)
        apis().get(url().URL_ACCOUNT).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    setData(response.body.data)
                    setLoading(false)
                } else {
                    if (response.category === 'authentication') {
                        setPermisiion_(false)
                    }
                }
            } else {
                setPermisiion_(false)
            }
        })
    }

    return <>
        {
            <div>
                {
                    <div className={styles.wapper}>
                        <div className={styles.formInputKey}>
                            <div>
                                <span className={styles.labelAdd}>Thêm tài khoản mới!</span>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10,
                                }}>

                                    <Form
                                        onFinish={handleAdd}
                                        form={form}
                                        layout={'vertical'}>
                                        <Form.Item
                                            label={'Tài khoản'}
                                            name={'username'}
                                            rules={[{
                                                required: true,
                                                message: <span>{'Tài khoản là bắt buộc'}</span>,
                                            }]}
                                        >
                                            <Input placeholder="Nhập tài khoản..."/>
                                        </Form.Item>
                                        <Form.Item
                                            label={'Mật khẩu'}
                                            name={'password'}
                                            rules={[{
                                                required: true,
                                                message: <span>{'Mật khẩu là bắt buộc'}</span>,
                                            }]}
                                        >
                                            <Input placeholder="Nhập mật khẩu..."/>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <div>
                                <Button onClick={() => {
                                    form.submit()
                                }} className={styles.btnAdd}>Thêm mới</Button>
                            </div>
                        </div>
                        <div className={styles.formData}>
                            <span className={styles.labelData}>Danh sách tài khoản</span>
                            <Spin
                                spinning={isLoading}
                                tip="Loading...">
                                <Table
                                    style={{ background: 'white', borderRadius: 20 }}
                                    columns={columns}
                                    dataSource={data}
                                    pagination={data.length
                                        ? {
                                            total: data.length,
                                            pageSize: 10,
                                        }
                                        : false}
                                />
                            </Spin>
                        </div>
                    </div>
                }
            </div>
        }
    </>
}
