import {useState,useEffect,useContext} from 'react'
import api from "@/api/api"
import AuthContext from "@/context/AuthContext"
import { ChevronRight,ChevronLeft } from "lucide-react"
import { Label } from "../ui/label"
import { getWeekNumber } from "@/util/util"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import {ChartConfig,ChartContainer,ChartTooltip,ChartTooltipContent,} from "@/components/ui/chart"

 
  
  const chartConfig = {
    gastos: {
      label: "Gastos",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const weekDays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

const Barchart = () => {
    const [week,setWeek] = useState(0);
    const [firstDay,setFirstDay] = useState(null);
    const [lastDay,setLastDay] = useState(null);
    const [total,setTotal] = useState(0);
    const {token} = useContext(AuthContext);
    const [barData,setBarData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
  
    useEffect(()=>{
        const today = new Date(Date.now());
        const weekAtual = getWeekNumber(today);
       
        setWeek(weekAtual);
        getData(10);
},[]);

    const createBarData = (arr) => {
    let arrData = [];
    for(let i=0;i<arr.length;i++){
        arrData.push({gastos: arr[i].total_amount,day:weekDays[arr[i].day_of_week]})
    }
    setBarData(arrData);
    }

    const getData = async (w) => {
        setIsLoading(true);
        const response = await api.weekChart(token,w);
        if(response.ok){
          const json = await response.json()
          createBarData(json.week_days)
          setTotal(json.total_amount);
       
         setFirstDay(new Date(json.first_day+'T00:00:00'));
         setLastDay(new Date(json.last_day +'T00:00:00'));
         
        }
        setIsLoading(false)
  }

  const previousWeek = async () => {
     
    const w = week - 1;
    setWeek(w);
    getData(w);
}

const nextWeek = async () => {
  const w = week + 1;
  setWeek(w);
  getData(w);
}

  return (
    <Card >
    <CardHeader className="flex flex-row justify-between">

       <div className="flex flex-row items-center gap-2">
          <ChevronLeft  onClick={previousWeek} className='w-7 h-7'/>
          <span className="text-base h-7">{`${firstDay?.getDate()} ${months[firstDay?.getMonth()]} - ${lastDay?.getDate()} ${months[lastDay?.getMonth()]}`}</span>
          <ChevronRight  onClick={nextWeek} className='w-7 h-7'/>
        </div>
        <Label className="text-xl font-semibold">R$ {total.toFixed(2)}</Label>
     
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className='h-[40vh] w-full'>
        <BarChart accessibilityLayer data={barData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel={false} />}
          />
          <Bar dataKey="gastos" fill="#1F305E" radius={8} />
        </BarChart>
      </ChartContainer>
    </CardContent>
    
  </Card>
  )
}

export default Barchart