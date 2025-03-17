import {useState,useEffect,useContext} from 'react'
import api from "@/api/api"
import AuthContext from "@/context/AuthContext"
import { ChevronRight,ChevronLeft } from "lucide-react"
import { Label } from "../ui/label"
import { Pie, PieChart,LabelList } from "recharts"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import {ChartConfig,ChartContainer,ChartTooltip,ChartTooltipContent,ChartLegend,ChartLegendContent} from "@/components/ui/chart"
import { months,gerarCorHexAleatoria,calcularPercentual } from '@/util/util'
import LegendItem from './LegendItem'

  const chartConfig = {}

  const PizzaChart = () => {
    const {token} = useContext(AuthContext);
    const [chartData,setChartData] = useState([]);
    const [total,setTotal] = useState(0);
    const [date,setDate] = useState(null)


    useEffect(()=>{
        const today = new Date(Date.now());
        setDate(today);
        const mes = today.getMonth()+1;
        const ano = today.getFullYear();
        getData(mes,ano);
    },[]);

    const getData = async (mes,ano) => {
   
     // setIsLoading(true);
      const response = await api.pieChart(token,mes,ano);
    
      if(response.ok){
        const json = await response.json();
        if(json.accounts.length>0){
        createChartData(json.accounts,json.total_amount);
        }
        else {
          setChartData([]);
        }
      
        setTotal(json.total_amount);
      }
    //  setIsLoading(false)
      
  }

    const createChartData = (arr,total) => {
        let arrData = [];
        for(let i=0;i<arr.length;i++){
           
        arrData.push(
            {
                amount: arr[i].total_amount, 
                fill: gerarCorHexAleatoria(),
                account: arr[i].account,
                percentual: calcularPercentual(total, arr[i].total_amount)
                
            })
        }
        setChartData(arrData);
    }

    const nextMonth =  () => {
     
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + 1);
        setDate(newDate);
        const mes = newDate.getMonth()+1;
        const ano = newDate.getFullYear();
         getData(mes,ano);
      }
  
      const previousMonth =  () => {
       
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() - 1);
        setDate(newDate);
        const mes = newDate.getMonth()+1;
        const ano = newDate.getFullYear();
        
        getData(mes,ano);
      }

  return (
    <Card className="flex flex-col">
     <CardHeader className="flex flex-row justify-between">
     
             <div className="flex flex-row  gap-2">
               <ChevronLeft  onClick={previousMonth}/>
               <Label className="text-base">{months[date?.getMonth()]+' '+date?.getFullYear()}</Label>
               <ChevronRight onClick={nextMonth}/>
             </div>
             <Label className="text-xl font-semibold">R$ {total.toFixed(2)}</Label>
          
         </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="amount" nameKey="account" >
                <LabelList
                dataKey="percentual"
                className="fill-background"
                stroke="none"
                fontSize={12}
               
                />
                
            </Pie>
            
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-row justify-around'>
         {chartData.map((data,index)=><LegendItem key={index} color={data.fill} label={data.account}/>)}
      </CardFooter>
    </Card>
  )
}

export default PizzaChart