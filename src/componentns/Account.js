import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Spin, Table } from 'antd'
import url from '~/utils/Urls'
import apis from '~/utils/CallApi'
import styles from '~/styles/index.module.css'
import constants from '../utils/Constants'

export default function Account(props) {
    const setPermisiion_ = props.setPermisiion_
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [form] = Form.useForm()
    const [formUpdate] = Form.useForm()
    const [update, setUpdate] = useState()
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
        {
            title: 'Thao tác',
            render: (value) => <label style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline',
            }} onClick={() => setUpdate(value) }>{'Cập nhật mật khẩu'}</label>,
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

    function handleSubmit(password) {
        setLoading(true)
        apis().put(url().URL_UPDATE_PASSWORD, { username: update?.username, password }).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    setUpdate(undefined)
                    setLoading(false)
                    alert('Cập nhật thành công')
                } else {
                    if (response.category === 'authentication') {
                        setPermisiion_(false)
                        return
                    }

                    alert('Cập nhật thất bại')
                }
            } else { alert('Cập nhật thất bại') }
        }).catch(() => {
            alert('Cập nhật thất bại')
        })
    }
    function RenderUpdateModal() {
        return <Modal
            title={`Cập nhật tài khoản - ${update?.username} `}
            onCancel={() => {
                setUpdate(undefined)
                formUpdate.resetFields()
            }}
            onOk={() => {
                formUpdate.submit()
            }}
            open={update}>
            <Form
                onFinish={({ password }) => handleSubmit(password)}
                layout={'vertical'}
                form={formUpdate}>
                <Form.Item
                    rules={[{
                        required: true,
                        message: <span>{'Mật khẩu là bắt buộc'}</span>,
                    }]}
                    name={'password'}
                    label={'Nhập mật khẩu'}>
                    <Input type={'password'} placeholder={'Nhập mật khẩu'} />
                </Form.Item>
            </Form>
        </Modal>
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

        <RenderUpdateModal />
    </>
}
