import { groupByQuantity } from "../utils/helpers";
import Table from "./Table";

const specialStyles = {
    margin: ".5rem 0",
    border: "1px solid",
    padding: "1rem",
    borderRadius: "1rem",
}

/* eslint-disable react/prop-types */
function PdfRoom({ room }) {
    const { roomName, roomMaterials, roomCleats, windows, notes } = room

    const blackout = roomMaterials.filter((mat) => mat.productType === "black-out")
    const light = roomMaterials.filter((mat) => mat.productType === "light")
    const havey = roomMaterials.filter((mat) => mat.productType === "havey")
    const shammaat = roomMaterials.filter((mat) => mat.productType === "shammaat")
    const oima = roomMaterials.filter((mat) => mat.productType === "oima")
    const migar = roomMaterials.filter((mat) => mat.productType === 'migar')
    const mawaseer = roomMaterials.filter((mat) => mat.productType === 'mawaseer')

    const migarDivision = groupByQuantity(migar);
    const mawaseerDivision = groupByQuantity(mawaseer);



    return (
        <div className="pdf__room breakable-section">
            <h1 className="heading-1">{roomName}</h1>
            <div className="pdf__room-details">
                <div className="pdf__room-materials">
                    <h1 className="heading-2 mb-3">Materials</h1>

                    <Table cols="8rem 30rem repeat(2, 1fr)">
                        <Table.Header>
                            <div className=" heading-2">الصنف</div>
                            <div className=" heading-2">اسم المنتج</div>
                            <div className=" heading-2">الكمية</div>
                            <div className=" heading-2">نوع الخياطة</div>
                        </Table.Header>
                        <Table.StaticBody>
                            <Table.Row specialStyles={specialStyles}>
                                <div className=" heading-2">بلاك :</div>
                                <div className=" heading-2">{blackout[0]?.product || "_"}</div>
                                <div className=" heading-2">{blackout[0]?.quantity || "_"}</div>
                                <div className=" heading-2">{blackout[0]?.sewingType || "_"}</div>
                            </Table.Row>
                            <Table.Row specialStyles={specialStyles}>
                                <div className=" heading-2">خفيف :</div>
                                <div className=" heading-2">{light[0]?.product || "_"}</div>
                                <div className=" heading-2">{light[0]?.quantity || "_"}</div>
                                <div className=" heading-2">{light[0]?.sewingType || "_"}</div>
                            </Table.Row>
                            <Table.Row specialStyles={specialStyles}>
                                <div className=" heading-2">ثقيل :</div>
                                <div className=" heading-2">{havey[0]?.product || "_"}</div>
                                <div className=" heading-2">{havey[0]?.quantity || "_"}</div>
                                <div className=" heading-2">{havey[0]?.sewingType || "_"}</div>
                            </Table.Row>
                            <Table.Row specialStyles={specialStyles}>
                                <div className=" heading-2">شماعات :</div>
                                <div className=" heading-2">{shammaat[0]?.product || "_"}</div>
                                <div className=" heading-2">{shammaat[0]?.quantity || "_"}</div>
                                <div className=" heading-2">{shammaat[0]?.sewingType || "_"}</div>
                            </Table.Row>
                            <Table.Row specialStyles={specialStyles}>
                                <div className=" heading-2">اويمة :</div>
                                <div className=" heading-2">{oima[0]?.product || "_"}</div>
                                <div className=" heading-2">{oima[0]?.quantity || "_"}</div>
                                <div className=" heading-2">{oima[0]?.sewingType || "_"}</div>
                            </Table.Row>
                            <Table.Row specialStyles={specialStyles}>
                                <div className=" heading-2">مجر :</div>
                                <div className="w-75 flex gap-2 justify-start">
                                    {
                                        migarDivision.map((el) => <span className="fs-2 fw-mid">{el[0].quantity} <sup className="fs-1">({el.length}x)</sup> |</span>)
                                    }
                                </div>
                            </Table.Row>
                            <Table.Row specialStyles={specialStyles}>
                                <div className="heading-2">مواسير :</div>
                                <div className="flex gap-2 justify-start">
                                    {
                                        mawaseerDivision.map((el) => <span className="fs-2 fw-mid">{el[0].quantity} <sup className="fs-1">({el.length}x)</sup> |</span>)
                                    }
                                </div>
                            </Table.Row>
                            <Table.Row specialStyles={specialStyles}>
                                <div className="heading-2">مرابط :</div>
                                <div className="flex gap-2 justify-start">
                                    {roomCleats !== undefined ? roomCleats.map((el) => <span className="fs-2 fw-mid">{el.product} <sup className="fs-1">({el.quantity ? el.quantity + "m" : "From Height"})</sup> |</span>
                                    ) : "_"}
                                </div>
                            </Table.Row>
                        </Table.StaticBody>
                    </Table>

                </div>
                <div className="pdf__room-windows">
                    <h1 className="heading-2 mb-3">Windows</h1>
                    <div>
                        {
                            windows.map((window) => <div className="window-details" key={'1'}>
                                <span className="window-width"> {window.width + " Cm"} <i className="window-line"></i></span>
                                <span className="window-height"> {window.height + " Cm"} <span className="window-line"></span></span>
                                <span className="window-heightType"> {window.heightType} <span className="window-line"></span></span>
                                <img src={window.src} alt="" />
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="pdf__room-notes">
                <h1 className="heading-2 mb-3">Notes:</h1>
                <div className="fs-2">
                    {notes}
                </div>
            </div>
        </div>
    )
}

export default PdfRoom
