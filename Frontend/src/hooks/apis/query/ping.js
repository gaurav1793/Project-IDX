import {useQuery} from '@tanstack/react-query'
import {pingApi} from '../../../apis/Ping.js'

export default function ping(){
    const {isLoading,isError,data,error} =useQuery({
        queryFn:pingApi,
        queryKey:['ping'],
        staleTime:10000
    })
    return {
        isLoading,isError,data,error
    }
}