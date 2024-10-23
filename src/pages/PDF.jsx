import { useGetOrderById } from "../features/orders/useGetOrderById"
import { useEffect, useRef, useState } from "react"
import { getCustomerById } from "../services/customersApi"
import Card from "../ui/Card"
import Table from "../ui/Table"
import PdfItem from "../ui/PdfItem"
import PdfRoom from "../ui/PdfRoom"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Button from "../ui/Button"
import { formatDate } from "../utils/helpers"

function PDFToPrint() {
    const { isLoadingOrder, order } = useGetOrderById()
    const [customer, setCustomer] = useState()

    useEffect(() => {
        async function getCustomer() {
            const customerApi = await getCustomerById(order?.generalInfo?.customer)
            setCustomer(customerApi)
        }
        getCustomer()
    }, [order])

    if (isLoadingOrder) return null


    const { id: orderId, created__at, generalInfo: { orderType, date, sales, showRoom, technical }, staticItems, rooms, status } = order
    const customerId = customer?.id
    const customerName = customer?.name
    const adress = customer?.adress
    const phoneNumber = customer?.phoneNumber
    const email = customer?.email

    return (
        <div className="" dir="rtl">
            <div className='flex justify-center align-center gap-2'>
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/profile.svg' />
                        <div className='flex flex-col gap-1'>
                            <h2>{customerName}</h2>
                            <h2 className="heading-3">Last order X</h2>
                        </div>
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">رقم الهاتف</h2>
                            <h2>{phoneNumber}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">العنوان</h2>
                            <h2>{adress?.at(0)}</h2>
                        </div>
                    </Card.Row>
                </Card>
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/sales-info.svg' />
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">اسم البائع</h2>
                            <h2>{sales}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">اسم الصالة</h2>
                            <h2>{showRoom}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">رفع المقاس</h2>
                            <h2>{technical}</h2>
                        </div>
                    </Card.Row>
                </Card>
                <Card>
                    <Card.Header>
                        <img src='/src/assets/icons/order-info.svg' />
                    </Card.Header>
                    <Card.Row>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">نوع الاوردر</h2>
                            <h2>{orderType}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">تاريخ التسليم</h2>
                            <h2>{date}</h2>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className="heading-2">تاريخ التعاقد</h2>
                            <h2>{formatDate(created__at)}</h2>
                        </div>
                    </Card.Row>
                </Card>
            </div>
            <div className="pdf__items">
                <h3 className="heading-2 mb-3">المنتجات</h3>

                <Table cols="repeat(2, 1fr) auto">
                    <Table.Header>
                        <div className="fs-2">كود الصنف</div>
                        <div className="fs-2">اسم الصنف</div>
                        <div className="fs-2">الكمية</div>
                    </Table.Header>
                    <Table.Body data={staticItems} render={(item => <PdfItem item={item} />)} />
                </Table>
            </div>
            <div className="pdf__rooms">
                {
                    rooms.map((room) => <PdfRoom room={room} />)
                }
            </div>
        </div>
    )
}

function PDF() {
    const componentRef = useRef();

    const generatePDF = () => {
        const input = componentRef.current;

        // Convert the HTML of the component to canvas
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // If the content is larger than one page, add more pages
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('order.pdf');
        });
    };

    return (
        <div className="pdf">
            <div className="mb-3">
                <Button onClick={generatePDF} text={'Generate PDF'} type={'primary'} size={'big'} />
            </div>
            <div ref={componentRef}>
                <PDFToPrint />
            </div>
        </div>
    );
}

export default PDF
