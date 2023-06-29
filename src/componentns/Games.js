import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Table, Tooltip, Spin } from 'antd'
import url from '~/utils/Urls'
import apis from '~/utils/CallApi'
import styles from '~/styles/index.module.css'
import constants from '../utils/Constants'
import { DeleteTwoTone } from '@ant-design/icons'
export default function Games(props) {
    const setPermisiion_ = props.setPermisiion_
    const [input, setInput] = useState('')
    const [data, setData] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [curentPage, setCurentPage] = useState(1)
    const [codeDelete, setCodeDelete] = useState(undefined)
    const [isShowModel, setShowModel] = useState(false)
    const [isDisable, setDisable] = useState(true)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        loadingData()
    }, [curentPage])

    function handleClickDelete(text) {
        setCodeDelete(text)
        setShowModel(true)
    }

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Game',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tổng key',
            dataIndex: 'total_key',
            key: 'total_key',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Thao tác',
            dataIndex: 'code',
            key: 'id',
            render: (text) => <div>
                <Tooltip title={'Xóa key'}>
                    <DeleteTwoTone
                        style={{
                            color: 'red',
                            textAlign: 'center',
                        }}
                        onClick={() => handleClickDelete(text)}
                    />
                </Tooltip>
            </div>,
        },
    ]
    function handleAdd() {
        setDisable(true)
        apis().post(url().URL_ADD_CATEGORY, {
            name: input,
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
        setDisable(false)
    }

    function loadingData() {
        setLoading(true)
        apis().get(url().URL_ALL_CATEGORY, {
            page_offset: curentPage,
        }).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    setTotalPage(response.body.total_page)
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

    const onChangePagination = (page) => {
        setCurentPage(page)
    }
    function handleDeleteKey() {
        apis().post(url().URL_REMOVE_CATEGORY, { 'code': codeDelete }).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    alert('Xóa key thành công!')
                    loadingData()
                } else {
                    alert('Xóa key thất bại!')
                }
            } else {
                alert('Xóa key thất bại!')
            }
        })
        setShowModel(false)
        setCodeDelete(undefined)
    }

    return <>
        {
            <div>
                {
                    <div className={styles.wapper}>
                        <div className={styles.formInputKey}>
                            <div>
                                <span className={styles.labelAdd}>Thêm game mới!</span>
                                <div>
                                    <Input
                                        onPressEnter={() => handleAdd()}
                                        onChange={(e) => {
                                            setInput(e.target.value)
                                            setDisable(e.target.value === '')
                                        }}
                                        placeholder="Nhập giá trị game..." />
                                </div>
                            </div>
                            <div>
                                <Button onClick={() => handleAdd()} className={styles.btnAdd} disabled={isDisable}>Thêm mới</Button>
                            </div>
                        </div>
                        <div className={styles.formData}>
                            <span className={styles.labelData}>Danh sách game</span>
                            <Spin
                                spinning={isLoading}
                                tip="Loading...">
                                <Table
                                    style={{ background: 'white', borderRadius: 20 }}
                                    columns={columns}
                                    dataSource={data}
                                    pagination={{
                                        current: curentPage,
                                        total: totalPage * 10,
                                        onChange: onChangePagination,
                                    }}
                                />
                            </Spin>
                        </div>
                    </div>
                }
            </div>
        }
        <Modal
            title={'Cảnh báo'}
            centered
            open={isShowModel}
            onOk={() => handleDeleteKey()}
            onCancel={() => setShowModel(false)}
        >
            <p>Bạn chắt chắn muốn xóa game này?<br/><font color={'red'}>Khi game bị xóa dẫn đến tất cả key thuộc game sẽ bị xóa toàn bộ!</font></p>
        </Modal>
    </>
}
