
import { Label } from '../ui/label'

const LegendItem = ({color,label}) => {
  return (
    <div className="flex flex-row items-center gap-2">    
       <div style={{height: 15,width: 15,borderRadius: 5,backgroundColor: color}}/>
       <Label className='text-sm'>{label}</Label>
    </div>
  )
}

export default LegendItem