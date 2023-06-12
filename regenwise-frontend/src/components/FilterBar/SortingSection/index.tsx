import { Ascending, Descending, OrderDirection } from '@src/constants/misc';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  onHandleOrderSelection: (order: {
    orderDirection: OrderDirection;
    orderType: string;
  }) => void;
}

export default function SortingSection({ onHandleOrderSelection }: Props) {
  const [orderDirection, setOrderDirection] = useState(Ascending);
  const [orderType, setOrderType] = useState('');

  useEffect(() => {
    onHandleOrderSelection({
      orderDirection: orderDirection,
      orderType: orderType,
    });
  }, [orderType, orderDirection, onHandleOrderSelection]);

  return (
    <>
      <div className="flex flex-col mb-2">
        <p className="font-extrabold mb-0">Sort Category</p>
        {['Date', 'Name', 'Popularity'].map((item: string, index: number) => {
          return (
            <Form.Check
              className="text-slate-600"
              key={item}
              style={{ fontWeight: 'bold' }}
              inline
              checked={item === orderType}
              onChange={() => {
                item === orderType ? setOrderType('') : setOrderType(item);
              }}
              label={item}
              name="group1"
              type="checkbox"
              id={`inline-${item}-${index}`}
            />
          );
        })}
      </div>
      <div className="flex flex-col">
        <p className="font-extrabold mb-0">Order</p>
        {[Ascending, Descending].map((item: OrderDirection, index: number) => {
          return (
            <Form.Check
              className="text-slate-600 capitalize"
              key={item}
              checked={item === orderDirection}
              onChange={() => setOrderDirection(item)}
              inline
              style={{ fontWeight: 'bold' }}
              label={item}
              name="group1"
              type="radio"
              id={`inline-${item}-${index}`}
            />
          );
        })}
      </div>
    </>
  );
}
