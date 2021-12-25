import React, { Fragment, useContext, useState } from 'react';

import { ClientContext } from '../../../Context/ClientContextProvider';

import ClientTableBodyRow from './ClientTableBodyRow';
import ClientTableHeading from './ClientTableHeading';
import ReactLoading from 'react-loading';

const ClientTable = ({ reloadLoading }) => {
    const { allClient, loading, tablePageNumber, _getClients } = useContext(ClientContext);

    const [paginationLoading, setPaginationLoading] = useState(false);

    const loadMore = async () => {
        setPaginationLoading(true);
        await _getClients(tablePageNumber + 1);
        setPaginationLoading(false);
    }

    return (
        <Fragment>
            <div className="d-flex flex-column align-items-center mt-5 mb-5">
                {
                    loading ?
                        <ReactLoading type="spinningBubbles" color="#1f3c88" height={60} width={60} /> :
                        allClient.length ?
                            <table className="table table-responsive table-striped text-center" >
                                <ClientTableHeading
                                    head_1="نام"
                                    head_2="کدملی"
                                >
                                    {
                                        reloadLoading &&
                                        <div className='reload-loading'>
                                            <div className="linear-activity">
                                                <div className="indeterminate"></div>
                                            </div>
                                        </div>
                                    }
                                </ClientTableHeading>
                                <tbody>
                                    {[...allClient].map((item, index) => (
                                        <ClientTableBodyRow
                                            key={item.id}
                                            col={++index}
                                            id={item.id}
                                            name={item.name}
                                            nationalCode={item.nationalCode}
                                        />
                                    ))}
                                </tbody>
                            </table> :
                            <div className="alert alert-warning w-100 text-center">زیباجویی ثبت نشده است.</div>
                }

                {
                    allClient.length ?
                        <div className='d-flex flex-column align-items-center'>
                            <div className='mt-4 d-block'>
                                <button className='btn shadow-none load-more-table' onClick={loadMore}>
                                    {paginationLoading ? <ReactLoading type="bubbles" color="#1f3c88" height={70} width={70} /> : "بارگذاری بیشتر"}
                                </button>
                            </div>
                        </div>
                        : null
                }
            </div>
        </Fragment>

    )
}

export default ClientTable
