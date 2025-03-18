import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SelectInput = ({placeholder,data,onChange,selected}) => {
  return (
    <div className="col-span-3 bg-amber-300">
    <Select value={selected}  onValueChange={(value)=>onChange(value)}>
        <SelectTrigger className="min-col-span-3">
            <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent className="flex-1">
           {data.map((item)=><SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
        </SelectContent>
    </Select>
    </div>
  )
}

export default SelectInput