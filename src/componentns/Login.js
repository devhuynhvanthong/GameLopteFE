import React from 'react'
import { Button, Form, Input } from 'antd'
import apis from '~/utils/CallApi'
import url from '~/utils/Urls'
import { useRouter } from 'next/router'
import Cookies from '~/utils/Cookies'
import constants from '~/utils/Constants'

export default function Login() {
    const router = useRouter()
    const [form] = Form.useForm()
    const cookie = Cookies()
    function handleLogin({ username, password }) {
        apis().post(url().URL_LOGIN, {
            username,
            password,
        }).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    cookie.Set(constants().KEY_ACCESS_TOKEN, {
                        access_token: response.body.accsessToken,
                    })
                    router.reload()
                } else {
                    alert(response.message)
                }
            } else {
                alert('Xẫy ra lỗi')
            }
        })
    }

    return <>
        <div style={{
            display: 'flex',
            position: 'absolute',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            alignItems: 'center',
        }}>
            <div style={{
                padding: 20,
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                borderRadius: 10,
                height: 'fit-content',
            }}>
                <label style={{
                    fontSize: 23,
                    width: 400,
                    maxWidth: '80%',
                    fontWeight: 'bold',
                }}>Đăng nhập</label>
                <Form
                    onFinish={handleLogin}
                    form={form}
                    layout={'vertical'}
                >
                    <Form.Item
                        rules={[{
                            required: true,
                            message: <span>{'Tài khoản là bắt buộc'}</span>,
                        }]}
                        name={'username'}
                        label={'Tài khoản'}>
                        <Input
                            placeholder="Nhập tài khoản..."/>
                    </Form.Item>

                    <Form.Item
                        rules={[{
                            required: true,
                            message: <span>{'Mật khẩu là bắt buộc'}</span>,
                        }]}
                        name={'password'}
                        label={'Mật khẩu'}>
                        <Input
                            type={'password'}
                            placeholder="Nhập mật khẩu..."/>
                    </Form.Item>
                </Form>
                <Button style={{
                    background: '#0f1b29',
                    color: 'white',
                }} onClick={() => {
                    form.submit()
                }}>Đăng nhập</Button>
            </div>
        </div>
    </>
}
