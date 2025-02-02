import { generateNumberId } from '../utils/helpers'
import Card from './Card'

function SectionStats({ cards }) {

    return (
        <div className='flex gap-2'>
            {
                cards.map((card) => <Card>
                    <Card.Header>
                        <img src={card.icon} alt="" />
                    </Card.Header>
                    <Card.Row>
                        {
                            card.cols.map((col) =>
                                <div key={col.title} className='flex flex-col gap-1'>
                                    <p>{col.title}</p>
                                    <h2>{col.value}</h2>
                                </div>
                            )
                        }
                    </Card.Row>
                </Card>)
            }
        </div>
    )
}

export default SectionStats
