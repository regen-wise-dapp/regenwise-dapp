import React from 'react';
import DashboardHeader from '../../shared/DashboardHeader';
import styles from './index.module.scss';
import TableTemplate from '../../Stats/shared/TableTemplate';
import { TransactionData } from '@src/models/transaction';

interface Props {
  transactionData: TransactionData[];
}

export default function Transactions({ transactionData }: Props) {
  const tableHeaders = [
    {
      id: 'id',
      title: 'Transaction ID',
    },
    {
      id: 'type',
      title: 'Type',
    },
    {
      id: 'time',
      title: 'Time',
    },
    {
      id: 'value',
      title: 'Value',
    },
  ];
  return (
    <div className={styles.main_container}>
      <DashboardHeader header="TRANSACTIONS" />
      <TableTemplate
        data={transactionData}
        columns={tableHeaders}
        tableHeader="ALL NFT Transactions"
      />
    </div>
  );
}
