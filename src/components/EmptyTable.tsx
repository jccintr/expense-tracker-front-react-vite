import empty from '../assets/empty.png';
import { Button } from './ui/button';
import { Label } from './ui/label';

const EmptyTable = ({message,message2,buttonLabel,onAdd}) => {
  return (
    <div className='flex flex-col w-full items-center justify-center my-auto'>
        <img src={empty} className='h-[300px] mt-10'/>
        <Label className='my-4 text-xl text-gray-500'>{message}</Label>
        <Label className='my-4 text-lg text-gray-500'>{message2}</Label>
        <Button variant='outline' onClick={onAdd}>{buttonLabel}</Button>
    </div>
  )
}

export default EmptyTable