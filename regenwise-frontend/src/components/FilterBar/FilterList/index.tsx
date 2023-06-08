import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  filterItems: string[] | number[];
  header: string;
  onHandleFilterItemsArray: (items: any) => void;
}

export default function FilterList({
  filterItems,
  header,
  onHandleFilterItemsArray,
}: Props) {
  const [filterItemsArray, setFilterItemsArray] = useState<any[]>([]);

  useEffect(() => {
    onHandleFilterItemsArray(filterItemsArray);
  }, [filterItemsArray, onHandleFilterItemsArray]);

  const handleFilterItemClick = (item: any) => {
    const updatedArray = [...filterItemsArray];
    if (updatedArray.includes(item)) {
      const index = updatedArray.indexOf(item);
      updatedArray.splice(index, 1);
    } else {
      updatedArray.push(item);
    }

    setFilterItemsArray(() => updatedArray);
  };

  return (
    <section>
      <p className="font-extrabold mb-0">{header}</p>
      <div className="flex flex-col capitalize font-bold">
        {filterItems.map((item: number | string, index: number) => {
          return (
            <Form.Check
              className="text-slate-600"
              key={item}
              inline
              label={item}
              name="group1"
              type="checkbox"
              id={`inline-${item}-${index}`}
              checked={filterItemsArray.includes(item)}
              onChange={() => handleFilterItemClick(item)}
            />
          );
        })}
      </div>
    </section>
  );
}
