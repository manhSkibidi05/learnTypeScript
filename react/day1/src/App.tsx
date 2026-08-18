import Profile from "./component/Profile"
import Button from "./component/Button"
import List from "./component/List"

function App(){
  return(
    <div>
      <h1>Bài tập ngày 1 </h1>
      <Profile name='Thành Long' email='long@hahahaha' bio='Người âm nhạc' ></Profile>
      <Button label='Chạm'  onClick={(color) =>{console.log(color)}}></Button>
      <List items={[1,2,3,4,5,6,7]} renderItem={(item  , num ) => item*num }></List>
    </div>
  )
}
export default App