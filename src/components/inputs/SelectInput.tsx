import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SelectInput = ({placeholder,data,onChange,selected}) => {
  return (
    <div className="col-span-3">
    <Select  value={selected==0?'':selected}  onValueChange={(value)=>onChange(value)}>
        <SelectTrigger className="w-[277px]" >
            <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent >
           {data.map((item)=><SelectItem  key={item.id} value={item.id}>{item.name}</SelectItem>)}
        </SelectContent>
    </Select>
    </div>
  )
}

export default SelectInput