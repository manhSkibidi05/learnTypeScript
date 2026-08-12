import {sayHi} from './test';
import { caculateArea } from './test';
import type Product from './test';
import { mergeTests } from './test';
import { arrFood } from './test';
import { findFood } from './test';
import { formatValue } from './test';
import type { ErrorMessage } from './test';
import { handleMessage } from './test';
import type { Config } from './test';
import { updateConfig } from './test';
import { show1 } from './test';

function App() {
  interface DiscountProduct extends Product{
    discountPercent : number;
  }

  const products : DiscountProduct[] = [
    {
        id : 1,
        name : 'laptop',
        price : 250,
        tags : ['dien tu' , 'apple'],
        discountPercent : 10
    },
    {
        id : 2,
        name : 'iphone',
        price : 150,
        tags : ['dien tu' , 'apple'],
        discountPercent : 20,
    }
  ];
  products.push({
      id : 3,
      name : 'kinh',
      price : 50,
      description : 'helnah',
      tags : ['dien tu' , 'apple'],
      discountPercent : 50,
  });

  const getDiscountPrice = (product : DiscountProduct) => product.price * (1 - product.discountPercent / 100);
  
  let someValue1: unknown = 1;
  let strLength1: string = (someValue1 as string).length ? 'Value là chữ' : 'Value là số'; 
  
  let thongBao : ErrorMessage = {
    type : 'error',
    text : 'Lỗi vì quá đẹp trai',
    code : 404
  }

  let ketNoi : Config = {
    host : 'localhost',
    port : 3000,
    secure : true
  }

  let ketNoiLai : Partial<Config> = {
    port : 5000
  }

  return (
    <>
      <h1>Test TypeScript</h1>
      <h2>Ngày 3 : {sayHi('moy', 18)}</h2>
      <p>Diện tích hình vuông : {caculateArea(18 , 36)}</p>
      <ul>Danh sách sản phẩm  : 
        {
        products.map(value => 
          <li key={value.id}>
            <p>Tên : {value.name}</p>
            <p style={{textDecorationLine : 'line-through' , color : 'red'}}>Giá ban đầu : {value.price}</p>
            <p style={{color : 'red'}}>Giá sau khi giảm : {getDiscountPrice(value)}</p>
            <p>Mô tả : {value.description ?? 'không có mô tả'}</p>
          </li>
        )
        }
      </ul>
      <h3>Gộp mảng : {mergeTests}</h3>
      <h3>Chuyển mảng : {arrFood}</h3>
      <h3>Hôm nay ăn gì : {findFood?.name}</h3>
      <h3>wtf : {strLength1}</h3>
      <h3>chuỗi hay số : {formatValue(199)}</h3>
      <h3>Thông báo : {handleMessage(thongBao)}</h3>
      <hr />
      <h3>Cổng kết nối ban đầu: {`${ketNoi.host}:${ketNoi.port}`}</h3>
      <h3>Cổng kết nối sau đó : {`${updateConfig(ketNoi , ketNoiLai).host}:${updateConfig(ketNoi , ketNoiLai).port}`}</h3>
      <h2>To-do List</h2>
      <h3>Danh sách list</h3>
      <ul>
        {
          show1.map(task => 
            <li>
              <input type="checkbox" checked={task.status === 'Completed'} />
              <span>Title : {task.title}</span>
              {task.description && <p>desc : {task.description}</p>}
            </li>
          )
        }
      </ul>
    </>
  )
}

export default App
