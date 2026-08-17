import Profile from "./component/Profile"
import Button from "./component/Button"
import List from "./component/List"

function App(){
  return(
    <div>
      <h1>Bài tập ngày 1 </h1>
      <Profile name='Thành Long' email='long@hahahaha' bio='Người âm nhạc' ></Profile>
      <Button label='Chạm' variant='danger' onClick={() =>{console.log('chạm')}}></Button>
    </div>
  )
}
export default App