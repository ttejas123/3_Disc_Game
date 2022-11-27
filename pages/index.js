import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Dnd from '../components/Dnd';

export default function Home() {

  return (
      <DndProvider backend={HTML5Backend}>
        <div className='app'>
          <Dnd />
        </div>
      </DndProvider>
  )
}