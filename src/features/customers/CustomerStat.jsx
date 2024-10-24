import { useCustomers } from './useCustomers'
import Spinner from '../../ui/Spinner'
import SectionStats from '../../ui/SectionStats'

export default function CustomerStat() {
    const { customers, isLoading } = useCustomers()
    
    if (isLoading || customers.length === undefined) return <Spinner />
    

    const allCustomers = customers?.length
    const activeCustomers = customers.filter((customer) => customer.status === 'active').length
    const inActiveCustomers = customers.filter((customer) => customer.status === 'in-active').length

    return <SectionStats cards={[
        {
            icon: '/src/assets/icons/customers.svg',
            cols: [
                {
                    title: 'All Customers',
                    value: allCustomers
                },
                {
                    title: 'Active Customers',
                    value: activeCustomers
                },
                {
                    title: 'In-Active Customers',
                    value: inActiveCustomers
                },
            ]
        },
    ]} />
}
