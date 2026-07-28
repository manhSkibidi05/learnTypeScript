import {sayHi} from './test'
import { caculateArea } from './test'

function App() {

  console.log(sayHi('moy', 18));
  console.log(caculateArea(18 , 36));

  return (
    <>
      <h1>Test TypeScript</h1>
      <h2>Ngày 2</h2>
      <p>Đáp án : {caculateArea(18 , 36)}</p>
    </>
  )
}

export default App
